import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
// Optional: skip the /v1/me lookup (which is quota-limited in dev mode)
const PROFILE_URL_OVERRIDE = process.env.SPOTIFY_PROFILE_URL || "";

let cachedToken: { value: string; expiresAt: number } | null = null;
let cachedResponse: { body: unknown; expiresAt: number } | null = null;
let cachedProfile: { value: string; expiresAt: number } | null = null;

const RESPONSE_TTL = 15_000;
const PROFILE_TTL = 24 * 60 * 60 * 1000;

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
    albumArt: track.album.images[0]?.url || "",
    url: track.external_urls.spotify,
  };
}

export async function GET() {
  if (cachedResponse && Date.now() < cachedResponse.expiresAt) {
    return NextResponse.json(cachedResponse.body);
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
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

    let body: unknown;

    if (currentRes.status === 200) {
      const currentData = await currentRes.json();
      if (currentData.item) {
        body = { isPlaying: true, track: toTrack(currentData.item), profileUrl };
      }
    }

    if (!body) {
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!recentRes.ok) {
        // Spotify dev-mode apps get a tiny daily quota on this endpoint.
        // Serve the last good response if we have one, otherwise report
        // "no track" with a 200 so the card degrades quietly.
        if (cachedResponse) {
          return NextResponse.json(cachedResponse.body);
        }
        body = { isPlaying: false, track: null, profileUrl };
        cachedResponse = { body, expiresAt: Date.now() + RESPONSE_TTL };
        return NextResponse.json(body);
      }

      const data = await recentRes.json();

      if (!data.items || data.items.length === 0) {
        body = { isPlaying: false, track: null, profileUrl };
      } else {
        body = { isPlaying: false, track: toTrack(data.items[0].track), profileUrl };
      }
    }

    cachedResponse = { body, expiresAt: Date.now() + RESPONSE_TTL };

    return NextResponse.json(body);
  } catch {
    if (cachedResponse) {
      return NextResponse.json(cachedResponse.body);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
