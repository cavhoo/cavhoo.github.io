class IntroOverlay {
  private backdrop: HTMLDivElement | null = null;
  private isVisible = false;

  constructor() {
    this.createElements();
  }

  private createElements(): void {
    if (typeof document === "undefined") return;

    const existingBackdrop = document.getElementById("intro-overlay-backdrop") as HTMLDivElement | null;
    if (existingBackdrop) {
      this.backdrop = existingBackdrop;
      return;
    }

    this.backdrop = document.createElement("div");
    this.backdrop.id = "intro-overlay-backdrop";
    this.backdrop.style.position = "fixed";
    this.backdrop.style.inset = "0";
    this.backdrop.style.display = "none";
    this.backdrop.style.alignItems = "center";
    this.backdrop.style.justifyContent = "center";
    this.backdrop.style.padding = "24px";
    this.backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.18)";
    this.backdrop.style.zIndex = "3500";

    document.body.appendChild(this.backdrop);
  }

  public show(onEnter: () => void): void {
    if (!this.backdrop) {
      this.createElements();
    }

    if (!this.backdrop) return;

    this.backdrop.innerHTML = "";

    const card = document.createElement("div");
    card.style.backgroundColor = "var(--bg-overlay, white)";
    card.style.color = "var(--primary, black)";
    card.style.border = "4px solid var(--primary, black)";
    card.style.boxShadow = "8px 8px 0px var(--primary, black)";
    card.style.fontFamily = "'JetBrains Mono', monospace";
    card.style.width = "min(640px, 100%)";
    card.style.maxWidth = "640px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.gap = "20px";
    card.style.padding = "28px";
    card.style.pointerEvents = "auto";

    const titleEl = document.createElement("div");
    titleEl.textContent = "Welcome Visitors to my corner of the internet!";
    titleEl.style.fontWeight = "800";
    titleEl.style.textTransform = "uppercase";
    titleEl.style.borderBottom = "4px solid var(--primary, black)";
    titleEl.style.paddingBottom = "10px";
    titleEl.style.fontSize = "clamp(1.25rem, 3vw, 1.8rem)";

    const introWrapper = document.createElement("div");
    introWrapper.style.display = "flex";
    introWrapper.style.flexDirection = "column";
    introWrapper.style.gap = "10px";

    const nameEl = document.createElement("p");
    nameEl.textContent =
      "Hello! I'm Hendrik Mueller-Roehr - professional pixel wrangler, bug whisperer, and recovering Stack Overflow addict. I build things that work on the first try... eventually. Passionate about great code, terrible puns, and making the internet just a little bit better (and way more fun).";
    nameEl.style.margin = "0";
    nameEl.style.fontSize = "1rem";
    nameEl.style.lineHeight = "1.6";
    nameEl.style.fontWeight = "800";

    const introEl = document.createElement("p");
    introEl.textContent = "This is an interactive portfolio page for you to explore. Move through scene with keyboard or click any reachable point to guide character there.";
    introEl.style.margin = "0";
    introEl.style.fontSize = "1rem";
    introEl.style.lineHeight = "1.6";

    introWrapper.append(nameEl, introEl);

    const listEl = document.createElement("div");
    listEl.style.display = "flex";
    listEl.style.flexDirection = "column";
    listEl.style.gap = "10px";

    const instructions = [
      { control: "Arrow Up", action: "Move up" },
      { control: "Arrow Down", action: "Move down" },
      { control: "Arrow Left", action: "Move left" },
      { control: "Arrow Right", action: "Move right" },
      { control: "Click", action: "Move toward clicked area" },
    ];

    instructions.forEach(({ control, action }) => {
      const row = document.createElement("div");
      row.style.display = "grid";
      row.style.gridTemplateColumns = "minmax(140px, 170px) 1fr";
      row.style.columnGap = "12px";
      row.style.rowGap = "4px";
      row.style.alignItems = "start";

      const controlEl = document.createElement("div");
      controlEl.textContent = control;
      controlEl.style.fontWeight = "800";
      controlEl.style.textTransform = "uppercase";

      const actionEl = document.createElement("div");
      actionEl.textContent = action;
      actionEl.style.lineHeight = "1.5";

      row.append(controlEl, actionEl);
      listEl.appendChild(row);
    });

    const enterButton = document.createElement("button");
    enterButton.textContent = "Enter";
    enterButton.style.width = "100%";
    enterButton.style.border = "4px solid var(--primary, black)";
    enterButton.style.backgroundColor = "var(--primary, black)";
    enterButton.style.color = "var(--secondary, white)";
    enterButton.style.padding = "12px 18px";
    enterButton.style.cursor = "pointer";
    enterButton.style.fontFamily = "'JetBrains Mono', monospace";
    enterButton.style.fontSize = "1rem";
    enterButton.style.fontWeight = "800";
    enterButton.style.textTransform = "uppercase";
    enterButton.style.boxShadow = "4px 4px 0px var(--primary, black)";
    enterButton.style.transition = "transform 0.1s, box-shadow 0.1s, background-color 0.2s, color 0.2s";
    enterButton.onmouseover = () => {
      enterButton.style.backgroundColor = "var(--secondary, white)";
      enterButton.style.color = "var(--primary, black)";
    };
    enterButton.onmouseout = () => {
      enterButton.style.backgroundColor = "var(--primary, black)";
      enterButton.style.color = "var(--secondary, white)";
      enterButton.style.transform = "translate(0, 0)";
      enterButton.style.boxShadow = "4px 4px 0px var(--primary, black)";
    };
    enterButton.onmousedown = () => {
      enterButton.style.transform = "translate(2px, 2px)";
      enterButton.style.boxShadow = "2px 2px 0px var(--primary, black)";
    };
    enterButton.onmouseup = () => {
      enterButton.style.transform = "translate(0, 0)";
      enterButton.style.boxShadow = "4px 4px 0px var(--primary, black)";
    };
    enterButton.onclick = () => {
      this.hide();
      onEnter();
    };

    card.append(titleEl, introWrapper, listEl, enterButton);
    this.backdrop.appendChild(card);
    this.backdrop.style.display = "flex";
    this.isVisible = true;

    requestAnimationFrame(() => enterButton.focus());
  }

  public hide(): void {
    if (!this.backdrop) return;
    this.backdrop.style.display = "none";
    this.isVisible = false;
  }

  public get visible(): boolean {
    return this.isVisible;
  }
}

export const introOverlay = new IntroOverlay();

export const showIntroOverlay = (onEnter: () => void): void => {
  introOverlay.show(onEnter);
};

export const hideIntroOverlay = (): void => {
  introOverlay.hide();
};

export const isIntroOverlayVisible = (): boolean => {
  return introOverlay.visible;
};
