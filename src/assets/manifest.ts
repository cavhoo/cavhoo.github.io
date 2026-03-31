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
        {
          alias: "Silkscreen",
          src: "/assets/fonts/Silkscreen-Regular.woff2",
          data: { scaleMode: "nearest" },
        },
      ],
    },
    {
      name: "tiles",
      assets: [
        {
          alias: "town",
          src: "/assets/mapdata/town.tmx",
          data: { scaleMode: "nearest" },
        },
      ],
    },
    {
      name: "animations",
      assets: [
        {
          alias: "userIdle",
          src: "/assets/animations/scout1idle.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "userStanding",
          src: "/assets/animations/scout1standing.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "userWalking",
          src: "/assets/animations/scout1walking.json",
          data: { scaleMode: "nearest" },
        },
      ],
    },
  ],
};
