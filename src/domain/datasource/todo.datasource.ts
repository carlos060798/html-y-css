// los data sources  las interfaces que se van  ha usar como modelo de datos
// para nuevos objetos que se van a crear en la base de datos

import { TodoEntity } from "../entites/todo.entity";
import { CreateTodoDto } from '../dtos/todos/create-todo-dto';
import { UpdateTodoDto } from "../dtos/todos/update-todo-dto";

export  abstract  class TodoDataSource {
// se crea un metodo abstracto para crear un nuevo todo
 abstract  create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity>; 
 abstract  getAll(): Promise<TodoEntity[]>;
 abstract  getById(id: number): Promise<TodoEntity | null>;
 abstract  updateById(updateTodoDto:UpdateTodoDto): Promise<TodoEntity | null>;
 abstract  deleteById(id: number): Promise<TodoEntity>;

}