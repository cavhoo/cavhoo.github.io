export const assetManifest = {
  bundles: [
    {
      name: "base",
      assets: [
        {
          alias: "Jersey10",
          src: "/assets/fonts/Jersey10-Regular.woff2",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "Tiny5",
          src: "/assets/fonts/Tiny5-Regular.woff2",
          data: { scaleMode: "nearest" },
        },
      ],
    },
    {
      name: "tiles",
      assets: [
        {
          alias: "grass_tiles",
          src: "/assets/textures/grass.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "city_tiles",
          src: "/assets/textures/city.json",
          data: { scaleMode: "nearest" },
        },
      ],
    },
    {
      name: "props",
      assets: [
        {
          alias: "props",
          src: "/assets/textures/props.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "villas",
          src: "/assets/textures/houses1.json",
          data: { scaleMode: "nearest" },
        },
      ],
    },
    {
      name: "characters",
      assets: [
        {
          alias: "scout1standing",
          src: "/assets/animations/scout1standing.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "scout1idle",
          src: "/assets/animations/scout1idle.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "scout1walking",
          src: "/assets/animations/scout1walking.json",
          data: { scaleMode: "nearest" },
        },
      ],
    },
  ],
};
