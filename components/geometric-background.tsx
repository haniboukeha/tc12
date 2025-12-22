export function GeometricBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top Left - Stairs going up-right (smaller and cleaner) */}
      <div className="absolute top-0 left-0 w-20 h-32">
        <svg viewBox="0 0 80 128" className="w-full h-full text-[#1e3a8a]">
          <path
            d="M 0,128 L 0,112 L 16,112 L 16,96 L 32,96 L 32,80 L 48,80 L 48,64 L 64,64 L 64,48 L 80,48 L 80,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 8,128 L 8,120 L 24,120 L 24,104 L 40,104 L 40,88 L 56,88 L 56,72 L 72,72 L 72,56 L 80,56"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Top Right - Circular waves with diagonal stripes (smaller) */}
      <div className="absolute top-4 right-16 w-36 h-36">
        <svg viewBox="0 0 144 144" className="w-full h-full">
          <defs>
            <pattern
              id="diagonalStripes"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke="#1e3a8a" strokeWidth="2.5" />
            </pattern>
          </defs>
          {/* Outer circle with stripes */}
          <circle cx="72" cy="72" r="60" fill="url(#diagonalStripes)" opacity="0.7" />
        </svg>
      </div>

      {/* Top Right Corner - Dot pattern (smaller) */}
      <div className="absolute top-2 right-2 w-24 h-24">
        <svg viewBox="0 0 96 96" className="w-full h-full">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 15 + 8} cy={row * 15 + 8} r={2} fill="#1e3a8a" opacity={0.6} />
            )),
          )}
        </svg>
      </div>

      {/* Bottom Left - Dot pattern (smaller) */}
      <div className="absolute bottom-2 left-2 w-24 h-24">
        <svg viewBox="0 0 96 96" className="w-full h-full">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 15 + 8} cy={row * 15 + 8} r={2} fill="#1e3a8a" opacity={0.6} />
            )),
          )}
        </svg>
      </div>

      {/* Bottom Left - Circular waves with diagonal stripes (smaller) */}
      <div className="absolute bottom-8 left-16 w-32 h-32">
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <defs>
            <pattern
              id="diagonalStripes2"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke="#1e3a8a" strokeWidth="2.5" />
            </pattern>
          </defs>
          <circle cx="64" cy="64" r="55" fill="url(#diagonalStripes2)" opacity="0.65" />
        </svg>
      </div>

      {/* Bottom Right - Stairs going down-left (smaller and cleaner) */}
      <div className="absolute bottom-0 right-0 w-20 h-32">
        <svg viewBox="0 0 80 128" className="w-full h-full text-[#1e3a8a]">
          <path
            d="M 80,0 L 80,16 L 64,16 L 64,32 L 48,32 L 48,48 L 32,48 L 32,64 L 16,64 L 16,80 L 0,80 L 0,128"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 72,0 L 72,24 L 56,24 L 56,40 L 40,40 L 40,56 L 24,56 L 24,72 L 8,72 L 8,88 L 0,88"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
