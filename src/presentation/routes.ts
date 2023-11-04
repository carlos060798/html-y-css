// archivo de rutas de la app

import { Router } from "express";
import { TodosRoutes } from "./todos/routesTodos";

/**
 * Clase que representa el enrutador de la aplicación.
 * @class
 */
export class AppRouter {
  
    /**
     * Obtiene las rutas de la aplicación.
     * @readonly
     * @static
     * @type {Router}
     */
    static get routes(): Router {
        const router = Router();
        const todoRoutes= new TodosRoutes();
        router.use("/api/todos", todoRoutes.routes);
        return router;
    }

}