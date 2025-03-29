import { AppError } from "@/utils/AppError"
import {NextFunction, Request, Response} from "express"

class ProductController {
    async index(request:Request, response:Response, next:NextFunction){
        try {
            const {name, price} = request.body
            
            return response.json({name, price})
        } catch (error) {
            next(error)
        }

    }

    async create(request:Request, response:Response, next:NextFunction){
        try {
            const {name, price} = request.body
            
            return response.json({name, price})
        } catch (error) {
            next(error)
        }

    }
}

export {ProductController}