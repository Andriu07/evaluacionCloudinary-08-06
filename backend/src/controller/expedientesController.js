import expedientesModel from "./Models/expedientesModel.js"

const expedientesController = {};

//get
expedientesController.getexpedientes = async (req, res) =>{
    const expedientes = await expedientesModel.find()
    res.json(expedientes)
}

//post
expedientesController.insertexpedientes = async ( req, res) =>{
    const {paciente_id, diagnosis, medications, medicalNotes} = req.body;
    const newCitaMedica = new expedientesModel({paciente_id, diagnosis, medications, medicalNotes})

    await newCitaMedica.save()
    res.json({message: "CitaMedica saved"})
}

//delete
expedientesController.deleteexpedientes = async (req, res) =>{
    await expedientesModel.findByIdAndDelete(req.params.id);
    res.json({message:"CitaMedica deleted"})
}

//update
expedientesController.updateexpedientes = async(req,res) =>{
    const {paciente_id, diagnosis, medications, medicalNotes} = req.body;
    await expedientesModel.findByIdAndUpdate(req.params.id,
        {paciente_id, diagnosis, medications, medicalNotes},
        {new:true}
    )
    res.json({message:"CitaMedica updated"})
}


export default expedientesController;