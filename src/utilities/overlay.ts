export interface OverlayCoords {
  x: number;
  y: number;
}

class OverlayManager {
  private overlayElement: HTMLDivElement | null = null;
  private isVisible: boolean = false;

  constructor() {
    this.createOverlayElement();
  }

  private createOverlayElement(): void {
    if (typeof document === "undefined") return;

    // Check if it already exists (e.g., during HMR)
    let el = document.getElementById("html-overlay") as HTMLDivElement;
    if (el) {
      this.overlayElement = el;
      return;
    }

    this.overlayElement = document.createElement("div");
    this.overlayElement.id = "html-overlay";
    this.overlayElement.style.position = "absolute";
    this.overlayElement.style.display = "none";
    this.overlayElement.style.zIndex = "1000";
    this.overlayElement.style.pointerEvents = "none";
    this.overlayElement.style.backgroundColor = "var(--bg-overlay, white)";
    this.overlayElement.style.color = "var(--primary, black)";
    this.overlayElement.style.border = "4px solid var(--primary, black)";
    this.overlayElement.style.padding = "10px";
    this.overlayElement.style.boxShadow = "8px 8px 0px var(--primary, black)";
    this.overlayElement.style.fontFamily = "'JetBrains Mono', monospace";
    this.overlayElement.style.maxWidth = "300px";
    this.overlayElement.style.minWidth = "150px";

    document.body.appendChild(this.overlayElement);
  }

  public showOverlay(title: string, content: string, coords: OverlayCoords): void {
    if (!this.overlayElement) return;

    this.overlayElement.innerHTML = `
      <div style="font-weight: 800; text-transform: uppercase; border-bottom: 2px solid var(--primary, black); margin-bottom: 8px; padding-bottom: 4px; font-size: 1.1rem;">
        ${title}
      </div>
      <div style="font-size: 0.9rem; line-height: 1.4;">
        ${content}
      </div>
    `;

    this.overlayElement.style.display = "block";
    this.isVisible = true;

    // Position the overlay near the mouse, but try to keep it within the viewport
    this.updatePosition(coords);
  }

  public hideOverlay(): void {
    if (!this.overlayElement) return;
    this.overlayElement.style.display = "none";
    this.isVisible = false;
  }

  public updatePosition(coords: OverlayCoords): void {
    if (!this.overlayElement || !this.isVisible) return;

    const offset = 15;
    let x = coords.x + offset;
    let y = coords.y + offset;

    // Check bounds
    const rect = this.overlayElement.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) {
      x = coords.x - rect.width - offset;
    }
    if (y + rect.height > window.innerHeight) {
      y = coords.y - rect.height - offset;
    }

    this.overlayElement.style.left = `${x}px`;
    this.overlayElement.style.top = `${y}px`;
  }
}

export const overlayManager = new OverlayManager();

export const showOverlay = (title: string, content: string, coords: OverlayCoords): void => {
  overlayManager.showOverlay(title, content, coords);
};

export const hideOverlay = (): void => {
  overlayManager.hideOverlay();
};
