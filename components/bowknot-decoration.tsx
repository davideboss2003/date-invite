export function BowknotDecoration({ size = 60 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      {/* Left loop */}
      <ellipse
        cx="25"
        cy="30"
        rx="22"
        ry="18"
        stroke="currentColor"
        strokeWidth="3"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Right loop */}
      <ellipse
        cx="75"
        cy="30"
        rx="22"
        ry="18"
        stroke="currentColor"
        strokeWidth="3"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Center knot */}
      <ellipse
        cx="50"
        cy="30"
        rx="8"
        ry="10"
        fill="currentColor"
      />
      {/* Left ribbon tail */}
      <path
        d="M42 38 Q35 55 25 58"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right ribbon tail */}
      <path
        d="M58 38 Q65 55 75 58"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
