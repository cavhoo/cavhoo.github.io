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
          alias: "block",
          src: "/assets/textures/block.json",
          data: { scaleMode: "nearest" },
        },
      ],
    },
  ],
};
