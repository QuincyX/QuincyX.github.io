import { Container, Graphics, Sprite, Texture, Text } from 'pixi.js'

declare global {
  interface BoxContainer extends Container {
    id : string
    boxWidth: number
    boxHeight: number
    mask: Container
    textCenter: Text
    fillBackgroundColor: (color: string) => void
    fillBackgroundImage: (url: string) => void
    fillTextCenter: (text: string) => void
    setCenterPivot: () => void
    getCenterPosition: () => { x: number; y: number }
  }
}
