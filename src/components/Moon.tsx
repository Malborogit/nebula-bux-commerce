export function MoonLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A855F7" /><stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="32" rx="29" ry="10" stroke="url(#lg)" strokeWidth="2" opacity=".7" transform="rotate(-20 32 32)" />
      <path d="M40 12a20 20 0 1 0 12 30A16 16 0 1 1 40 12z" fill="url(#lg)" />
      <path d="M44 22l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#fff" />
    </svg>
  );
}

export function MoonHero({ className = "" }: { className?: string }) {
  return (
    <div className={`relative animate-float ${className}`}>
      <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
        <defs>
          <radialGradient id="ng" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D946EF" stopOpacity=".45" />
            <stop offset="60%" stopColor="#A855F7" stopOpacity=".15" />
            <stop offset="100%" stopColor="#06060A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C084FC" /><stop offset=".5" stopColor="#A855F7" /><stop offset="1" stopColor="#D946EF" />
          </linearGradient>
          <filter id="gl"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        <circle cx="200" cy="200" r="200" fill="url(#ng)" />
        <ellipse cx="200" cy="200" rx="180" ry="48" stroke="#E9D5FF" strokeOpacity=".5" strokeWidth="2" transform="rotate(-22 200 200)" />
        <ellipse cx="200" cy="200" rx="160" ry="36" stroke="#F0ABFC" strokeOpacity=".35" strokeWidth="1.5" transform="rotate(18 200 200)" />
        <path d="M245 80a125 125 0 1 0 80 185A100 100 0 1 1 245 80z" fill="url(#mg)" filter="url(#gl)" opacity=".6" />
        <path d="M245 80a125 125 0 1 0 80 185A100 100 0 1 1 245 80z" fill="url(#mg)" />
        <path d="M270 150l7 20 20 7-20 7-7 20-7-20-20-7 20-7z" fill="#fff" />
        <circle cx="90" cy="110" r="2" fill="#fff" /><circle cx="330" cy="320" r="2.5" fill="#fff" /><circle cx="320" cy="90" r="1.5" fill="#fff" />
      </svg>
    </div>
  );
}

export function RobuxIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" stroke="#F5C542" strokeWidth="2.4" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="#F5C542" strokeWidth="2.2" />
    </svg>
  );
}
