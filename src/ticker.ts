import { app } from './common'

let tickerCount = 0
let tickList: any[] = []

export function initTicker() {
  app.ticker.add(() => {
    tickerCount++
    tickList.forEach((item) => {
      if (!item) return
      if (item.paused) return
      if (item.type === 'sin') {
        item.exec(Math.abs(Math.sin(tickerCount / item.speed)))
      } else if (item.type === 'count') {
        item.exec(tickerCount)
      } else {
        item.exec()
      }
    })
  })
}

export function addTicker({
  id,
  exec,
  category,
  type,
  speed = 100,
}: {
  id: string
  exec: (a?: any) => void
  category?: string
  type?: string
  speed?: number
}) {
  if (!tickList.find((item) => item.id === id && item.type === type && item.speed === speed)) {
    tickList.push({ id, exec, category, type, speed })
  }
}

export function removeTickerById(id: string) {
  tickList = tickList.filter((item) => item.id !== id)
}

export function removeTickerByCategory(category: string) {
  if (!category) return
  tickList = tickList.filter((item) => item.category !== category)
}

export function pauseTickerById(id: string) {
  const item = tickList.find((item) => item.id === id)
  if (item) {
    item.paused = true
  }
}
export function restartTickerById(id: string) {
  const item = tickList.find((item) => item.id === id)
  if (item) {
    item.paused = false
  }
}
