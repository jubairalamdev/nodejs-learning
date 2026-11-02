import { createServer, IncomingMessage, Server } from "http";
import { routeHandler } from "./routes/routes";

const server: Server = createServer((req: IncomingMessage, res)=>{
    // console.log(req.url);
    // console.log(req.method);

    routeHandler(req, res)
})

server.listen(5000, ()=> {
    console.log("Server is running on the port 5000")
})