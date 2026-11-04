import type { ServerResponse } from "node:http"

export const sendResponse = (
    res:ServerResponse, 
    statusCode: number,
    success:boolean, 
    message:string, 
    data?:any
) => {

    const response = {
        success: success,
        message: message,
        data: data? data:null
    }

    res.writeHead(statusCode, { "content-type": "application/json" })
        res.end(
            JSON.stringify(response)
        )
}