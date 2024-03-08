import { nanoid } from 'nanoid'
import { Container, Graphics, Sprite, Texture, Text, Color } from 'pixi.js'

export function createBoxContainer(width: number, height: number, radius?: number) {
  const container = <BoxContainer>new Container()
  container.id = nanoid()
  container.boxWidth = width
  container.boxHeight = height
  const mask = new Graphics()
    .beginFill(new Color('white'))
    .drawRoundedRect(0, 0, container.boxWidth, container.boxHeight, radius || 0)
    .endFill()
  mask.width = width
  mask.height = height
  container.addChild(mask)
  container.mask = mask

  container.fillBackgroundColor = (color: string) => {
    const background = new Graphics()
      .beginFill(new Color(color))
      .drawRect(0, 0, container.boxWidth, container.boxHeight)
      .endFill()
    background.zIndex = -1
    container.addChild(background)
  }
  container.fillBackgroundImage = (url: string) => {
    const background = new Sprite(Texture.from(url))
    background.width = container.boxWidth
    background.height = container.boxHeight
    background.zIndex = -1
    container.addChild(background)
  }
  container.fillTextCenter = (text: string) => {
    const textChild = new Text(text)
    textChild.x = container.boxWidth / 2
    textChild.y = container.boxHeight / 2
    textChild.resolution = 2
    textChild.anchor.set(0.5)
    container.textCenter = textChild
    container.addChild(textChild)
  }
  container.setCenterPivot = () => {
    container.pivot.x = container.boxWidth / 2
    container.pivot.y = container.boxHeight / 2
  }
  container.getCenterPosition = () => {
    return {
      x: container.x + container.boxWidth / 2,
      y: container.y + container.boxHeight / 2,
    }
  }
  return container
}
