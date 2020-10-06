import WebFont from 'webfontloader'

export default (readyCallback:() => void) => {
  const fonts = {
    google: {
      families: [
        "Press Start 2P",
        "Electrolize"
      ],
    },
    loading: () => console.log('loading'),
    active: () => {
      readyCallback()
    }
  }
  WebFont.load(fonts)
}
