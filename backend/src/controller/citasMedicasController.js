import citasMedicasModel from "./Models/citasMedicasModel.js"

const citasMedicasController = {};

//get
citasMedicasController.getcitasMedicas = async (req, res) =>{
    const citasMedicas = await citasMedicasModel.find()
    res.json(citasMedicas)
}

//post
citasMedicasController.insertcitasMedicas = async ( req, res) =>{
    const {paciente_id, especialidades_id, appointmentDate, reason, status, observations} = req.body;
    const newCitaMedica = new citasMedicasModel({paciente_id, especialidades_id, appointmentDate, reason, status, observations})

    await newCitaMedica.save()
    res.json({message: "CitaMedica saved"})
}

//delete
citasMedicasController.deletecitasMedicas = async (req, res) =>{
    await citasMedicasModel.findByIdAndDelete(req.params.id);
    res.json({message:"CitaMedica deleted"})
}

//update
citasMedicasController.updatecitasMedicas = async(req,res) =>{
    const {paciente_id, especialidades_id, appointmentDate, reason, status, observations} = req.body;
    await citasMedicasModel.findByIdAndUpdate(req.params.id,
        {paciente_id, especialidades_id, appointmentDate, reason, status, observations},
        {new:true}
    )
    res.json({message:"CitaMedica updated"})
}


export default citasMedicasController;