;(() => {
  'use strict'

  const canvas = document.getElementById('game')
  const ctx = canvas.getContext('2d')
  const scoreEl = document.getElementById('score')
  const bestEl = document.getElementById('best')
  const overlay = document.getElementById('overlay')
  const overlayTitle = document.getElementById('overlay-title')
  const overlayText = document.getElementById('overlay-text')
  const startBtn = document.getElementById('start')
  const restartBtn = document.getElementById('restart')

  const COLS = 24
  const ROWS = 18
  const STEP = 130
  const BEST_KEY = 'pixel-shelf:snake:best'

  let cell = 20
  let snake = []
  let direction = { x: 1, y: 0 }
  let queue = []
  let food = { x: 17, y: 9 }
  let score = 0
  let best = Number(localStorage.getItem(BEST_KEY) || 0)
  let state = 'idle' // idle | running | paused | over
  let accumulator = 0
  let lastTime = 0
  let raf = 0
  let touchStart = null

  bestEl.textContent = String(best)

  function reset() {
    snake = [
      { x: 8, y: 9 },
      { x: 7, y: 9 },
      { x: 6, y: 9 },
    ]
    direction = { x: 1, y: 0 }
    queue = []
    score = 0
    scoreEl.textContent = '0'
    placeFood()
  }

  function placeFood() {
    const empty = []
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        if (!snake.some((part) => part.x === x && part.y === y)) {
          empty.push({ x, y })
        }
      }
    }
    food = empty.length ? empty[Math.floor(Math.random() * empty.length)] : { x: 0, y: 0 }
  }

  function fit() {
    const rect = canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cell = rect.width / COLS
    draw()
  }

  function roundRect(x, y, size, radius) {
    const r = Math.min(radius, size / 2)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + size, y, x + size, y + size, r)
    ctx.arcTo(x + size, y + size, x, y + size, r)
    ctx.arcTo(x, y + size, x, y, r)
    ctx.arcTo(x, y, x + size, y, r)
    ctx.closePath()
  }

  function draw() {
    const width = COLS * cell
    const height = ROWS * cell

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#FBF8F1'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(47, 111, 98, 0.09)'
    ctx.lineWidth = 1
    for (let x = 1; x < COLS; x += 1) {
      ctx.beginPath()
      ctx.moveTo(x * cell, 0)
      ctx.lineTo(x * cell, height)
      ctx.stroke()
    }
    for (let y = 1; y < ROWS; y += 1) {
      ctx.beginPath()
      ctx.moveTo(0, y * cell)
      ctx.lineTo(width, y * cell)
      ctx.stroke()
    }

    // 食物
    const foodX = food.x * cell + cell / 2
    const foodY = food.y * cell + cell / 2
    ctx.fillStyle = '#E4572E'
    ctx.beginPath()
    ctx.arc(foodX, foodY, cell * 0.3, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.beginPath()
    ctx.arc(foodX - cell * 0.09, foodY - cell * 0.1, cell * 0.08, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#5C9C6F'
    ctx.beginPath()
    ctx.ellipse(
      foodX + cell * 0.1,
      foodY - cell * 0.26,
      cell * 0.12,
      cell * 0.06,
      -0.7,
      0,
      Math.PI * 2,
    )
    ctx.fill()

    // 蛇
    const inset = cell * 0.07
    const size = cell - inset * 2

    for (let i = snake.length - 1; i >= 0; i -= 1) {
      const part = snake[i]
      const progress = snake.length === 1 ? 0 : i / (snake.length - 1)
      ctx.fillStyle =
        i === 0 ? '#1D4A42' : `hsl(168, 28%, ${36 + progress * 16}%)`
      roundRect(
        part.x * cell + inset,
        part.y * cell + inset,
        size,
        i === 0 ? cell * 0.3 : cell * 0.24,
      )
      ctx.fill()
    }

    // 蛇的眼睛
    if (snake.length) {
      const head = snake[0]
      const cx = head.x * cell + cell / 2
      const cy = head.y * cell + cell / 2
      const sideX = -direction.y * cell * 0.17
      const sideY = direction.x * cell * 0.17
      const forwardX = direction.x * cell * 0.12
      const forwardY = direction.y * cell * 0.12

      ctx.fillStyle = '#F7FBF8'
      ctx.beginPath()
      ctx.arc(cx + sideX + forwardX, cy + sideY + forwardY, cell * 0.085, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx - sideX + forwardX, cy - sideY + forwardY, cell * 0.085, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function pushDirection(next) {
    if (state === 'over') return
    const current = queue.length ? queue[queue.length - 1] : direction

    if (next.x + current.x === 0 && next.y + current.y === 0) return
    if (next.x === current.x && next.y === current.y) return
    if (queue.length >= 2) return

    queue.push(next)
  }

  function gameOver() {
    state = 'over'
    showOverlay('游戏结束', `本局得分 ${score} · 最高分 ${best}`, '再来一局')
  }

  function update() {
    if (queue.length) direction = queue.shift()

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }

    if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS) {
      gameOver()
      return
    }

    const eating = head.x === food.x && head.y === food.y
    const limit = eating ? snake.length : snake.length - 1

    for (let i = 0; i < limit; i += 1) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        gameOver()
        return
      }
    }

    snake.unshift(head)

    if (eating) {
      score += 10
      scoreEl.textContent = String(score)
      if (score > best) {
        best = score
        bestEl.textContent = String(best)
        localStorage.setItem(BEST_KEY, String(best))
      }
      placeFood()
    } else {
      snake.pop()
    }
  }

  function loop(now) {
    if (!lastTime) lastTime = now
    const delta = Math.min(now - lastTime, 120)
    lastTime = now

    if (state === 'running') {
      accumulator += delta
      while (accumulator >= STEP) {
        accumulator -= STEP
        update()
        if (state !== 'running') break
      }
    }

    draw()
    raf = requestAnimationFrame(loop)
  }

  function showOverlay(title, text, button) {
    overlayTitle.textContent = title
    overlayText.textContent = text
    startBtn.textContent = button
    overlay.classList.remove('hidden')
  }

  function start() {
    reset()
    state = 'running'
    lastTime = 0
    accumulator = 0
    overlay.classList.add('hidden')
    draw()
  }

  function togglePause() {
    if (state === 'running') {
      state = 'paused'
      showOverlay('已暂停', '按空格或点击下方按钮继续', '继续游戏')
    } else if (state === 'paused') {
      state = 'running'
      lastTime = 0
      overlay.classList.add('hidden')
    }
  }

  const keys = {
    arrowup: { x: 0, y: -1 },
    w: { x: 0, y: -1 },
    arrowdown: { x: 0, y: 1 },
    s: { x: 0, y: 1 },
    arrowleft: { x: -1, y: 0 },
    a: { x: -1, y: 0 },
    arrowright: { x: 1, y: 0 },
    d: { x: 1, y: 0 },
  }

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase()
    const next = keys[key]

    if (next) {
      event.preventDefault()
      if (state === 'idle') start()
      pushDirection(next)
      return
    }

    if (key === ' ') {
      event.preventDefault()
      togglePause()
      return
    }

    if (key === 'r') {
      event.preventDefault()
      start()
    }
  })

  const directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  }

  document.querySelectorAll('[data-dir]').forEach((button) => {
    button.addEventListener('click', () => {
      if (state === 'idle') start()
      const next = directions[button.dataset.dir]
      if (next) pushDirection(next)
    })
  })

  canvas.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0]
      touchStart = { x: touch.clientX, y: touch.clientY }
    },
    { passive: true },
  )

  canvas.addEventListener(
    'touchend',
    (event) => {
      if (!touchStart) return
      const touch = event.changedTouches[0]
      const dx = touch.clientX - touchStart.x
      const dy = touch.clientY - touchStart.y
      touchStart = null

      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
      if (state === 'idle') start()

      if (Math.abs(dx) > Math.abs(dy)) {
        pushDirection({ x: dx > 0 ? 1 : -1, y: 0 })
      } else {
        pushDirection({ x: 0, y: dy > 0 ? 1 : -1 })
      }
    },
    { passive: true },
  )

  startBtn.addEventListener('click', () => {
    if (state === 'paused') togglePause()
    else start()
  })

  restartBtn.addEventListener('click', start)

  window.addEventListener('resize', fit)
  if (window.ResizeObserver) {
    new ResizeObserver(fit).observe(canvas)
  }

  reset()
  fit()
  raf = requestAnimationFrame(loop)
  void raf
})()
