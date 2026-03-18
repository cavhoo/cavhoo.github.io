import { Text } from "pixi.js";
import { BaseInterior } from "./baseInterior";

export class HomeInterior extends BaseInterior {
  constructor() {
    super("My Home", "#1a2a3a"); // Darker blue for library vibes

    const description = new Text({
      text: "A vast digital archive of past projects and technical documentation.\nEach terminal here contains a piece of my development journey.",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 18,
        fill: "#cccccc",
        lineHeight: 28,
      },
    });
    description.position.set(40, 120);
    this.addChild(description);

    // Add some mock terminal labels
    const projects = ["Project Alpha", "Project Beta", "Legacy System 01", "Graphics Engine V2"];
    projects.forEach((name, i) => {
      const pText = new Text({
        text: `> TERMINAL_${i + 1}: ${name}`,
        style: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 20,
          fill: "#00FF00", // Retro terminal green
        },
      });
      pText.position.set(60, 240 + i * 40);
      this.addChild(pText);
    });
  }
}
