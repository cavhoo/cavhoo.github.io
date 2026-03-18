# Project Documentation: cavhoo.github.io

This document outlines the project structure, naming conventions, and programming standards for the portfolio website build with Pixi.js and TypeScript.

## 📁 Folder Structure

- **`/src`**: Core application logic.
  - **`/assets`**: Asset manifests and loading logic.
  - **`/camera`**: Camera systems and viewport management.
  - **`/characters`**: Entity classes for the user and NPCs.
  - **`/types`**: TypeScript interfaces, types, and constants.
  - **`/utilities`**: Helper functions (GSAP, Math, SceneGraph, Overlay, Modal).
  - **`/world`**: World container and scene-specific logic.
    - **`/interiors`**: Interior scene implementations (BaseInterior, LibraryInterior).
- **`/static`**: Static assets served directly.
  - **`/assets/mapdata`**: Tiled `.tmx` and `.tsx` files.
  - **`/assets/textures`**: Spritesheets and images.
  - **`/assets/fonts`**: Web fonts (Jersey10, Silkscreen, Tiny5).
- **`/tiledData`**: Source Tiled project files.
- **`/archived`**: Legacy code and previous iterations for reference.

## 🏷️ Naming Conventions

- **Files**: camelCase (e.g., `sceneGraph.ts`, `user.ts`).
- **Classes**: PascalCase (e.g., `World`, `BaseInterior`, `UserCharacter`).
- **Interfaces/Types**: PascalCase (e.g., `OverlayCoords`, `Building`).
- **Methods/Variables**: camelCase (e.g., `showOverlay`, `isTransitioning`).
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `WORLD_WIDTH`, `TILE_SIZE`).
- **Private/Protected Members**: camelCase (e.g., `this.fadeOverlay`, `this.isTransitioning`).

## 💻 Programming Style & Standards

### TypeScript
- Use strict typing where possible.
- Prefer `interface` for data structures and `class` for complex entities with behavior.
- Use `protected` for members intended for inheritance (e.g., in `BaseInterior`).

### Pixi.js & Rendering
- **Event Mode**: Use `eventMode = "static"` or `"dynamic"` for interactive elements.
- **Scene Graph**: Utilize `SceneGraph.GetComponent(name, parent)` to find elements by their Tiled label/name.
- **Resolution**: The project targets a pixel-perfect feel. `roundPixels: true` and `nearest` scale mode for textures are preferred.

### UI Aesthetic (Brutalist Style)
The HTML overlays and modals follow a **Brutalist / Minimalist** design:
- **Fonts**: Primary use of `'JetBrains Mono', monospace`.
- **Borders**: Thick black borders (e.g., `border: 4px solid black` or `6px`).
- **Shadows**: Solid, non-blurred offsets (e.g., `box-shadow: 8px 8px 0px rgba(0,0,0,1)`).
- **Colors**: High contrast (White, Black, and primary accents like `#FF0000` Red or `#00FF00` Green).
- **Interactions**: Immediate, snappy transitions. Hover states often swap background/text colors or use solid color shifts.

### Transitions & Animations
- Use **GSAP** for all smooth transitions (fades, camera movement, scaling).
- Scene transitions should follow a "Fade to Black -> Swap Content -> Fade In" pattern.
- Camera transformations should be paused (`camera.paused = true`) when showing static interior scenes or full-screen overlays to prevent background scrolling.

### Responsive Design
- Interior scenes should utilize the `fitToScreen` pattern with a virtual design resolution (default: `1280x720`) to ensure content is always visible without scrolling.
- Check for `isTouchDevice()` to differentiate between hover (desktop) and tap (mobile) behaviors.
