import { World } from "../world/world";
import { Point } from "pixi.js";

export class DebugManager {
  private isVisible: boolean = false;
  private world: World;
  private debugContainer: HTMLDivElement | null = null;
  private toggleButton: HTMLButtonElement | null = null;
  private worldPosLabel: HTMLDivElement | null = null;
  private screenPosLabel: HTMLDivElement | null = null;

  constructor(world: World) {
    this.world = world;
    this.createToggleButton();
    this.createDebugDisplay();
  }

  private createToggleButton() {
    if (typeof document === "undefined") return;

    this.toggleButton = document.createElement("button");
    this.toggleButton.innerText = "DEBUG: OFF";
    this.toggleButton.style.position = "fixed";
    this.toggleButton.style.bottom = "20px";
    this.toggleButton.style.left = "20px";
    this.toggleButton.style.zIndex = "3000";
    this.toggleButton.style.fontFamily = "'JetBrains Mono', monospace";
    this.toggleButton.style.fontSize = "12px";
    this.toggleButton.style.fontWeight = "800";
    this.toggleButton.style.padding = "8px 12px";
    this.toggleButton.style.border = "4px solid var(--primary, black)";
    this.toggleButton.style.backgroundColor = "var(--secondary, white)";
    this.toggleButton.style.color = "var(--primary, black)";
    this.toggleButton.style.cursor = "pointer";
    this.toggleButton.style.boxShadow = "4px 4px 0px var(--primary, black)";
    this.toggleButton.style.transition = "transform 0.1s, box-shadow 0.1s";

    this.toggleButton.onclick = () => {
      this.isVisible = !this.isVisible;
      this.updateUI();
    };

    document.body.appendChild(this.toggleButton);
  }

  private createDebugDisplay() {
    if (typeof document === "undefined") return;

    this.debugContainer = document.createElement("div");
    this.debugContainer.style.position = "fixed";
    this.debugContainer.style.top = "20px";
    this.debugContainer.style.right = "20px";
    this.debugContainer.style.zIndex = "3000";
    this.debugContainer.style.display = "none";
    this.debugContainer.style.flexDirection = "column";
    this.debugContainer.style.gap = "5px";
    this.debugContainer.style.padding = "10px";
    this.debugContainer.style.backgroundColor = "var(--secondary, white)";
    this.debugContainer.style.border = "4px solid var(--primary, black)";
    this.debugContainer.style.boxShadow = "8px 8px 0px var(--primary, black)";
    this.debugContainer.style.fontFamily = "'JetBrains Mono', monospace";
    this.debugContainer.style.fontSize = "12px";
    this.debugContainer.style.fontWeight = "800";
    this.debugContainer.style.color = "var(--primary, black)";
    this.debugContainer.style.pointerEvents = "none";

    const title = document.createElement("div");
    title.innerText = "DEBUG INFO";
    title.style.borderBottom = "2px solid var(--primary, black)";
    title.style.marginBottom = "5px";
    title.style.paddingBottom = "2px";
    this.debugContainer.appendChild(title);

    this.worldPosLabel = document.createElement("div");
    this.screenPosLabel = document.createElement("div");

    this.debugContainer.appendChild(this.worldPosLabel);
    this.debugContainer.appendChild(this.screenPosLabel);

    document.body.appendChild(this.debugContainer);
  }

  private updateUI() {
    if (!this.toggleButton || !this.debugContainer) return;

    if (this.isVisible) {
      this.toggleButton.innerText = "DEBUG: ON";
      this.toggleButton.style.backgroundColor = "var(--primary, black)";
      this.toggleButton.style.color = "var(--secondary, white)";
      this.toggleButton.style.transform = "translate(2px, 2px)";
      this.toggleButton.style.boxShadow = "2px 2px 0px var(--primary, black)";
      this.debugContainer.style.display = "flex";
    } else {
      this.toggleButton.innerText = "DEBUG: OFF";
      this.toggleButton.style.backgroundColor = "var(--secondary, white)";
      this.toggleButton.style.color = "var(--primary, black)";
      this.toggleButton.style.transform = "translate(0, 0)";
      this.toggleButton.style.boxShadow = "4px 4px 0px var(--primary, black)";
      this.debugContainer.style.display = "none";
    }
  }

  public updateMousePosition(screenPos: Point) {
    if (!this.isVisible || !this.worldPosLabel || !this.screenPosLabel) return;

    const worldPos = this.world.toLocal(screenPos);

    this.screenPosLabel.innerText = `SCREEN: X: ${Math.round(screenPos.x)} Y: ${Math.round(screenPos.y)}`;
    this.worldPosLabel.innerText = `WORLD:  X: ${Math.round(worldPos.x)} Y: ${Math.round(worldPos.y)}`;
  }
}
