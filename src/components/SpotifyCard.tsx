"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Track {
  name: string;
  artist: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
}

export function SpotifyCard() {
  const [track, setTrack] = useState<Track | null>(null);
  const [profileUrl, setProfileUrl] = useState("https://open.spotify.com");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchTrack = () => {
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => {
          if (cancelled || !data) return;
          if (data.profileUrl) setProfileUrl(data.profileUrl);
          setTrack(data.track ? { ...data.track, isPlaying: Boolean(data.isPlaying) } : null);
          setLoading(false);
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] max-w-sm">
        <div className="w-14 h-14 rounded-lg bg-[var(--bg-tertiary)] animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-2.5 w-16 bg-[var(--bg-tertiary)] rounded animate-pulse" />
          <div className="h-3.5 w-32 bg-[var(--bg-tertiary)] rounded animate-pulse" />
          <div className="h-2.5 w-24 bg-[var(--bg-tertiary)] rounded animate-pulse" />
        </div>
        <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] animate-pulse flex-shrink-0" />
      </div>
    );
  }

  const href = track ? track.url : profileUrl;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-strong)] transition-colors group max-w-sm"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {track ? (
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={track.albumArt} alt={track.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.56.3z"/>
            </svg>
          </div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
          {track ? (track.isPlaying ? "Now playing" : "Last played") : "Spotify"}
        </p>
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
          {track ? track.name : "Not playing right now"}
        </p>
        <p className="text-xs text-[var(--text-secondary)] truncate">
          {track ? track.artist : "Open Spotify"}
        </p>
      </div>
      {track && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.56.3z"/>
          </svg>
        </div>
      )}
    </motion.a>
  );
}
