import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
// Optional: skip the /v1/me lookup (which is quota-limited in dev mode)
const PROFILE_URL_OVERRIDE = process.env.SPOTIFY_PROFILE_URL || "";

let cachedToken: { value: string; expiresAt: number } | null = null;
let cachedProfile: { value: string; expiresAt: number } | null = null;

// Short enough that a track change shows up promptly, long enough that the
// 30s client poll and a handful of concurrent visitors share one upstream call.
const RESPONSE_TTL = 10_000;
const PROFILE_TTL = 24 * 60 * 60 * 1000;

type SpotifyBody = {
  isPlaying: boolean;
  track: ReturnType<typeof toTrack> | null;
  profileUrl: string;
};

let cachedBody: { value: SpotifyBody; expiresAt: number } | null = null;

function freshCache(): SpotifyBody | null {
  return cachedBody && Date.now() < cachedBody.expiresAt ? cachedBody.value : null;
}

async function getProfileUrl(accessToken: string): Promise<string> {
  if (PROFILE_URL_OVERRIDE) return PROFILE_URL_OVERRIDE;

  if (cachedProfile && Date.now() < cachedProfile.expiresAt) {
    return cachedProfile.value;
  }

  try {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.ok) {
      const data = await res.json();
      const url: string = data?.external_urls?.spotify || "";
      if (url) {
        cachedProfile = { value: url, expiresAt: Date.now() + PROFILE_TTL };
        return url;
      }
    }
  } catch {
    // fall through to the default below
  }

  return "https://open.spotify.com";
}

async function getAccessToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN || "",
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.access_token) return null;

    cachedToken = {
      value: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };

    return data.access_token;
  } catch {
    return null;
  }
}

function toTrack(track: {
  name: string;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string }> };
  external_urls: { spotify: string };
}) {
  return {
    name: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    // Spotify orders artwork largest first, so the last entry is the 64px
    // variant. That is the right size for the card's 56px thumbnail, and it
    // avoids pulling a 640px image on every poll.
    albumArt: track.album.images.at(-1)?.url || "",
    url: track.external_urls.spotify,
  };
}

export async function GET() {
  const fresh = freshCache();
  if (fresh) return NextResponse.json(fresh);

  const accessToken = await getAccessToken();

  if (!accessToken) {
    // Serve a stale body only while it is still inside its TTL. Beyond that,
    // report the failure rather than pinning the last good payload forever.
    const stale = cachedBody?.value ?? null;
    if (stale) return NextResponse.json(stale);

    return NextResponse.json(
      { error: "Could not authenticate with Spotify" },
      { status: 500 }
    );
  }

  try {
    const profileUrl = await getProfileUrl(accessToken);

    const currentRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // 200 with an item means a track is live. 204 means Spotify is reporting
    // no active playback, which is a valid answer and not a failure.
    let body: SpotifyBody | null = null;

    if (currentRes.status === 200) {
      const currentData = await currentRes.json();
      if (currentData.item) {
        body = {
          isPlaying: true,
          track: toTrack(currentData.item),
          profileUrl,
        };
      }
    }

    if (!body) {
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!recentRes.ok) {
        // Dev-mode apps get a tiny daily quota on this endpoint. Degrade to a
        // quiet "no track" rather than surfacing a 500 into the card.
        const stale = cachedBody?.value ?? null;
        if (stale) return NextResponse.json(stale);

        body = { isPlaying: false, track: null, profileUrl };
        cachedBody = { value: body, expiresAt: Date.now() + RESPONSE_TTL };
        return NextResponse.json(body);
      }

      const data = await recentRes.json();
      const recent = data.items?.[0]?.track;

      body = {
        isPlaying: false,
        track: recent ? toTrack(recent) : null,
        profileUrl,
      };
    }

    cachedBody = { value: body, expiresAt: Date.now() + RESPONSE_TTL };

    return NextResponse.json(body);
  } catch {
    const stale = cachedBody?.value ?? null;
    if (stale) return NextResponse.json(stale);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
