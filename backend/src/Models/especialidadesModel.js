import {Schema , model} from "mongoose"

const especialidadesSchema = new Schema({

     specialityName:{
        type: String
    },
     description:{
        type: String
    },
     isAvailable:{
        type: Boolean

    },
},{timestamps:true,
    strict:false
})

export default model("Especialidades", especialidadesSchema)