import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null
    color = null
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
        console.log(tool)
    }
    setStrokeColor(color) {
        this.color = color
        this.tool.strokeColor = color
        console.log(color)
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
    }
}

export default new ToolState()