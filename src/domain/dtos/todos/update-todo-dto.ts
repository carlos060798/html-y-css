//  Dto  es el modelo de datos que se recibe para poder hacer la trasferencia entre el cliente y el servidor

/**
 * Representa un objeto DTO para actualizar una tarea.
 */
export class UpdateTodoDto {

    /**
     * Crea una instancia de UpdateTodoDto.
     * @param text El texto de la tarea.
     * @param completedAt La fecha de finalización de la tarea.
     */
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ) {
    }

    /**
     * Obtiene los valores de la instancia de UpdateTodoDto.
     * @returns Un objeto con los valores de la instancia.
     */
    get values() {

        const returnObj: { [key: string]: any } = {}
        if (this.text) returnObj.text = this.text
        if (this.completedAt) returnObj.completedAt = this.completedAt
        return returnObj
    }

    /**
     * Crea una instancia de UpdateTodoDto a partir de un objeto con las propiedades.
     * @param props Un objeto con las propiedades para crear la instancia.
     * @returns Un array con un mensaje de error y la instancia de UpdateTodoDto creada, o solo el mensaje de error.
     */
    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const {id, text, completedAt } = props

          if (!id || isNaN(id)) return ["error, el campo id es requerido"]

        if (completedAt) {
            const date = new Date(completedAt)
            if (date.toString() === "Invalid Date") return ["error, el campo completedAt no es una fecha valida"]
        }

        return [undefined, new UpdateTodoDto(id,text, completedAt)]


    }
}