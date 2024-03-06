import { Text, Container, EventMode, Graphics, Sprite, Texture } from 'pixi.js'
import { nanoid } from 'nanoid'
import { addTicker, pauseTickerById, restartTickerById } from './ticker'
import { app } from './common'

const danmuList = [
  { text: 'aa' },
  { text: 'asdfa' },
  { text: 'dfasdf' },
  { text: 'cszdxczx' },
  { text: 'awedsasdasd' },
  { text: 'szdxfsdafsdfsdf' },
  { text: 'aa' },
  { text: 'asdfa' },
  { text: 'dfasdf' },
  { text: 'cszdxczx' },
  { text: 'awedsasdasd' },
  { text: 'szdxfsdafsdfsdf' },
  { text: 'aa' },
  { text: 'asdfa' },
  { text: 'dfasdf' },
  { text: 'cszdxczx' },
  { text: 'awedsasdasd' },
  { text: 'szdxfsdafsdfsdf' },
  { text: 'aa' },
  { text: 'asdfa' },
  { text: 'dfasdf' },
  { text: 'cszdxczx' },
  { text: 'awedsasdasd' },
  { text: 'szdxfsdafsdfsdf' },
]

const localContainer = new Container()

export function initDanmu() {
  localContainer.x = 0
  localContainer.y = MIN_Y
  const mask = new Sprite(Texture.WHITE)
  mask.width = app.renderer.width
  mask.height = MAX_Y
  localContainer.addChild(mask)
  localContainer.mask = mask
  const background = new Graphics()
    .beginFill('rgba(0,0,0,0.2)')
    .drawRect(0, 0, app.renderer.width, MAX_Y)
    .endFill()
  localContainer.addChild(background)
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
  constructor(text: string | number) {
    super()
    this.id = nanoid()
    const textChild = new Text(text)
    textChild.name = 'text'
    this.addChild(textChild)
    this.init()
    addTicker({ id: this.id, cb: this.fly.bind(this) })
    this.on('pointerover', () => {
      textChild.style.fontWeight = 'bold'
      pauseTickerById(this.id)
    })
    this.on('pointerout', () => {
      textChild.style.fontWeight = 'normal'
      restartTickerById(this.id)
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
