import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null
    socket = null
    sessionId = null

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
        console.log(canvas)
    }

    setSessionId(id) {
        this.sessionId = id
    }
    setSocket(socket) {
        this.socket = socket
    }

}

export default new CanvasState()