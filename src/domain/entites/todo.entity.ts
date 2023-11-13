/* se crean las entidades como  modelos de datos propios de la aplicacion para que
en caso de que se cambie la base de datos no se tenga que cambiar toda la aplicacion
*/

export class TodoEntity {
    
    constructor(
        public  id: number,
        public  text: string,
        public  completedAt?: Date | null,
    ){

    }

   get isCompleted(){
     return   !!this.completedAt
   }

   public static fromJSON(Objet: {[key:string]:any}){
     const  {id,text,completedAt} = Objet;
     if(!id){
         throw new Error("id is required")
     }
      if(!text){
          throw new Error("title is required")
      }
      let completedAtDate
      if(completedAt){
          completedAtDate = new Date(completedAt)
      
      if(isNaN(completedAtDate.getTime())){
          throw ("completedAt is not valid")      }
    }

    return new TodoEntity(id,text,completedAt)
   }
  }