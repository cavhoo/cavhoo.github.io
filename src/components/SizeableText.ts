import { Text, TextStyle } from "pixi.js";
import {
  getCharacterWidth,
  findNextSpaceFromIndex
} from "../utils/string.utils";

export class SizeableText extends Text {
  private _maxWidth: number
  constructor(text: string, style: Partial<TextStyle>, width: number) {
    super(text, style)
    this._maxWidth = width
    this.init()
  }

  private init() {
    const charWidth = getCharacterWidth('w', this.style)

    const currentText = this.text;

    // TODO: Insert \n at last ' ' on line
    // TODO: Break work
    const maxLengthPerLine = Math.floor(this._maxWidth / charWidth)
    let lines: string[] = []
    let line = ""
    let lastSpaceIndex = -1

    for(let i = 0;i<currentText.length;i++) {
      const nextChar = currentText[i]
      if (line.length < maxLengthPerLine - 1) {
        if (i >= Math.floor(maxLengthPerLine * 0.8)) {
          line += nextChar
          if (nextChar === ' ') {
            lastSpaceIndex = line.length
            const nextSpaceIndex = findNextSpaceFromIndex(currentText, i + 1)
            if ((nextSpaceIndex - lines.reduce((length, line) => length += line.length, 0)) >= maxLengthPerLine) {
              lines.push(line.slice(0, lastSpaceIndex))
              i = lines.reduce((length, line) => length += line.length, 0) - 1 // Go back one more Character to redo the last iteration
              line = ""
              continue
            }
          }
        } else {
          line += nextChar
        }
      } else {
        lines.push(`${line}`)
        line = nextChar
      }
    }
    lines.push(line)

    this.text = lines.map((line) => line.trim()).join("\n")

  }
 
}
