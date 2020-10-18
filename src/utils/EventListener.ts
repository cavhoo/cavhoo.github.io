class EventListener {
  private _eventMap: {[key:string]: ((event:any) => void)[]}

  constructor() {
    this._eventMap = {}
    this.init()
  }

  private init() {
    window.onwheel = this.onScroll
  }

  private onScroll = (event: WheelEvent) => {
    this._eventMap[EVENT.ONSCROLL].forEach((callback) => callback(event))
  }

  public addListener(event: string, callback: (event:any) => void) {
    if (this._eventMap[event]) this._eventMap[event].push(callback)
    else {
      this._eventMap[event] = [callback];
    }
  }

  public removeListener(event: string, callback: (event:any) => void) {
    const index = this._eventMap[event].findIndex((func) => callback === func)

    if (index > -1) return this._eventMap[event].splice(index, 1)
  }

}

export default new EventListener()
export enum EVENT {
  ONSCROLL = 'onwheel',
  CLICK = 'click'
}
