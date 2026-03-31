export class ModalManager {
  private modalContainer: HTMLDivElement | null = null;
  private backdrop: HTMLDivElement | null = null;

  constructor() {
    this.createModalElements();
  }

  private createModalElements(): void {
    if (typeof document === "undefined") return;

    // Check if it already exists (HMR)
    if (document.getElementById("modal-backdrop")) return;

    this.backdrop = document.createElement("div");
    this.backdrop.id = "modal-backdrop";
    this.backdrop.style.position = "fixed";
    this.backdrop.style.top = "0";
    this.backdrop.style.left = "0";
    this.backdrop.style.width = "100vw";
    this.backdrop.style.height = "100vh";
    this.backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    this.backdrop.style.display = "none";
    this.backdrop.style.zIndex = "2000";
    this.backdrop.style.justifyContent = "center";
    this.backdrop.style.alignItems = "center";
    this.backdrop.style.backdropFilter = "blur(4px)";

    this.modalContainer = document.createElement("div");
    this.modalContainer.style.backgroundColor = "var(--secondary, white)";
    this.modalContainer.style.color = "var(--primary, black)";
    this.modalContainer.style.border = "6px solid var(--primary, black)";
    this.modalContainer.style.padding = "40px";
    this.modalContainer.style.maxWidth = "600px";
    this.modalContainer.style.width = "90%";
    this.modalContainer.style.position = "relative";
    this.modalContainer.style.boxShadow = "15px 15px 0px var(--accent, #FF0000)";
    this.modalContainer.style.fontFamily = "'JetBrains Mono', monospace";

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.border = "4px solid var(--primary, black)";
    closeButton.style.backgroundColor = "var(--primary, black)";
    closeButton.style.color = "var(--secondary, white)";
    closeButton.style.padding = "5px 12px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontWeight = "800";
    closeButton.style.fontSize = "1.2rem";
    closeButton.onmouseover = () => {
      closeButton.style.backgroundColor = "var(--secondary, white)";
      closeButton.style.color = "var(--primary, black)";
    };
    closeButton.onmouseout = () => {
      closeButton.style.backgroundColor = "var(--primary, black)";
      closeButton.style.color = "var(--secondary, white)";
    };
    closeButton.onclick = (e) => {
      e.stopPropagation();
      this.hide();
    };

    this.modalContainer.appendChild(closeButton);
    this.backdrop.appendChild(this.modalContainer);
    document.body.appendChild(this.backdrop);

    this.backdrop.onclick = () => this.hide();
    this.modalContainer.onclick = (e) => e.stopPropagation();
  }

  public show(title: string, content: string): void {
    if (!this.modalContainer || !this.backdrop) {
        this.createModalElements();
        // Re-check
        this.backdrop = document.getElementById("modal-backdrop") as HTMLDivElement;
        this.modalContainer = this.backdrop?.firstChild as HTMLDivElement;
    }
    
    if (!this.modalContainer || !this.backdrop) return;

    // Clear previous content (except close button)
    const closeBtn = this.modalContainer.querySelector("button");
    this.modalContainer.innerHTML = "";
    if (closeBtn) this.modalContainer.appendChild(closeBtn);

    const titleEl = document.createElement("h2");
    titleEl.innerText = title;
    titleEl.style.textTransform = "uppercase";
    titleEl.style.fontSize = "2.5rem";
    titleEl.style.marginBottom = "20px";
    titleEl.style.borderBottom = "8px solid var(--primary, black)";
    titleEl.style.paddingBottom = "10px";

    const contentEl = document.createElement("div");
    contentEl.innerHTML = content;
    contentEl.style.fontSize = "1.1rem";
    contentEl.style.lineHeight = "1.6";

    this.modalContainer.appendChild(titleEl);
    this.modalContainer.appendChild(contentEl);

    this.backdrop.style.display = "flex";
  }

  public hide(): void {
    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) backdrop.style.display = "none";
  }
}

export const modalManager = new ModalManager();

export const showModal = (title: string, content: string) => {
  modalManager.show(title, content);
};

export const hideModal = () => {
  modalManager.hide();
};
