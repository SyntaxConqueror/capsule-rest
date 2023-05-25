import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebSocketContext";

export const Websocket = () => {
    const socket = useContext(WebsocketContext);
    const [value, setValue] = useState<string[]>([]);
    useEffect(() => {
        socket.on('connect', ()=>{
            console.log("Connected!");
            setValue(value => [`Connected!`]);
        });

        socket.on("onCapsuleReservation", (data) => {
            console.log("onCapsuleReservation event received!");
            console.log(data);
            setValue(value => [...value, `${data.msg}`]);
        });

        socket.on("onCapsuleUnReservation", (data) => {
            console.log("onCapsuleUnReservation event received!");
            console.log(data);
            setValue(value => [...value, `${data.msg}`]);
        });

        socket.on("onFeedbackLike", (data)=>{
            console.log("onFeedbackLike event received!");
            console.log(data);
            setValue(value => [...value, `${data.msg}`]);
        });

        return () => {
            console.log("Unregistering Events...");
            socket.off('connect');
            socket.off("onCapsuleReservation");
            socket.off("onCapsuleUnReservation");
            socket.off("onFeedbackLike");
        };
    }, []);
    
    return (
        
        <div>
            <h1 style={{paddingLeft: "20px", color: "white"}}>Admin Dashboard</h1>
            <ul style={{color: "#a9e86d"}}>
                {value.map((element, idx) => <li key={idx}>{element}</li>)}
            </ul>
        </div>
        
    );
}