// controlador de la ruta /todos

import { Request, Response } from "express";

export class TodoController {

    constructor() {

    }


    public getTodos = (req: Request, res: Response) => {

        res.json([{
            id: 1,
            name: "todo 1",
            created_at: new Date()
        },
        {
            id: 2,
            name: "todo 2",
            created_at: new Date()
        },
        ])
    }
}






