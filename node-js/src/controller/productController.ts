import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/products.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse as sendResponse } from "../utility/sendResponse";

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
        try {
            return sendResponse(res, 200, true, "Products retrieved successfully", products)
        } catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    } else if (method === "GET" && id !== null) {
        try {
            const products = readProduct()
            const product = products.find((p: IProduct) => p.id === id)

             if (!product) {
                return sendResponse(res, 404, false, "Product not found")
            }

            return sendResponse(res, 200, true, "Product retrieved successfully", product)
        } catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    } else if (method === "POST" && url === "/products") {
        try {
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
            return sendResponse(res, 200, true, "Product created successfully", newProduct)
        } catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    } else if (method === "PUT" && id!== null) {
        try {
            const body = await parseBody(req)
            const products = readProduct()

            const index = products.findIndex((p: IProduct)=> p.id === id)

            if (index < 0) {
                return sendResponse(res, 404, false, "Product not found")
            }

            products[index] = { id:products[index].id, ...body };

            insertProduct(products);

            return sendResponse(res, 200, true, "Product updated successfully", products[index])
        } catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    } else if (method === "DELETE" && id!== null) {
        try {
            const products = readProduct()
            const index = products.findIndex((p: IProduct)=> p.id === id)
            const deletingProduct = products[index]

            if (index < 0) {
                return sendResponse(res, 404, false, "Product not found")
            }

            products.splice(index, 1)
            // console.log(products)

            insertProduct(products)

            return sendResponse(res, 200, true, "Product deleted successfully", deletingProduct)
        } catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    }
}
