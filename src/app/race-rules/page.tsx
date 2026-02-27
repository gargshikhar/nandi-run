import { Metadata } from "next";
import {
  ShieldCheck,
  UserCheck,
  Route,
  Ban,
  FileText,
  Camera,
  AlertTriangle,
  Gavel,
  Tag,
  Footprints,
  IdCard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Race Rules & Terms | Nandi Hills Monsoon Run",
  description:
    "Official race rules, eligibility requirements, prohibited items, and terms & conditions for the Nandi Hills Monsoon Run 2026.",
};

const eligibility = [
  { icon: UserCheck, text: "Participants must be 18 years or older" },
  {
    icon: IdCard,
    text: "Valid government-issued ID required for BIB collection and prize claims",
  },
  { icon: Tag, text: "BIB must be worn visibly on the front at all times" },
  {
    icon: Footprints,
    text: "Timing chip must remain securely attached throughout the race",
  },
];

const conduct = [
  "Complete the full course distance on foot within the designated cutoff time",
  "Follow the official route at all times — course cutting results in disqualification",
  "Obey all instructions from marshals, volunteers, and medical personnel",
  "Medical staff reserves the right to pull any runner from the race if health is at risk",
  "Use designated waste stations — littering on course is strictly prohibited",
];

const prohibited = [
  "Headphones or earphones",
  "Pets on the course",
  "Bicycles or any wheeled transport",
  "Unauthorized pacers",
  "BIB swapping or transferring",
];

const terms = [
  {
    icon: FileText,
    title: "Non-refundable & Non-transferable",
    text: "Registration fees are non-refundable and non-transferable under any circumstances. BIBs cannot be transferred from one runner to another.",
  },
  {
    icon: AlertTriangle,
    title: "Assumption of Risk",
    text: "Participants run at their own risk and must declare any pre-existing medical conditions during registration. The organizers are not liable for any injury, illness, or loss.",
  },
  {
    icon: Camera,
    title: "Photography & Video Consent",
    text: "By registering, participants consent to being photographed and filmed during the event. Images and videos may be used for promotional purposes.",
  },
  {
    icon: ShieldCheck,
    title: "Event Modifications",
    text: "The organizers reserve the right to modify, postpone, or cancel the event due to force majeure, safety concerns, or other unforeseen circumstances.",
  },
  {
    icon: Gavel,
    title: "Final Authority",
    text: "All decisions made by the Race Director and organizing committee are final and binding. No appeals or correspondence will be entertained.",
  },
];

export default function RaceRulesPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative bg-bg-section-alt py-10 md:py-14 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
            Guidelines
          </p>
          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold text-text md:text-3xl">
            Race Rules & Terms
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-text-muted">
            Official rules, eligibility criteria, and terms of participation
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <UserCheck size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Eligibility
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {eligibility.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-bg-elevated border border-border p-4"
              >
                <item.icon
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <p className="text-sm text-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Race Conduct */}
      <section className="section-padding bg-bg-section-alt border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Route size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Race Conduct
            </h2>
          </div>

          <ul className="space-y-3">
            {conduct.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-text-muted"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prohibited */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Ban size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Prohibited
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {prohibited.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-bg-elevated border border-border p-4"
              >
                <Ban size={16} className="shrink-0 text-red-500" />
                <span className="text-sm font-medium text-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="section-padding bg-bg-section-alt">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <FileText size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Terms & Conditions
            </h2>
          </div>

          <div className="space-y-4">
            {terms.map((item, i) => (
              <div
                key={i}
                className="bg-bg-elevated border border-border p-5"
              >
                <div className="mb-2 flex items-center gap-3">
                  <item.icon size={20} className="shrink-0 text-primary" />
                  <h3 className="font-bold text-text">{item.title}</h3>
                </div>
                <p className="pl-8 text-sm text-text-muted leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
