;(() => {
  'use strict'

  const tilesLayer = document.getElementById('tiles')
  const gridLayer = document.getElementById('grid')
  const board = document.getElementById('board')
  const scoreEl = document.getElementById('score')
  const bestEl = document.getElementById('best')
  const overlay = document.getElementById('overlay')
  const overlayText = document.getElementById('overlay-text')
  const retryBtn = document.getElementById('retry')
  const newBtn = document.getElementById('new')

  const SIZE = 4
  const BEST_KEY = 'pixel-shelf:2048:best'
  const GAP_RATIO = 0.024

  let grid = []
  let score = 0
  let best = Number(localStorage.getItem(BEST_KEY) || 0)
  let uid = 0
  let tileSize = 0
  let tileGap = 0
  let locked = false
  let over = false
  let touchStart = null

  bestEl.textContent = String(best)

  for (let index = 0; index < SIZE * SIZE; index += 1) {
    gridLayer.appendChild(document.createElement('span'))
  }

  function fontSize(value) {
    const digits = String(value).length
    if (digits <= 2) return tileSize * 0.44
    if (digits === 3) return tileSize * 0.36
    if (digits === 4) return tileSize * 0.28
    return tileSize * 0.23
  }

  function place(tile) {
    if (!tile) return
    tile.el.style.width = `${tileSize}px`
    tile.el.style.height = `${tileSize}px`
    tile.el.style.transform = `translate(${tileGap + tile.c * (tileSize + tileGap)}px, ${
      tileGap + tile.r * (tileSize + tileGap)
    }px)`
    tile.face.style.fontSize = `${fontSize(tile.value)}px`
  }

  function layout() {
    const width = tilesLayer.clientWidth
    if (!width) return
    tileGap = width * GAP_RATIO
    tileSize = (width - tileGap * 5) / SIZE
    for (const row of grid) {
      for (const tile of row) {
        if (tile) place(tile)
      }
    }
  }

  function createTile(r, c, value, isNew) {
    const el = document.createElement('div')
    el.className = 'tile'

    const face = document.createElement('span')
    face.className = 'face'
    face.textContent = String(value)
    face.dataset.value = String(value)
    el.appendChild(face)

    const tile = { id: (uid += 1), r, c, value, el, face }
    place(tile)
    if (isNew) face.classList.add('spawn')
    tilesLayer.appendChild(el)

    grid[r][c] = tile
    return tile
  }

  function emptyCells() {
    const cells = []
    for (let r = 0; r < SIZE; r += 1) {
      for (let c = 0; c < SIZE; c += 1) {
        if (!grid[r][c]) cells.push([r, c])
      }
    }
    return cells
  }

  function spawnTile() {
    const cells = emptyCells()
    if (!cells.length) return
    const [r, c] = cells[Math.floor(Math.random() * cells.length)]
    createTile(r, c, Math.random() < 0.9 ? 2 : 4, true)
  }

  function reset() {
    tilesLayer.innerHTML = ''
    grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
    score = 0
    scoreEl.textContent = '0'
    over = false
    locked = false
    overlay.classList.add('hidden')
    layout()
    spawnTile()
    spawnTile()
  }

  function updateScore() {
    scoreEl.textContent = String(score)
    if (score > best) {
      best = score
      bestEl.textContent = String(best)
      localStorage.setItem(BEST_KEY, String(best))
    }
  }

  function canMove() {
    for (let r = 0; r < SIZE; r += 1) {
      for (let c = 0; c < SIZE; c += 1) {
        const tile = grid[r][c]
        if (!tile) return true
        if (c + 1 < SIZE && grid[r][c + 1] && grid[r][c + 1].value === tile.value) return true
        if (r + 1 < SIZE && grid[r + 1][c] && grid[r + 1][c].value === tile.value) return true
      }
    }
    return false
  }

  function endGame() {
    over = true
    overlayText.textContent = `本局得分 ${score} · 最高分 ${best}`
    overlay.classList.remove('hidden')
  }

  function move(dir) {
    if (locked || over) return

    const dr = dir === 'up' ? -1 : dir === 'down' ? 1 : 0
    const dc = dir === 'left' ? -1 : dir === 'right' ? 1 : 0
    const rows = [0, 1, 2, 3]
    const cols = [0, 1, 2, 3]
    if (dr > 0) rows.reverse()
    if (dc > 0) cols.reverse()

    let moved = false
    const merged = new Set()

    for (const r of rows) {
      for (const c of cols) {
        const tile = grid[r][c]
        if (!tile) continue

        let nr = r
        let nc = c
        let target = null

        while (true) {
          const tr = nr + dr
          const tc = nc + dc
          if (tr < 0 || tr >= SIZE || tc < 0 || tc >= SIZE) break

          const next = grid[tr][tc]
          if (next) {
            if (next.value === tile.value && !merged.has(next.id)) {
              target = next
              nr = tr
              nc = tc
            }
            break
          }

          nr = tr
          nc = tc
        }

        if (target) {
          grid[r][c] = null
          grid[nr][nc] = tile
          tile.r = nr
          tile.c = nc
          place(tile)

          target.r = nr
          target.c = nc
          place(target)
          target.face.classList.remove('spawn')
          target.face.classList.add('vanish')
          const dead = target.el
          window.setTimeout(() => dead.remove(), 170)

          tile.value *= 2
          tile.face.textContent = String(tile.value)
          tile.face.dataset.value = String(tile.value)
          tile.face.classList.add('pop')
          place(tile)
          window.setTimeout(() => tile.face.classList.remove('pop'), 220)

          score += tile.value
          merged.add(tile.id)
          moved = true
        } else if (nr !== r || nc !== c) {
          grid[r][c] = null
          grid[nr][nc] = tile
          tile.r = nr
          tile.c = nc
          place(tile)
          moved = true
        }
      }
    }

    if (!moved) return

    updateScore()
    locked = true
    window.setTimeout(() => {
      spawnTile()
      locked = false
      if (!canMove()) endGame()
    }, 120)
  }

  const keyMap = {
    arrowup: 'up',
    w: 'up',
    arrowdown: 'down',
    s: 'down',
    arrowleft: 'left',
    a: 'left',
    arrowright: 'right',
    d: 'right',
  }

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase()
    const dir = keyMap[key]

    if (dir) {
      event.preventDefault()
      move(dir)
      return
    }

    if (key === 'r') {
      event.preventDefault()
      reset()
    }
  })

  board.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0]
      touchStart = { x: touch.clientX, y: touch.clientY }
    },
    { passive: true },
  )

  board.addEventListener(
    'touchend',
    (event) => {
      if (!touchStart) return
      const touch = event.changedTouches[0]
      const dx = touch.clientX - touchStart.x
      const dy = touch.clientY - touchStart.y
      touchStart = null

      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return

      if (Math.abs(dx) > Math.abs(dy)) {
        move(dx > 0 ? 'right' : 'left')
      } else {
        move(dy > 0 ? 'down' : 'up')
      }
    },
    { passive: true },
  )

  retryBtn.addEventListener('click', reset)
  newBtn.addEventListener('click', reset)

  window.addEventListener('resize', layout)
  if (window.ResizeObserver) {
    new ResizeObserver(layout).observe(tilesLayer)
  }

  requestAnimationFrame(() => {
    layout()
    reset()
  })
})()
