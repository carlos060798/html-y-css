//  Dto  es el modelo de datos que se recibe para poder hacer la trasferencia entre el cliente y el servidor

export class CreateTodoDto {

   private constructor(
      public readonly text: string){
    }
    static create(props:{[key:string]:any}):[string?,CreateTodoDto?]{
        const {text} = props
        if(!text) return ["error, el campo text es requerido"]

        return [undefined,new CreateTodoDto(text)]
          

    }
}