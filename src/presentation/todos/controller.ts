// controlador de la ruta /todos

import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todo } from "@prisma/client";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo-dto";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo-dto';

export class TodoController {

    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {

        try {

            const todos = await prisma.todo.findMany()
            res.json({
                status: 200,
                msg: " todos en base de datos",
                todos
            })

        } catch (error) {
            res.json({
                status: 500,
                msg: "error",
                error
            })
        }
    }


    public getTodo = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            const taskid = await prisma.todo.findUnique({
                where: {
                    id: id,
                },
            })
            if (!taskid) {
                return res.status(404).json({
                    status: 404,
                    msg: "todo not found"
                })
            }
            return res.json({
                status: 200,
                msg: "todo found",
                taskid,
                id
            })
        } catch (error) {
            res.json({
                status: 500,
                msg: "ocurrion un error",
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
            const task = await prisma.todo.create({
                data: createTodoDto! 
            })

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

            if (error) return res.json({
                status: 400,
                msg: error
            })

            const taskUpdate = await prisma.todo.update({
                where: { id: id },
                data: updateTodoDto!.values
                }
            )
            if (!taskUpdate) {
                return res.status(404).json({
                    ok: false,
                    msg: "todo not found"
                })
            }
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
            const taskDelete = await prisma.todo.delete({
                where: { id: id }
            })
            if (!taskDelete) {
                return res.status(404).json({
                    status: 404,
                    msg: "todo not found"
                })
            }
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






