import type { GameTheme } from '../data/games'

function SnakeArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="贪吃蛇插画">
      <defs>
        <pattern id="snake-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" stroke="rgba(47,111,98,0.14)" strokeWidth="1" />
        </pattern>
        <linearGradient id="snake-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A9281" />
          <stop offset="100%" stopColor="#235A4F" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#snake-grid)" />
      <circle cx="330" cy="52" r="96" fill="rgba(255,255,255,0.34)" />

      <path
        d="M70 236 H148 V170 H226 V104 H292"
        fill="none"
        stroke="#1D4A42"
        strokeOpacity="0.12"
        strokeWidth="36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 236 H148 V170 H226 V104 H292"
        fill="none"
        stroke="url(#snake-body)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 236 H148 V170 H226 V104 H292"
        fill="none"
        stroke="#F7FBF8"
        strokeOpacity="0.55"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="1 24"
      />

      <circle cx="294" cy="104" r="19" fill="#1E5147" />
      <circle cx="301" cy="97" r="3.4" fill="#F7FBF8" />
      <circle cx="301" cy="111" r="3.4" fill="#F7FBF8" />

      <circle cx="86" cy="150" r="9" fill="#E4572E" />
      <path d="M86 141c4-7 10-8 14-6-1 6-6 9-11 8Z" fill="#5C9C6F" />
    </svg>
  )
}

const tiles: { value: number | null; color: string; text: string }[][] = [
  [
    { value: 2, color: '#F4E7D3', text: '#8A7355' },
    { value: 4, color: '#F2DDBE', text: '#8A7355' },
    { value: 8, color: '#EFC08E', text: '#7A5730' },
    { value: 16, color: '#EBA36B', text: '#FFFFFF' },
  ],
  [
    { value: 4, color: '#F2DDBE', text: '#8A7355' },
    { value: 8, color: '#EFC08E', text: '#7A5730' },
    { value: 16, color: '#EBA36B', text: '#FFFFFF' },
    { value: 32, color: '#E4572E', text: '#FFFFFF' },
  ],
  [
    { value: 8, color: '#EFC08E', text: '#7A5730' },
    { value: 16, color: '#EBA36B', text: '#FFFFFF' },
    { value: 32, color: '#E4572E', text: '#FFFFFF' },
    { value: 64, color: '#C9431F', text: '#FFFFFF' },
  ],
  [
    { value: 16, color: '#EBA36B', text: '#FFFFFF' },
    { value: 32, color: '#E4572E', text: '#FFFFFF' },
    { value: 64, color: '#C9431F', text: '#FFFFFF' },
    { value: null, color: 'rgba(255,255,255,0.4)', text: '#000000' },
  ],
]

function MergeArt() {
  const size = 52
  const gap = 9
  const originX = (400 - (size * 4 + gap * 5)) / 2
  const originY = (300 - (size * 4 + gap * 5)) / 2

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="2048 插画">
      <defs>
        <radialGradient id="merge-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill="url(#merge-glow)" />
      <circle cx="70" cy="60" r="70" fill="rgba(255,255,255,0.32)" />

      <g transform={`rotate(-5 200 150)`}>
        <rect
          x={originX - gap}
          y={originY - gap}
          width={size * 4 + gap * 5}
          height={size * 4 + gap * 5}
          rx="22"
          fill="rgba(255,255,255,0.55)"
          stroke="rgba(228,87,46,0.16)"
        />
        {tiles.map((row, rowIndex) =>
          row.map((tile, columnIndex) => {
            const x = originX + columnIndex * (size + gap)
            const y = originY + rowIndex * (size + gap)
            return (
              <g key={`${rowIndex}-${columnIndex}`}>
                <rect x={x} y={y} width={size} height={size} rx="12" fill={tile.color} />
                {tile.value !== null && (
                  <text
                    x={x + size / 2}
                    y={y + size / 2 + 8}
                    textAnchor="middle"
                    fill={tile.text}
                    fontFamily="'Segoe UI', system-ui, sans-serif"
                    fontSize={tile.value >= 32 ? 21 : 23}
                    fontWeight="700"
                  >
                    {tile.value}
                  </text>
                )}
              </g>
            )
          }),
        )}
      </g>
    </svg>
  )
}

export default function GameArt({ theme }: { theme: GameTheme }) {
  return theme === 'merge' ? <MergeArt /> : <SnakeArt />
}
