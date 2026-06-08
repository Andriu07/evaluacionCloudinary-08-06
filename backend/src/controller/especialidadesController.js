import especialidadesModel from "../Models/especialidadesModel.js"

const especialidadesController = {};

//get
especialidadesController.getEspecialidades = async (req, res) =>{
    const especialidades = await especialidadesModel.find()
    res.json(especialidades)
}

//post
especialidadesController.insertEspecialidades = async ( req, res) =>{
    const {specialityName, description, isAvailable} = req.body;
    const newEspecialidad = new especialidadesModel({name,description, isAvailable})

    await newEspecialidad.save()
    res.json({message: "especiality saved"})
}

//delete
especialidadesController.deleteEspecialidades = async (req, res) =>{
    await especialidadesModel.findByIdAndDelete(req.params.id);
    res.json({message:"Especiality deleted"})
}

//update
especialidadesController.updateEspecialidades = async(req,res) =>{
    const {specialityName, description, isAvailable} = req.body;
    await especialidadesModel.findByIdAndUpdate(req.params.id,
        {specialityName, description, isAvailable},
        {new:true}
    )
    res.json({message:"Especiality updated"})
}


export default especialidadesController;