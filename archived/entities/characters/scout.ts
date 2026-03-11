import { AnimatedSprite, Texture } from "pixi.js";
import { NPC, NPCState } from "./npc";

export class Scout extends NPC {
  constructor() {
    super(
      [
        [NPCState.IdleRight, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.IdleUp, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.IdleLeft, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.IdleDown, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingRight, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingUp, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingLeft, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingDown, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      ],
      [0.5, 0.9]
    );
  }
}
