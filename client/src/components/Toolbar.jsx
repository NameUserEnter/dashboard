import React from 'react';
import "../styles/toolbar.scss"
import Brush from "../tools/Brush";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Eraser from "../tools/Eraser";
import canvas from "./Canvas";
const Toolbar = () => {

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionId + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className = "toolbar">
            <button className="toolbar__btn brush" onClick={()=>toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <input className="toolbar__btn color" style={{marginTop:150}} type = "color"
                   onChange={e => toolState.setStrokeColor(e.target.value)}/>
            <input
                className="toolbar__btn size"
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{marginTop:240,height: 30,width: 30}}
                type="number" defaultValue={1} min={1} max={50}/>
            <button className="toolbar__btn eraser" onClick={()=>toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className="toolbar__btn save" onClick={() => download()}/>
        </div>
    );
};

export default Toolbar;