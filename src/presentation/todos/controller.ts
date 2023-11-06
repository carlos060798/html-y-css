// controlador de la ruta /todos

import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todo } from "@prisma/client";

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
                msg: "error"
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
            const { text,completedAt } = req.body
            if (!text) return res.json({
                status: 400,
                msg: "error, el campo text es requerido"
            })

            const task = await prisma.todo.create({
                data: { text,
                    completedAt:(completedAt)? new Date(completedAt):null }
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
            const { text, completedAt } = req.body

            if (!text) return res.json({
                status: 400,
                msg: "error, el campo text es requerido"
            })

            const taskUpdate = await prisma.todo.update({
                where: { id: id },
                data: { text: text,
                    completedAt:(completedAt)? new Date(completedAt):null
                }
            })
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






