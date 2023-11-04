// archivo de rutas de la app

import { Router } from "express";
import { TodosRoutes } from "./todos/routesTodos";

export class AppRouter {
  
    static get routes(): Router {
        const router = Router();
        const todoRoutes= new TodosRoutes();
        router.use("/api/todos", todoRoutes.routes);
        return router;
    }

}