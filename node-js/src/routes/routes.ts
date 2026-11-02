import type { IncomingMessage, ServerResponse } from "node:http";
import { productsController } from "../controller/productController";

export const routeHandler = (req:IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method

    if (url === '/' && method === "GET") {
        // console.log("This is Root Route")
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({message: "This is root route"}))
    } else if (url?.startsWith('/products')) {
        productsController(req, res)
    } else {
        res.writeHead(404, {"content-type": "application/json"})
        res.end(JSON.stringify({message: "Route not found"}))
    }
}