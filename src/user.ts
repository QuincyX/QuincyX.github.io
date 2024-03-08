import { Text, Container, EventMode, Graphics, Sprite, Texture } from 'pixi.js'
import { addTicker, pauseTickerById, restartTickerById } from './ticker'
import { app } from './common'
import { createBoxContainer } from './util'

let localContainer: BoxContainer
const MIN_SIZE = 30
const MAX_SIZE = 50
let targetPosition = {
  x: 0,
  y: 0,
}

export function initUser() {
  localContainer = createBoxContainer(800, 600, 20)
  localContainer.fillBackgroundColor('rgba(0,0,0,0.2)')
  localContainer.fillTextCenter('Quincy')
  localContainer.setCenterPivot()
  localContainer.x = app.renderer.width / 2
  localContainer.y = app.renderer.height / 2 + 300

  localContainer.textCenter.style.fill = 'white'
  localContainer.textCenter.style.fontSize = 80
  localContainer.textCenter.style.fontWeight = 'bold'

  localContainer.textCenter.eventMode = 'static'
  targetPosition = {
    x: localContainer.boxWidth / 2,
    y: localContainer.boxHeight / 2,
  }
  localContainer.textCenter.onpointerenter = () => {
    targetPosition = getRandomPosition()
  }
  localContainer.textCenter.onpointerdown = () => {
    alert('被你抓到了!')
  }

  app.stage.addChild(localContainer)

  addTicker({
    id: localContainer.id,
    exec: () => {
      if (targetPosition.x !== localContainer.textCenter.x) {
        localContainer.textCenter.x += Math.floor(
          (targetPosition.x - localContainer.textCenter.x) * 0.1
        )
      }
      if (targetPosition.y !== localContainer.textCenter.y) {
        localContainer.textCenter.y += Math.floor(
          (targetPosition.y - localContainer.textCenter.y) * 0.1
        )
      }
    },
  })
}

let whileLoopCount = 0 // 防止死循环
function getRandomPosition() {
  let x = Math.floor(
    Math.random() * (localContainer.boxWidth - localContainer.textCenter.width) +
      localContainer.textCenter.width * 0.5
  )
  let y = Math.floor(
    Math.random() * (localContainer.boxHeight - localContainer.textCenter.height) +
      localContainer.textCenter.height * 0.5
  )
  while (
    Math.abs(y - localContainer.textCenter.y) < localContainer.textCenter.height &&
    Math.abs(x - localContainer.textCenter.x) < localContainer.textCenter.width &&
    whileLoopCount < 100
  ) {
    whileLoopCount++
    x = Math.floor(
      Math.random() * (localContainer.boxWidth - localContainer.textCenter.width * 2) +
        localContainer.textCenter.width
    )
    y = Math.floor(
      Math.random() * (localContainer.boxHeight - localContainer.textCenter.height * 2) +
        localContainer.textCenter.height
    )
  }
  whileLoopCount = 0
  return {
    x,
    y,
  }
}
