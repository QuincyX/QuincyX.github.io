import { Text, Container, EventMode } from 'pixi.js'
import { nanoid } from 'nanoid'
import { addTicker, pauseTickerById, restartTickerById } from './ticker'
import { app } from './common'
import { createBoxContainer } from './util'

// 富强、民主、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善
const danmuList = [
  { text: '富强' },
  { text: '民主' },
  { text: '文明' },
  { text: '和谐' },
  { text: '自由' },
  { text: '平等' },
  { text: '公正' },
  { text: '法治' },
  { text: '爱国' },
  { text: '敬业' },
  { text: '诚信' },
  { text: '友善' },
  { text: '富强' },
  { text: '民主' },
  { text: '文明' },
  { text: '和谐' },
  { text: '自由' },
  { text: '平等' },
  { text: '公正' },
  { text: '法治' },
  { text: '爱国' },
  { text: '敬业' },
  { text: '诚信' },
  { text: '友善' },
  { text: '富强' },
  { text: '民主' },
  { text: '文明' },
  { text: '和谐' },
  { text: '自由' },
  { text: '平等' },
  { text: '公正' },
  { text: '法治' },
  { text: '爱国' },
  { text: '敬业' },
  { text: '诚信' },
  { text: '友善' },
]

let localContainer: BoxContainer

export function initDanmu() {
  localContainer = createBoxContainer(app.renderer.width, MAX_Y)
  localContainer.x = 0
  localContainer.y = MIN_Y
  localContainer.fillBackgroundColor('rgba(0,0,0,0.2)')
  app.stage.addChild(localContainer)
  danmuList.forEach((item) => {
    const danmuItem = new DanmuItem(item.text)
    localContainer.addChild(danmuItem)
  })
}

export function clearAllDanmu() {}

class DanmuItem extends Container {
  id: string
  speed = 0
  size = 10
  cursor = 'pointer'
  eventMode: EventMode = 'static'
  isShining = false
  constructor(text: string | number) {
    super()
    this.id = nanoid()
    const textChild = new Text(text)
    textChild.name = 'text'
    textChild.style.fontWeight = 'bold'
    this.addChild(textChild)
    this.init()
    addTicker({
      id: this.id,
      exec: this.fly.bind(this),
    })
    addTicker({
      id: this.id,
      type: 'sin',
      speed: 8,
      exec: this.shining.bind(this),
    })
    this.on('pointerover', () => {
      textChild.style.fontWeight = 'normal'
      pauseTickerById(this.id)
      this.isShining = true
    })
    this.on('pointerout', () => {
      textChild.style.fontWeight = 'bold'
      restartTickerById(this.id)
      textChild.alpha = 1
      this.isShining = false
    })
  }
  init() {
    this.x = app.renderer.width + this.width + getRandomX()
    this.size = getRandomSize()
    const textChild: Text | null = this.getChildByName('text')
    if (textChild) {
      textChild.style.fontSize = this.size
      textChild.style.fill = getRandomColor()
    }
    this.y = getRandomY()
    this.speed = getRandomSpeed()
    while (checkCollision(this)) {
      this.y = getRandomY()
      this.speed = getRandomSpeed()
    }
  }
  fly() {
    this.x -= this.speed
    if (this.x < -this.width) {
      this.init()
    }
  }
  shining(sin: number) {
    if (!this.isShining) return
    const textChild = this.getChildByName('text')
    if (textChild) {
      textChild.alpha = sin
    }
  }
}

function checkCollision(item: any) {
  return localContainer.children.some((child: any) => {
    if (child === item) return false
    return child.speed === item.speed && Math.abs(child.y - item.y) < 10
  })
}

const MIN_X = 0
const MAX_X = 600
function getRandomX() {
  return Math.floor(Math.random() * (MAX_X - MIN_X) + MIN_X)
}

const MIN_Y = 50
const MAX_Y = 500
function getRandomY() {
  return Math.floor(Math.random() * (MAX_Y - MIN_Y) + MIN_Y - MAX_SIZE)
}

const MIN_SPEED = 1
const MAX_SPEED = 5
function getRandomSpeed() {
  return Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED)
}

const MIN_SIZE = 14
const MAX_SIZE = 50
function getRandomSize() {
  return Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE)
}

const COLOR_LIST = ['#ff4757', '#ff6348', '#ffa502', '#2ed573', '#1e90ff', '#3742fa']
function getRandomColor() {
  return COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)]
}
