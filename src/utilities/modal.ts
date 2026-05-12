export interface ModalEntry {
  title: string;
  subtitle?: string;
  meta?: string;
  description: string;
}

export type ModalContent = string | ModalEntry[];

export class ModalManager {
  private modalContainer: HTMLDivElement | null = null;
  private backdrop: HTMLDivElement | null = null;
  private isVisible = false;

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
    this.modalContainer.style.boxSizing = "border-box";
    this.modalContainer.style.maxHeight = "calc(100vh - 48px)";
    this.modalContainer.style.maxWidth = "760px";
    this.modalContainer.style.overflowY = "auto";
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

  private createEntryList(entries: ModalEntry[]): HTMLDivElement {
    const listEl = document.createElement("div");
    listEl.style.display = "flex";
    listEl.style.flexDirection = "column";
    listEl.style.gap = "18px";

    entries.forEach((entry) => {
      const entryEl = document.createElement("article");
      entryEl.style.border = "4px solid var(--primary, black)";
      entryEl.style.padding = "18px";
      entryEl.style.boxShadow = "6px 6px 0px var(--primary, black)";

      const titleEl = document.createElement("h3");
      titleEl.innerText = entry.title;
      titleEl.style.fontSize = "1.25rem";
      titleEl.style.margin = "0 0 8px";
      titleEl.style.textTransform = "uppercase";

      entryEl.appendChild(titleEl);

      if (entry.subtitle || entry.meta) {
        const metaEl = document.createElement("div");
        metaEl.style.display = "flex";
        metaEl.style.flexWrap = "wrap";
        metaEl.style.gap = "8px 16px";
        metaEl.style.marginBottom = "12px";
        metaEl.style.fontSize = "0.95rem";
        metaEl.style.fontWeight = "800";

        if (entry.subtitle) {
          const subtitleEl = document.createElement("span");
          subtitleEl.innerText = entry.subtitle;
          metaEl.appendChild(subtitleEl);
        }

        if (entry.meta) {
          const durationEl = document.createElement("span");
          durationEl.innerText = entry.meta;
          durationEl.style.color = "var(--accent, #FF0000)";
          metaEl.appendChild(durationEl);
        }

        entryEl.appendChild(metaEl);
      }

      const descriptionEl = document.createElement("p");
      descriptionEl.innerText = entry.description;
      descriptionEl.style.margin = "0";
      descriptionEl.style.lineHeight = "1.6";
      entryEl.appendChild(descriptionEl);

      listEl.appendChild(entryEl);
    });

    return listEl;
  }

  public show(title: string, content: ModalContent): void {
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
    contentEl.style.fontSize = "1.1rem";
    contentEl.style.lineHeight = "1.6";
    if (Array.isArray(content)) {
      contentEl.appendChild(this.createEntryList(content));
    } else {
      contentEl.innerHTML = content;
    }

    this.modalContainer.appendChild(titleEl);
    this.modalContainer.appendChild(contentEl);

    this.backdrop.style.display = "flex";
    this.isVisible = true;
  }

  public hide(): void {
    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) backdrop.style.display = "none";
    this.isVisible = false;
  }

  public get visible(): boolean {
    return this.isVisible;
  }
}

export const modalManager = new ModalManager();

export const showModal = (title: string, content: ModalContent) => {
  modalManager.show(title, content);
};

export const hideModal = () => {
  modalManager.hide();
};

export const isModalVisible = (): boolean => {
  return modalManager.visible;
};
