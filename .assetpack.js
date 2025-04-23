import { texturePacker } from "@assetpack/core/texture-packer";
import { webfont } from "@assetpack/core/webfont";
// .assetpack.js
export default {
  entry: "./assets",
  output: "./static/assets",
  pipes: [
    texturePacker({
      texturePacker: {
        padding: 2,
        nameStyle: "relative",
        removeFileExtension: false,
      },
      resolutionOptions: {
        resolutions: { default: 1 },
        fixedResolution: "default",
        maximumTextureSize: 4096,
      },
    }),
    webfont(),
  ],
};
