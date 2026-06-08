import mongoose, {Schema , model} from "mongoose"

const expedientesSchema = new Schema({

     paciente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pacientes"
    },
      diagnosis:{
        type: String
    },
     medications:[
        {
            medicineName: {type:  String}
        }
     ],
    medicalNotes:{
        type: String

    },

},{timestamps:true,
    strict:false
})

export default model("Expedientes", expedientesSchema)