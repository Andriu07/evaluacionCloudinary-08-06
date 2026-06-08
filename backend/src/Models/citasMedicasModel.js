import mongoose, {Schema , model} from "mongoose"

const citasSchema = new Schema({

     paciente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pacientes"
    },
      especialidades_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Especialidades"
    },
     appointmentDate:{
        type: Date

    },
    reason:{
        type: String

    },
    status:{
        type: Boolean

    },
    observations:{
        type: String

    },
},{timestamps:true,
    strict:false
})

export default model("Citas", citasSchema)