// controlador de la ruta /todos

import { Request, Response } from "express";

// datos de todos

const Todos=[{
    id: 1,
    name: "todo 1",
    created_at: new Date()
},
{
    id: 2,
    name: "todo 2",
    created_at: new Date()
},
]


/**
 * Controlador para manejar las operaciones CRUD de los todos.
 */
export class TodoController {

    constructor() {

    }

    /**
     * Obtiene todos los todos.
     * @param req - La solicitud HTTP entrante.
     * @param res - La respuesta HTTP que se enviará al cliente.
     * @returns Una respuesta JSON con todos los todos.
     */
    public getTodos = (req: Request, res: Response) => {

       return res.json(Todos)
    }

    /**
     * Obtiene un todo específico por su ID.
     * @param req - La solicitud HTTP entrante.
     * @param res - La respuesta HTTP que se enviará al cliente.
     * @returns Una respuesta JSON con el todo correspondiente al ID proporcionado.
     * Si no se encuentra ningún todo con el ID proporcionado, se devuelve una respuesta de error 404.
     */
    public getTodo = (req: Request, res: Response) => {

        const  id  = +req.params.id;
        const todo = Todos.find((todo) => todo.id == id);
        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: "todo not found"
            })
        }
        return res.json(todo)
    }
    
    /**
     * Crea un nuevo todo.
     * @param req - La solicitud HTTP entrante.
     * @param res - La respuesta HTTP que se enviará al cliente.
     * @returns Una respuesta JSON con el todo creado.
     * Si ocurre un error, se devuelve una respuesta de error 500.
     */
    public createTodo = (req: Request, res: Response) => {
        try {
            const todo = req.body

            Todos.push(todo)

            return res.json({
                ok: true,
                msg: "todo created",
                todo
            })
        }

        catch (error) {
            res.status(500).json({
                msg: "error",
                fail: error
            })
        }
    }

    /**
     * Actualiza un todo existente.
     * @param req - La solicitud HTTP entrante.
     * @param res - La respuesta HTTP que se enviará al cliente.
     * @returns Una respuesta JSON con el todo actualizado.
     * Si el todo no se encuentra, se devuelve una respuesta de error 404.
     * Si ocurre un error, se devuelve una respuesta de error 500.
     */
    public updateTodo = (req: Request, res: Response) => {
        try {
            const id = +req.params.id
            const todo = req.body

            const todoIndex = Todos.findIndex((todo) => todo.id == id)

            if (todoIndex < 0) {
                return res.status(404).json({
                    ok: false,
                    msg: "todo not found"
                })
            }

            Todos[todoIndex] = todo

            return res.json({
                ok: true,
                msg: "todo updated",
                todo
            })
        }

        catch (error) {
            res.status(500).json({
                msg: "error",
                fail: error
            })
        }
    }
  

    /**
     * Elimina un todo existente.
     * @param req - La solicitud HTTP entrante.
     * @param res - La respuesta HTTP que se enviará al cliente.
     * @returns Una respuesta JSON con el todo eliminado.
     * Si el todo no se encuentra, se devuelve una respuesta de error 404.
     * Si ocurre un error, se devuelve una respuesta de error 500.
     */
    public deleteTodo = (req: Request, res: Response) => {
        try{
         const id = +req.params.id
         const tododelete = Todos.find((todo) => todo.id == id)
            if(!tododelete){
                return res.status(404).json({
                    ok: false,
                    msg: "todo not found"
                })
            }
            Todos.slice(Todos.indexOf(tododelete),1)

         return res.json({
                ok: true,
                msg: "todo deleted",
                tododelete
         })
         



        }catch(error){
            res.json({
              msg: "error  al eliminar"

            })

        }
    }

}






