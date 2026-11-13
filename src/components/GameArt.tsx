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

function FishArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="贪吃鱼插画">
      <defs>
        <linearGradient id="fish-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="#FFFFFF" opacity="0.3">
        <rect x="46" y="0" width="30" height="300" rx="15" />
        <rect x="128" y="0" width="18" height="300" rx="9" />
        <rect x="300" y="0" width="24" height="300" rx="12" />
      </g>
      <rect width="400" height="300" fill="url(#fish-water)" opacity="0.5" />

      <g fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="2">
        <circle cx="84" cy="76" r="5" />
        <circle cx="100" cy="46" r="3" />
        <circle cx="318" cy="106" r="4" />
        <circle cx="330" cy="72" r="2.5" />
      </g>

      <g fill="#7FB6C9" opacity="0.55">
        <rect x="70" y="206" width="18" height="5" rx="2.5" />
        <rect x="62" y="204" width="7" height="9" rx="2" />
        <rect x="320" y="190" width="15" height="4" rx="2" />
      </g>

      <g transform="translate(198 150) scale(5.4)">
        <g fill="#D9722A">
          <rect x="-10" y="-4" width="3" height="3" />
          <rect x="-10" y="1" width="3" height="3" />
          <rect x="-8" y="-2" width="3" height="4" />
        </g>
        <g fill="#F2913D">
          <rect x="-6" y="-4" width="11" height="8" />
          <rect x="-7" y="-2" width="13" height="4" />
          <rect x="3" y="-3" width="4" height="6" />
        </g>
        <g fill="#FFC066">
          <rect x="-4" y="-3" width="5" height="1" />
          <rect x="-2" y="1" width="4" height="1" />
        </g>
        <g fill="#D9722A">
          <rect x="-1" y="4" width="4" height="2" />
          <rect x="1" y="-6" width="3" height="2" />
        </g>
        <rect x="4" y="-3" width="3" height="3" fill="#FBF8F1" />
        <rect x="5" y="-2" width="1.5" height="1.5" fill="#16181C" />
        <rect x="7" y="1" width="1" height="1" fill="#B45416" />
      </g>
    </svg>
  )
}

function BreakoutArt() {
  const rows = [
    { y: 76, colors: ['#FF8A5B', '#FFC94B', '#7BD88F', '#5BC8E8'] },
    { y: 102, colors: ['#FFC94B', '#7BD88F', '#5BC8E8', '#B48CF2'] },
    { y: 128, colors: ['#7BD88F', '#5BC8E8', '#B48CF2', '#FF8A5B'] },
  ]

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="打砖块插画">
      <defs>
        <linearGradient id="paddle-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9BE6FF" />
          <stop offset="100%" stopColor="#3E9BD6" />
        </linearGradient>
      </defs>

      <g stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1">
        <path d="M0 52h400M0 104h400M0 156h400M0 208h400M0 260h400" />
      </g>

      {rows.map((row, ri) =>
        row.colors.map((color, ci) => (
          <g key={`${ri}-${ci}`} opacity={ri === 0 && ci === 3 ? 0.18 : 1}>
            <rect
              x={87 + ci * 58}
              y={row.y}
              width={52}
              height={18}
              rx={4}
              fill={color}
            />
            <rect
              x={89 + ci * 58}
              y={row.y + 2}
              width={48}
              height={3}
              rx={1.5}
              fill="#FFFFFF"
              opacity="0.35"
            />
          </g>
        )),
      )}

      <g fill="#7FA6C4" opacity="0.7">
        <rect x="96" y="196" width="9" height="9" rx="1.5" transform="rotate(14 100 200)" />
        <rect x="288" y="188" width="7" height="7" rx="1.5" transform="rotate(-18 291 191)" />
        <rect x="306" y="210" width="5" height="5" rx="1.5" transform="rotate(28 308 212)" />
      </g>

      <circle cx="214" cy="192" r="15" fill="#FFE9A8" opacity="0.3" />
      <circle cx="214" cy="192" r="7" fill="#FFEDBC" stroke="#F2B95C" strokeWidth="1.5" />

      <path
        d="M214 206 C 208 222, 196 232, 186 240"
        fill="none"
        stroke="#F2B95C"
        strokeWidth="2"
        strokeDasharray="3 5"
        strokeLinecap="round"
        opacity="0.8"
      />

      <rect x="140" y="240" width="104" height="11" rx="5.5" fill="url(#paddle-grad)" />
      <rect x="146" y="242" width="92" height="3" rx="1.5" fill="#FFFFFF" opacity="0.4" />
    </svg>
  )
}

function TetrisArt() {
  const CELL = 26
  const BASE_X = 109
  const BASE_Y = 248
  const columns = [
    ['#5BC8E8', '#5BC8E8'],
    ['#B48CF2'],
    ['#FFC94B', '#FFC94B', '#FFC94B'],
    ['#7BD88F', '#7BD88F'],
    ['#FF8A5B'],
    ['#5B7FE8', '#5B7FE8'],
    ['#F2789F'],
  ]

  const block = (x: number, y: number, fill: string, key: string) => (
    <g key={key}>
      <rect x={x + 1} y={y + 1} width={CELL - 2} height={CELL - 2} rx={3} fill={fill} />
      <rect x={x + 3} y={y + 3} width={CELL - 6} height={3} rx={1.5} fill="#FFFFFF" opacity="0.3" />
    </g>
  )

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="俄罗斯方块插画">
      <g stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1">
        <path d="M0 52h400M0 104h400M0 156h400M0 208h400M0 260h400" />
      </g>

      {columns.map((column, ci) =>
        column.map((color, bi) =>
          block(BASE_X + ci * CELL, BASE_Y - (bi + 1) * CELL, color, `s-${ci}-${bi}`),
        ),
      )}

      <g fill="none" stroke="#B48CF2" strokeOpacity="0.45" strokeWidth="1.6" strokeDasharray="4 3">
        <rect x={BASE_X + 4 * CELL + 2} y={144 + 2} width={CELL - 4} height={CELL - 4} rx={3} />
        <rect x={BASE_X + 3 * CELL + 2} y={170 + 2} width={CELL - 4} height={CELL - 4} rx={3} />
        <rect x={BASE_X + 4 * CELL + 2} y={170 + 2} width={CELL - 4} height={CELL - 4} rx={3} />
        <rect x={BASE_X + 5 * CELL + 2} y={170 + 2} width={CELL - 4} height={CELL - 4} rx={3} />
      </g>

      {block(BASE_X + 4 * CELL, 96, '#B48CF2', 'cur-top')}
      {block(BASE_X + 3 * CELL, 122, '#B48CF2', 'cur-b1')}
      {block(BASE_X + 4 * CELL, 122, '#B48CF2', 'cur-b2')}
      {block(BASE_X + 5 * CELL, 122, '#B48CF2', 'cur-b3')}
    </svg>
  )
}

export default function GameArt({ theme }: { theme: GameTheme }) {
  if (theme === 'merge') return <MergeArt />
  if (theme === 'fish') return <FishArt />
  if (theme === 'breakout') return <BreakoutArt />
  if (theme === 'tetris') return <TetrisArt />
  return <SnakeArt />
}
