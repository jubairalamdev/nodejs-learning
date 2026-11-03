import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/products.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productsController = async(req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method

    // prodcucts => /products/1 => ['', 'products', '1']
    const products = readProduct()

    const urlParts = url?.split("/")
    // console.log(urlParts)
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null
    // console.log("This is the id:", id)

    // GET all products
    if (url === "/products" && method === "GET") {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(
            JSON.stringify({ message: "Products retrieved successfully", data: products })
        )
    } else if (method === "GET" && id !== null) {
        const products = readProduct()
        const product = products.find((p: IProduct) => p.id === id)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(
            JSON.stringify({ message: "Product retrieved successfully", data: product })
        )
    } else if (method === "POST" && url === "/products") {
        const body = await parseBody(req)
        // console.log(body)
        const newProduct = {
            id : Date.now(),
            ...body
        }
        // console.log(newProduct)
        const products = readProduct()
        products.push(newProduct)
        // console.log(products)
        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(
            JSON.stringify({ 
                message: "Product created successfully", 
                data: newProduct
            })
        )
    }
}