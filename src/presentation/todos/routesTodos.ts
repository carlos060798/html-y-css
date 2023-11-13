import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDataSourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryimpl } from "../../infrastructure/repositories/todo.repository.imp";

/**
 * Clase que define las rutas para la gestión de tareas.
 * @class
 */
/**
 * Clase que define las rutas de la API para la gestión de tareas.
 */
export class TodosRoutes {
     /**
      * Obtiene las rutas de la API para la gestión de tareas.
      * @returns {Router} Objeto Router con las rutas definidas.
      */
     public get routes(): Router {
        const router = Router();
        const datasource= new TodoDataSourceImpl();
        const todoRepository= new TodoRepositoryimpl(datasource);
        const todoController = new TodoController(todoRepository);


        router.get("/", todoController.getTodos);
        router.get("/:id", todoController.getTodo);
        router.post("/", todoController.createTodo);
        router.put("/:id", todoController.updateTodo);
        router.delete("/:id", todoController.deleteTodo);

        return router;
    }
}