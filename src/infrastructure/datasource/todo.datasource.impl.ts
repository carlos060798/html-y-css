import { TodoDataSource } from "../../domain/datasource/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo-dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo-dto";
import { TodoEntity } from "../../domain/entites/todo.entity";
import { prisma } from "../../data/postgres";

export class TodoDataSourceImpl implements TodoDataSource {
   async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const task = await prisma.todo.create({
            data: createTodoDto! 
        })

        return TodoEntity.fromJSON(task)

    }
    async getAll(): Promise<TodoEntity[]> {  // metodo  de obtener todos los todos
        const todos = await prisma.todo.findMany()
        return todos.map(todo => TodoEntity.fromJSON(todo))
    }
    async getById(id: number): Promise<TodoEntity> { // metodo para obtener las tareas 
        const taskid = await prisma.todo.findUnique({ where: { id, }, })
        if (!taskid) throw new Error("todo not found")
        return TodoEntity.fromJSON(taskid)
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
        const taskid = await this.getById(updateTodoDto.id);
        if (!taskid) throw new Error("todo not found")
        const todo = await prisma.todo.update({ where: { id: updateTodoDto.id }, data: updateTodoDto!.values  })
        return TodoEntity.fromJSON(todo)
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.getById(id);
        const deleted= await prisma.todo.delete({ where: { id } })
        return TodoEntity.fromJSON(deleted)



    }
}