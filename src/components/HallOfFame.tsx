"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trophy,
  Search,
  ChevronDown,
  Medal,
  Clock,
  User,
  Loader2,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RaceInfo {
  id: number;
  race_id: number;
  name: string;
}

interface BracketInfo {
  bracket_id: number;
  name: string;
}

interface WinnerResult {
  bibno: string;
  bracket_rank: number;
  first_name: string;
  last_name: string;
  finished_time: string;
  gun_time: string;
  bracket_name?: string;
}

interface BracketWinners {
  race_name: string;
  bracket_name: string;
  winners: WinnerResult[];
}

interface BracketLeaderboardResult {
  bibno: string;
  bracket_rank: number;
  first_name: string;
  last_name: string;
  finished_time: string;
  gun_time: string;
}

interface BibResult {
  participant: {
    bibno: string;
    first_name: string;
    last_name: string;
    full_name: string;
    gender: string;
    hometown?: string;
  };
  race: {
    name: string;
    race_date: string;
  };
  brackets: {
    bracket_name: string;
    bracket_rank: number;
    bracket_participants: number;
    finished_time: string;
    gun_time: string;
  }[];
  intervals: {
    interval_name: string;
    chip_time: string;
    gun_time: string;
    chip_pace?: string;
  }[];
  finished_time: string;
  gun_time: string;
}

interface SearchResult {
  full_name: string;
  bibno: string;
}

/* ------------------------------------------------------------------ */
/*  API helpers                                                        */
/* ------------------------------------------------------------------ */

const RESULTS_URL =
  "https://sportstimingsolutions.in/results?q=eyJlX25hbWUiOiJEaXZ5YVNyZWUgTmFuZGkgSGlsbHMgTW9uc29vbiBSdW4gMjAyNSIsImVfaWQiOjg3NjM2fQ%3D%3D";

async function apiFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const qs = new URLSearchParams({ endpoint, ...params });
  const res = await fetch(`/api/results?${qs.toString()}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function RankBadge({ rank }: { rank: number }) {
  const colors: Record<number, string> = {
    1: "bg-yellow-400 text-yellow-900",
    2: "bg-gray-300 text-gray-700",
    3: "bg-amber-600 text-amber-100",
  };
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
        colors[rank] || "bg-white/10 text-white/60"
      }`}
    >
      {rank}
    </span>
  );
}

function LeaderboardTable({ results }: { results: BracketLeaderboardResult[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
            <th className="px-4 py-3 w-16">#</th>
            <th className="px-4 py-3">Runner</th>
            <th className="px-4 py-3">BIB</th>
            <th className="px-4 py-3 text-right">Chip Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr
              key={`${r.bibno}-${i}`}
              className="border-b border-white/5 transition-colors hover:bg-white/5"
            >
              <td className="px-4 py-3">
                <RankBadge rank={r.bracket_rank} />
              </td>
              <td className="px-4 py-3 font-medium text-white">
                {r.first_name} {r.last_name}
              </td>
              <td className="px-4 py-3 text-white/50 font-mono text-xs">
                {r.bibno}
              </td>
              <td className="px-4 py-3 text-right font-mono text-primary font-semibold">
                {r.finished_time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WinnerPodium({ winners, bracketName }: { winners: WinnerResult[]; bracketName: string }) {
  if (!winners || winners.length === 0) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">
        {bracketName}
      </h4>
      <div className="space-y-3">
        {winners.slice(0, 3).map((w) => (
          <div key={w.bibno} className="flex items-center gap-3">
            <RankBadge rank={w.bracket_rank} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {w.first_name} {w.last_name}
              </p>
              <p className="text-xs text-white/40 font-mono">BIB {w.bibno}</p>
            </div>
            <p className="text-sm font-mono font-semibold text-primary">
              {w.finished_time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BibResultCard({ data, onBack }: { data: BibResult; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-white/50 hover:text-white transition-colors"
      >
        &larr; Back to leaderboard
      </button>

      {/* Runner header */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-navy-dark">
            <User size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">
              {data.participant.full_name}
            </h3>
            <p className="text-sm text-white/50">
              BIB {data.participant.bibno} &middot; {data.race.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-mono text-primary">
              {data.finished_time}
            </p>
            <p className="text-xs text-white/40">Chip Time</p>
          </div>
        </div>
      </div>

      {/* Rankings */}
      {data.brackets && data.brackets.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.brackets.map((b) => (
            <div
              key={b.bracket_name}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs text-white/40 mb-1">{b.bracket_name}</p>
              <p className="text-lg font-bold text-white">
                #{b.bracket_rank}{" "}
                <span className="text-xs font-normal text-white/30">
                  of {b.bracket_participants}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Split times */}
      {data.intervals && data.intervals.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40">
            <Clock size={14} />
            Split Times
          </h4>
          <div className="space-y-2">
            {data.intervals.map((interval) => (
              <div
                key={interval.interval_name}
                className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0"
              >
                <span className="text-sm text-white/70">
                  {interval.interval_name}
                </span>
                <div className="text-right">
                  <span className="text-sm font-mono font-semibold text-primary">
                    {interval.chip_time}
                  </span>
                  {interval.chip_pace && (
                    <span className="ml-3 text-xs text-white/40">
                      {interval.chip_pace}/km
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HallOfFame() {
  // Data
  const [races, setRaces] = useState<RaceInfo[]>([]);
  const [brackets, setBrackets] = useState<BracketInfo[]>([]);
  const [podiumData, setPodiumData] = useState<BracketWinners[]>([]);
  const [leaderboard, setLeaderboard] = useState<BracketLeaderboardResult[]>([]);
  const [bibResult, setBibResult] = useState<BibResult | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // UI state
  const [activeRaceIdx, setActiveRaceIdx] = useState(0);
  const [activeBracket, setActiveBracket] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"podium" | "leaderboard" | "bib">("podium");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load races on mount
  useEffect(() => {
    apiFetch<{ races: RaceInfo[] }>("event-races")
      .then((data) => {
        setRaces(data.races || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Load podium when race changes
  useEffect(() => {
    if (races.length === 0) return;
    const race = races[activeRaceIdx];
    setLoading(true);
    setError(null);
    setBibResult(null);
    setView("podium");
    setActiveBracket(null);

    Promise.all([
      apiFetch<{ results: Record<string, BracketWinners> }>("race-leaderboard", {
        race_id: String(race.race_id),
      }),
      apiFetch<{ brackets: BracketInfo[] }>("event-brackets", {
        race_id: String(race.race_id),
      }),
    ])
      .then(([lb, br]) => {
        const resultsObj = lb.results || {};
        setPodiumData(Object.values(resultsObj));
        setBrackets(br.brackets || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [races, activeRaceIdx]);

  // Load bracket leaderboard when bracket is selected
  const loadBracket = useCallback(
    (bracketId: number) => {
      if (races.length === 0) return;
      const race = races[activeRaceIdx];
      setActiveBracket(bracketId);
      setView("leaderboard");
      setLoading(true);

      apiFetch<{ results: BracketLeaderboardResult[] }>("bracket-leaderboard", {
        race_id: String(race.race_id),
        bracket_id: String(bracketId),
      })
        .then((data) => {
          setLeaderboard(data.results || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    },
    [races, activeRaceIdx]
  );

  // BIB search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => {
      apiFetch<{ participants: SearchResult[] }>("event-bibs", {
        term: searchQuery,
      })
        .then((data) => setSearchResults(data.participants || []))
        .catch(() => setSearchResults([]));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load individual BIB result
  const loadBibResult = useCallback((bibNo: string) => {
    setLoading(true);
    setView("bib");
    setSearchQuery("");
    setSearchResults([]);

    apiFetch<BibResult>("event/bib/result", { bibNo })
      .then((data) => {
        setBibResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section-padding bg-navy-dark" data-nav-theme="dark">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-semibold">
            Edition 1
          </p>
          <h2
            className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-white"
            style={{ fontSize: "var(--text-heading)" }}
          >
            Hall of Fame
          </h2>
          <p className="mx-auto max-w-xl text-white/50">
            Results from the DivyaSree Nandi Hills Monsoon Run 2025
          </p>
        </div>

        {/* Race tabs */}
        {races.length > 0 && (
          <div className="mb-6 flex justify-center gap-2 flex-wrap">
            {races.map((race, i) => (
              <button
                key={race.race_id}
                onClick={() => setActiveRaceIdx(i)}
                className={`rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                  i === activeRaceIdx
                    ? "bg-primary text-navy-dark"
                    : "border border-white/15 text-white/60 hover:text-white hover:border-white/30"
                }`}
              >
                {race.name}
              </button>
            ))}
          </div>
        )}

        {/* Search bar */}
        <div className="relative mb-6 mx-auto max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by BIB number or name..."
            className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
          />

          {/* Search dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-lg border border-white/15 bg-navy-dark shadow-xl overflow-hidden">
              {searchResults.slice(0, 8).map((sr) => (
                <button
                  key={sr.bibno}
                  onClick={() => loadBibResult(sr.bibno)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/70 hover:bg-white/10 transition-colors"
                >
                  <span className="font-mono text-xs text-primary">
                    #{sr.bibno}
                  </span>
                  <span>{sr.full_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bracket filter pills (shown in podium/leaderboard view) */}
        {view !== "bib" && brackets.length > 0 && (
          <div className="mb-6 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setActiveBracket(null);
                setView("podium");
              }}
              className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeBracket === null
                  ? "bg-white/15 text-white"
                  : "border border-white/10 text-white/40 hover:text-white/60"
              }`}
            >
              All Categories
            </button>
            {brackets.slice(0, 8).map((b) => (
              <button
                key={b.bracket_id}
                onClick={() => loadBracket(b.bracket_id)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeBracket === b.bracket_id
                    ? "bg-white/15 text-white"
                    : "border border-white/10 text-white/40 hover:text-white/60"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        )}

        {/* Content area */}
        <div className="min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={32} className="animate-spin text-primary mb-4" />
              <p className="text-sm text-white/40">Loading results...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-white/50 mb-4">Unable to load results right now.</p>
              <a
                href={RESULTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-navy-dark transition-all hover:bg-accent-dark"
              >
                View on Sports Timing Solutions
                <ExternalLink size={14} />
              </a>
            </div>
          ) : view === "bib" && bibResult ? (
            <BibResultCard
              data={bibResult}
              onBack={() => {
                setBibResult(null);
                setView("podium");
              }}
            />
          ) : view === "leaderboard" && leaderboard.length > 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <LeaderboardTable results={leaderboard} />
            </div>
          ) : view === "podium" && podiumData.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {podiumData.map((bracket, i) => (
                <WinnerPodium
                  key={i}
                  winners={bracket.winners}
                  bracketName={bracket.bracket_name}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
              <Trophy size={48} className="mx-auto mb-4 text-primary" />
              <p className="text-lg font-bold text-white mb-2">
                No results found
              </p>
              <p className="text-sm text-white/50">
                Try a different search or category filter.
              </p>
            </div>
          )}
        </div>

        {/* External link */}
        <div className="mt-8 text-center">
          <a
            href={RESULTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            Full results on sportstimingsolutions.in
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
