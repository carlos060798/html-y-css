// controlador de la ruta /todos

import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo-dto";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo-dto';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodoController {

    constructor(
      private readonly todorepository:TodoRepository
    ) {

    }

    public getTodos = async (req: Request, res: Response) => {

      const todos = await this.todorepository.getAll();
        res.json({
            status: 200,
            msg: "todos found",
            todos
        })
    }


    public getTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try {
          
            const taskid = await this.todorepository.getById(id);

            return res.json({
                status: 200,
                msg: "todo found",
                taskid,
                id
            })
        } catch (error) {
            res.json({
                status: 404,
                msg: "ocurrion un error todo no encontrado",
                error
            })
        }
    }



    public createTodo = async (req: Request, res: Response) => {
        try {
            const [error,createTodoDto] = CreateTodoDto.create(req.body);
           if(error) return res.json({
               status:400,
               msg:error})
            const task= await this.todorepository.create(createTodoDto!)
            

            res.json({
                status: 200,
                msg: "todo created",
                task
            })



        }

        catch (error) {
            res.status(500).json({
                msg: "error",
                fail: error
            })
        }
    }


    public updateTodo = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id
            const [error,updateTodoDto ] = UpdateTodoDto.create({...req.body,id})

            if (error) return res.json({ status: 400,   msg: error})

            const taskUpdate = await this.todorepository.updateById(updateTodoDto!)
            return res.json({
                ok: true,
                msg: "todo updated",
                taskUpdate
            })
        }

        catch (error) {
            res.json({
                status: 500,
                msg: "error al actualizar",
                error

            })


        }
    }



    public deleteTodo = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id
            const taskDelete = await this.todorepository.deleteById(id)
            
            return res.json({
                status: 200,
                msg: "todo deleted",
                taskDelete
            })
        } catch (error) {
            res.json({
                status: 500,
                msg: "error al eliminar",
                error
            })
        }

    }

}






