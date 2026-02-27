"use client";

import Link from "next/link";
import { TrendingUp, Clock, Users, ArrowRight } from "lucide-react";
import { RACES, SITE } from "@/lib/constants";

export default function RaceCategoriesSection() {
  return (
    <section id="races" className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Choose Your Challenge
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Race Categories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Two distances, one unforgettable monsoon experience at Nandi Hills
          </p>
        </div>

        {/* Race Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {RACES.map((race) => (
            <div
              key={race.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-br from-primary to-primary-dark p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {race.name}
                    </span>
                    <div className="mt-1 text-5xl font-extrabold text-white sm:text-6xl">
                      {race.distance}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {race.priceLabel}
                    </div>
                    <div className="text-xs text-white/60">per participant</div>
                  </div>
                </div>

                {/* Elevation Visual */}
                <div className="mt-6 flex items-end gap-1">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const height =
                      race.id === "half-marathon"
                        ? Math.sin((i / 19) * Math.PI) * 40 + 8
                        : Math.sin((i / 19) * Math.PI) * 20 + 8;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-white/20"
                        style={{ height: `${height}px` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                  {race.description}
                </p>

                {/* Details Grid */}
                <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-surface p-4">
                  <div className="text-center">
                    <TrendingUp
                      size={18}
                      className="mx-auto mb-1 text-primary"
                    />
                    <div className="text-sm font-bold text-gray-900">
                      {race.elevation.ascent}m
                    </div>
                    <div className="text-[10px] text-gray-500">Elevation</div>
                  </div>
                  <div className="text-center">
                    <Clock
                      size={18}
                      className="mx-auto mb-1 text-primary"
                    />
                    <div className="text-sm font-bold text-gray-900">
                      {race.cutoff}
                    </div>
                    <div className="text-[10px] text-gray-500">Cutoff</div>
                  </div>
                  <div className="text-center">
                    <Users
                      size={18}
                      className="mx-auto mb-1 text-primary"
                    />
                    <div className="text-sm font-bold text-gray-900">
                      {race.minAge}+
                    </div>
                    <div className="text-[10px] text-gray-500">Min Age</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {race.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={SITE.registerUrl}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-dark group-hover:shadow-lg"
                >
                  Register for {race.name}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
