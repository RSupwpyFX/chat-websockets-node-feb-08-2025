import express, { Application } from 'express';
import http from 'http';
import { Server } from "socket.io";
import path from 'path';

class App {
    private app: Application;
    private http: http.Server;
    private io: Server;

    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);
        this.listenSocket();
        this.setupRoutes();
    }

    listenServer() {
        this.http.listen(3000, () => console.log('server is running'));
    }

    listenSocket() {
        this.io.on('connection', (socket) => {
            console.log('user connected =>', socket.id);

            socket.on('message', (msg) => {
                this.io.emit('message', msg);
            });
        });
    }

    setupRoutes() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });
    }
}

const app = new App();
app.listenServer();
