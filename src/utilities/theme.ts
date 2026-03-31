import { World } from "../world/world";

type Theme = "auto" | "light" | "dark";

export class ThemeManager {
  private theme: Theme = "auto";
  private world: World;
  private menuContainer: HTMLDivElement | null = null;

  constructor(world: World) {
    this.world = world;
    this.loadTheme();
    this.createToggle();
    this.startAutoUpdate();
  }

  private loadTheme() {
    const saved = localStorage.getItem("theme-preference") as Theme;
    if (saved && ["auto", "light", "dark"].includes(saved)) {
      this.theme = saved;
    }
    this.applyTheme();
  }

  private saveTheme() {
    localStorage.setItem("theme-preference", this.theme);
  }

  private createToggle() {
    if (typeof document === "undefined") return;

    this.menuContainer = document.createElement("div");
    this.menuContainer.style.position = "fixed";
    this.menuContainer.style.bottom = "20px";
    this.menuContainer.style.right = "20px";
    this.menuContainer.style.display = "flex";
    this.menuContainer.style.gap = "10px";
    this.menuContainer.style.zIndex = "3000";

    const themes: Theme[] = ["auto", "light", "dark"];
    themes.forEach((t) => {
      const btn = document.createElement("button");
      btn.innerText = t.toUpperCase();
      btn.style.fontFamily = "'JetBrains Mono', monospace";
      btn.style.fontSize = "12px";
      btn.style.fontWeight = "800";
      btn.style.padding = "8px 12px";
      btn.style.border = "4px solid var(--primary, black)";
      btn.style.cursor = "pointer";
      btn.style.boxShadow = "4px 4px 0px var(--primary, black)";
      btn.style.transition = "transform 0.1s, box-shadow 0.1s, background-color 0.3s, color 0.3s, border-color 0.3s";

      const updateStyle = () => {
        if (this.theme === t) {
          btn.style.backgroundColor = "var(--primary, black)";
          btn.style.color = "var(--secondary, white)";
          btn.style.transform = "translate(2px, 2px)";
          btn.style.boxShadow = "2px 2px 0px var(--primary, black)";
        } else {
          btn.style.backgroundColor = "var(--secondary, white)";
          btn.style.color = "var(--primary, black)";
          btn.style.transform = "translate(0, 0)";
          btn.style.boxShadow = "4px 4px 0px var(--primary, black)";
        }
      };

      btn.onclick = () => {
        this.theme = t;
        this.saveTheme();
        this.applyTheme();
        // Update all buttons
        this.menuContainer?.querySelectorAll("button").forEach((b: any) => {
            const themeValue = b.innerText.toLowerCase() as Theme;
            if (this.theme === themeValue) {
                b.style.backgroundColor = "var(--primary, black)";
                b.style.color = "var(--secondary, white)";
                b.style.transform = "translate(2px, 2px)";
                b.style.boxShadow = "2px 2px 0px var(--primary, black)";
            } else {
                b.style.backgroundColor = "var(--secondary, white)";
                b.style.color = "var(--primary, black)";
                b.style.transform = "translate(0, 0)";
                b.style.boxShadow = "4px 4px 0px var(--primary, black)";
            }
        });
      };

      updateStyle();
      this.menuContainer?.appendChild(btn);
    });

    document.body.appendChild(this.menuContainer);
  }

  private applyTheme() {
    const hour = new Date().getHours();
    this.world.updateTime(hour, this.theme);
    
    // Also apply to body for UI elements if needed
    if (this.theme === "dark" || (this.theme === "auto" && (hour < 6 || hour >= 21))) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
  }

  private startAutoUpdate() {
    setInterval(() => {
      this.applyTheme();
    }, 60000); // Update every minute
  }
}
