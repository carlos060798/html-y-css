

import { TodoEntity } from "../entites/todo.entity";
import { CreateTodoDto } from '../dtos/todos/create-todo-dto';
import { UpdateTodoDto } from "../dtos/todos/update-todo-dto";

export  abstract  class TodoRepository {
// se crea un metodo abstracto para crear un nuevo todo
 abstract  create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity>; 
 abstract  getAll(): Promise<TodoEntity[]>;
 abstract  getById(id: number): Promise<TodoEntity| null>;
 abstract  updateById(updateTodoDto:UpdateTodoDto): Promise<TodoEntity |null>;
 abstract  deleteById(id: number): Promise<TodoEntity>;

}