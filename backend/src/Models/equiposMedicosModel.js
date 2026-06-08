import mongoose, {Schema , model} from "mongoose"

const equiposMedicosSchema = new Schema({

    equiposName:{
        type: String
    },
     description:{
        type: String
    },

     brand:{
        type: String
    },

     model:{
        type: String
    },

     purchaseDate:{
        type: Date
    },

     maintenanceDate:{
        type: Date
    },

     location:{
        type: String
    },

     image:{
        type: String
    },
    public_id:{
        type: String
    },
        status:{
        type: Boolean
    },
    
        isAvailable:{
        type: Boolean
    },
},{timestamps:true,
    strict:false
})

export default model("EquiposMedicos", equiposMedicosSchema)