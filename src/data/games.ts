export type GameTheme = 'snake' | 'merge' | 'fish' | 'breakout' | 'tetris'

export type Game = {
  slug: string
  title: string
  english: string
  description: string
  tags: string[]
  category: '街机' | '益智'
  year: string
  status: 'playable' | 'soon'
  theme: GameTheme
  controls: string[]
}

export const games: Game[] = [
  {
    slug: 'snake',
    title: '贪吃蛇',
    english: 'SNAKE',
    description:
      '在网格里追逐自己的尾巴。支持键盘与触屏方向键，最高分会自动存在浏览器本地。',
    tags: ['Canvas', '键盘 / 触屏', '街机'],
    category: '街机',
    year: '2026',
    status: 'playable',
    theme: 'snake',
    controls: ['方向键 / WASD 控制方向', '空格键暂停与继续', '手机可点屏幕下方的方向键'],
  },
  {
    slug: '2048',
    title: '2048',
    english: 'MERGE',
    description:
      '滑动合并相同的数字，一路推到 2048。DOM 加 CSS 过渡手写，带滑动动画，手机也能玩。',
    tags: ['DOM', '数字合并', '益智'],
    category: '益智',
    year: '2026',
    status: 'playable',
    theme: 'merge',
    controls: ['方向键 / WASD 滑动方块', '手机直接在棋盘上滑动', 'R 键重新开始'],
  },
  {
    slug: 'fish',
    title: '贪吃鱼',
    english: 'BIG FISH',
    description:
      '在像素深海里吞掉比你小的鱼，躲开更大的家伙。带连击、冲刺和生命值，越吃越强。',
    tags: ['像素风', '街机', '生存'],
    category: '街机',
    year: '2026',
    status: 'playable',
    theme: 'fish',
    controls: [
      '鼠标移动 / WASD / 方向键控制游动',
      '空格或点击「冲刺」瞬间加速',
      '手机按住屏幕拖动游动，点右下角冲刺',
      '带 ! 标记的大鱼会咬你，别靠近',
    ],
  },
  {
    slug: 'breakout',
    title: '打砖块',
    english: 'PIXEL BREAKOUT',
    description:
      '控制挡板接住球，敲碎上方整片像素砖墙。击球点越靠边角度越刁，清空一关就加速一关。',
    tags: ['像素风', '街机', '反应'],
    category: '街机',
    year: '2026',
    status: 'playable',
    theme: 'breakout',
    controls: [
      '鼠标移动或手指拖动控制挡板，也可用 ← → / A D',
      '点击屏幕或按空格发球',
      '击球点越靠近挡板两端，反弹角度越大',
      '清空全部砖块进入下一关，球速会提升',
      '按 P 暂停，球掉落会损失一颗星',
    ],
  },
  {
    slug: 'tetris',
    title: '俄罗斯方块',
    english: 'PIXEL TETRIS',
    description:
      '七种方块从顶端落下，旋转、堆叠、填满整行消除。消得越多速度越快，堆到顶就结束。',
    tags: ['像素风', '益智', '经典'],
    category: '益智',
    year: '2026',
    status: 'playable',
    theme: 'tetris',
    controls: [
      '← → 或 A D 左右移动，↑ 或 X 旋转',
      '↓ 加速下落，空格直接落到底部',
      '填满一整行自动消除，一次消多行分数更高',
      '每消除 10 行升一级，下落速度会加快',
      '按 P 暂停，手机可用底部五个按钮操作',
    ],
  },
  {
    slug: 'next',
    title: '下一个实验',
    english: 'YOUR NEXT GAME',
    description:
      '把你的 H5 游戏放进 public/games/ 目录，再在 src/data/games.ts 里加一条记录，它就会出现在这面墙上。',
    tags: ['预留展位'],
    category: '街机',
    year: '2027',
    status: 'soon',
    theme: 'snake',
    controls: [],
  },
]

export const playableGames = games.filter((game) => game.status === 'playable')

export function getGame(slug: string | undefined) {
  return games.find((game) => game.slug === slug && game.status === 'playable')
}
