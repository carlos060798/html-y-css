import { TodoRepository } from "../../domain/repositories/todo.repository";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo-dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo-dto";
import { TodoEntity } from "../../domain/entites/todo.entity";
import { TodoDataSource } from "../../domain/datasource/todo.datasource";


export class TodoRepositoryimpl implements TodoRepository {


    constructor(private readonly todoDataSource: TodoDataSource) { }




    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDataSource.create(createTodoDto)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.todoDataSource.getAll()
    }

    getById(id: number): Promise<TodoEntity | null> {
        return this.todoDataSource.getById(id)
    }

    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
        return this.todoDataSource.updateById(updateTodoDto)
    }

    deleteById(id: number): Promise<TodoEntity> {
        return this.todoDataSource.deleteById(id)
    }
   
}