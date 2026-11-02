import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/products.service";

export const productsController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method

    const products = readProduct()

    if (url === "/products" && method === "GET") {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({message: "Products retrieved successfully", data: products}))
    }

}