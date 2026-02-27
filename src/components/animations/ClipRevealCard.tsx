"use client";

interface ClipRevealCardProps {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
}

export default function ClipRevealCard({
  children,
  overlay,
  className = "",
}: ClipRevealCardProps) {
  return (
    <div
      className={`clip-reveal-card group relative overflow-hidden rounded-2xl ${className}`}
    >
      <div className="clip-reveal-image w-full h-full">{children}</div>
      {overlay && (
        <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="w-full">{overlay}</div>
        </div>
      )}
    </div>
  );
}
