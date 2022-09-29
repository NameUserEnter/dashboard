import React, {useEffect, useRef} from 'react';
import "../styles/canvas.scss"
import {observer} from "mobx-react-lite";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import {useParams} from "react-router-dom";
import Eraser from "../tools/Eraser";



const Canvas = observer(() => {

    const canvasRef = useRef()
    const params = useParams()
    useEffect(()=>{
        canvasState.setCanvas(canvasRef.current)
    },[])
    useEffect(() => {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id:params.id,
                    method: "connection"
                }))
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь присоединился`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    })
    const drawHandler = (msg) => {
        const figure = msg.figure
        console.log(figure)
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y, figure.color, figure.width)
                break
            case "eraser":
                Eraser.draw(ctx, figure.x, figure.y, figure.width)
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }
    return (
        <div className = " canvas">
            <canvas ref = {canvasRef} width={1200} height={600}/>
        </div>
    );
});

export default Canvas;