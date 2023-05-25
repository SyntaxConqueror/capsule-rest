
import './App.css';
import { WebsocketProvider, socket } from './contexts/WebSocketContext';
import { Websocket } from './components/Websocket';

function App() {
    return (
        <WebsocketProvider value={socket}>
            <Websocket></Websocket>
        </WebsocketProvider>
    );
}

export default App;
