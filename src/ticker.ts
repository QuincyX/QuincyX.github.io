import { app } from './common'

let tickList: any[] = []

export function initTicker() {
  app.ticker.add(() => {
    tickList.forEach((item) => {
      if (item.paused) return
      item?.cb()
    })
  })
}

export function addTicker({ id, cb, category }: { id: string; cb: Function; category?: string }) {
  if (!tickList.find((item) => item.id === id)) {
    tickList.push({ id, cb, category })
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
