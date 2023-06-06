import { Text, TextStyle } from "pixi.js";

export const getCharacterWidth = (char: string, fontStyle: TextStyle | Partial<TextStyle>) => {
  const text = new Text(char, fontStyle)
  return text.width
}

export const findNextSpaceFromIndex = (searchString: string, startIndex: number): number => {
  let nextSpace = 0
  for (let i = startIndex; i < searchString.length; i++) {
    if (searchString[i] === ' ') {
      nextSpace = i
      break
    }
  }
  return nextSpace
}
