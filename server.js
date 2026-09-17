const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

let technicianWs = null;
let expertWs = null;

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'register-technician') {
            technicianWs = ws;
            console.log('Technician (index.html) connected');
        } else if (data.type === 'register-expert') {
            expertWs = ws;
            console.log('Remote Expert (expert.html) connected');
        } else if (data.type === 'offer' || data.type === 'candidate-from-tech') {
            if (expertWs) expertWs.send(JSON.stringify(data));
        } else if (data.type === 'answer' || data.type === 'candidate-from-expert') {
            if (technicianWs) technicianWs.send(JSON.stringify(data));
        }
    });
});

console.log('Signaling server running on ws://localhost:8080');
