---
title: 用 Canvas 写一条贪吃蛇
date: 2026-11-06
summary: 不引入游戏引擎，从网格、固定步长到输入缓冲，一步步把贪吃蛇跑起来。
tags: Canvas, 游戏开发, JavaScript
---

贪吃蛇是那种「看起来很简单，写起来全是细节」的题目。这篇文章记录我在这个站点里实现它时的几个关键决定。

## 一切都建立在网格上

不要用像素坐标去思考，用格子。整个游戏世界是一个 `24 × 18` 的网格，每个格子边长 20 像素，绘制时再乘上格子大小。

```js
const COLS = 24
const ROWS = 18
const CELL = 20

function toPixels(point) {
  return { x: point.x * CELL, y: point.y * CELL }
}
```

这样做的好处是碰撞检测变成了一次整数比较，蛇和食物的位置永远不会出现半像素的偏移。

## 用固定步长驱动，而不是每一帧

新手常犯的错误是把「移动」写在 `requestAnimationFrame` 里，结果帧率越高蛇跑得越快。

正确做法是：渲染跟着帧率走，逻辑按固定时间间隔走。

```js
let accumulator = 0
const STEP = 140 // 毫秒

function loop(now) {
  const delta = now - lastTime
  lastTime = now
  accumulator += delta

  while (accumulator >= STEP) {
    update()
    accumulator -= STEP
  }

  draw()
  requestAnimationFrame(loop)
}
```

这样在 60Hz 和 144Hz 的屏幕上，游戏速度是一致的。

## 输入要缓冲，不能直接改方向

如果按下方向键就立刻改变 `direction`，那么在一帧内连按两次「上、右」，蛇可能会直接掉头咬到自己。

我用一个队列保存输入，每次 `update` 时只取一个：

```js
function pushDirection(next) {
  const current = queue.length ? queue[queue.length - 1] : direction

  // 不能 180 度掉头，也不能和上一次输入相同
  if (next.x + current.x === 0 && next.y + current.y === 0) return
  if (next.x === current.x && next.y === current.y) return
  if (queue.length > 2) return

  queue.push(next)
}
```

两行判断，解决掉一大类手感问题。

## 移动端只需要三个按钮

触屏不需要花哨的手势。屏幕下方放三个方向键，加上键盘监听，两种输入方式共用同一个 `pushDirection`。

再补一句 `touch-action: none`，避免手机在滑动时滚动页面。

## 最后

整个游戏不到三百行，没有任何依赖。它现在就摆在这个站点的陈列室里，你可以直接点开玩。

写小游戏最愉快的地方在于：每一个决定都能立刻被手指感知到。快一点、慢一点、卡一下，玩家都知道。
