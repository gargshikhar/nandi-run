import { Metadata } from "next";
import {
  Bus,
  MapPin,
  Clock,
  Car,
  ParkingCircle,
  CloudRain,
  Leaf,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Transport & Shuttles | Nandi Hills Monsoon Run",
  description:
    "Shuttle service details, pickup locations, self-drive info, and Green Warrior carpool discount for the Nandi Hills Monsoon Run 2026.",
};

const pickupLocations = [
  {
    area: "South Bengaluru",
    location: "Shalini Grounds, 10th Main, 5th Block, Jayanagar",
  },
  {
    area: "Central Bengaluru",
    location: "Outside Kanteerava Stadium, opposite Konark",
  },
  {
    area: "Marathahalli",
    location: "Below Spice Garden Skywalk",
  },
];

export default function TransportPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative bg-bg-section-alt py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            Getting There
          </p>
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-text md:text-5xl">
            Transport & Shuttles
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            How to reach the venue on race day
          </p>
        </div>
      </section>

      {/* Shuttle Service */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Bus size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Shuttle Service
            </h2>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="bg-bg-elevated border border-border p-5">
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Cost
              </p>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
                <span className="text-primary">&#8377;</span>500
                <span className="text-sm font-normal text-text-muted">
                  {" "}
                  + taxes
                </span>
              </p>
            </div>
            <div className="bg-bg-elevated border border-border p-5">
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Departure
              </p>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
                3:45 AM
                <span className="text-sm font-normal text-text-muted">
                  {" "}
                  sharp
                </span>
              </p>
            </div>
            <div className="bg-bg-elevated border border-border p-5">
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Return
              </p>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
                From 11:00 AM
              </p>
            </div>
          </div>

          <p className="text-sm text-text-muted">
            Shuttles depart at 3:45 AM sharp from all pickup locations. Please
            arrive at least 10 minutes early. Return shuttles begin departing
            from the venue at 11:00 AM.
          </p>
        </div>
      </section>

      {/* Pickup Locations */}
      <section className="section-padding bg-bg-section-alt border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <MapPin size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Pickup Locations
            </h2>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-text-muted">
            <Clock size={16} className="text-primary" />
            <span>
              All pickups on <strong className="text-text">9th Aug 2026</strong>{" "}
              at <strong className="text-text">3:45 AM</strong>
            </span>
          </div>

          <div className="space-y-4">
            {pickupLocations.map((pickup, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-bg-elevated border border-border p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-text">{pickup.area}</h3>
                  <p className="text-sm text-text-muted">{pickup.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Drive */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Car size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Self-Drive
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-bg-elevated border border-border p-4">
              <ParkingCircle
                size={20}
                className="mt-0.5 shrink-0 text-primary"
              />
              <p className="text-sm text-text-muted">
                Paid parking is available at the venue
              </p>
            </div>
            <div className="flex items-start gap-3 bg-bg-elevated border border-border p-4">
              <CloudRain size={20} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm text-text-muted">
                Allow extra time for monsoon fog on the drive up to Nandi Hills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Green Warrior */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Leaf size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Green Warrior Carpool
            </h2>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-6">
            <div className="flex items-start gap-4">
              <Users size={24} className="mt-1 shrink-0 text-primary" />
              <div>
                <h3 className="mb-1 font-bold text-text">
                  Carpool & Save 10%
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Choose the Green Warrior option when you register and carpool
                  with fellow runners. You&apos;ll receive a 10% discount on
                  your registration fee while helping reduce the environmental
                  footprint of the event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
