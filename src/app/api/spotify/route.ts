import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
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

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    // Try currently playing first
    const currentRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // 204 means nothing is currently playing
    if (currentRes.status === 204) {
      // Fall through to recently played
    } else if (currentRes.ok) {
      const currentData = await currentRes.json();
      if (currentData.item) {
        const track = currentData.item;
        return NextResponse.json({
          isPlaying: true,
          track: {
            name: track.name,
            artist: track.artists.map((a: { name: string }) => a.name).join(", "),
            albumArt: track.album.images[0]?.url || "",
            url: track.external_urls.spotify,
          },
        });
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!recentRes.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: recentRes.status });
    }

    const data = await recentRes.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ isPlaying: false, track: null });
    }

    const item = data.items[0];
    const track = item.track;

    return NextResponse.json({
      isPlaying: false,
      track: {
        name: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        albumArt: track.album.images[0]?.url || "",
        url: track.external_urls.spotify,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
