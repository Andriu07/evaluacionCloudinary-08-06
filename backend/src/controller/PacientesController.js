import pacientesModel from "../Models/pacientesModel.js";
import { v2 as cloudinary } from "cloudinary";

const pacientesController = {};

//Get
pacientesController.getAllPacientes = async (req, res) => {
  try {
    const pacientes = new pacientesModel.find();
    return res.status(200).json(pacientes);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//update-actualizar
pacientesController.updatePaciente = async (req, res) => {
  try {
    //solicito los datos
    const {
      name,
      lastName,
      email,
      password,
      birthDate,
      phon,
      address,
      bloodType,
      phoneEmergencyContacts,
      profilePhoto,
      isVerified,
      loginAttemps,
      timeOut
    } = req.body;

    //identifico paciente a actualizar
    const pacienteFound = await pacientesModel.findById(req.params.id)

    const updateData ={
      name,
      lastName,
      email,
      password,
      birthDate,
      phon,
      address,
      bloodType,
      phoneEmergencyContacts,
      profilePhoto,
      isVerified,
      loginAttemps,
      timeOut
    }

    //si viene una imagen
    if(req.file){
        //eliminamos la imagen anterior de cloudinary
        await cloudinary.uploader.destroy(pacienteFound.public_id)
        updateData.image = req.file.path
        updateData.image = req.file.filename
    }

    //guardo en la base de datos
    await pacientesModel.findByIdAndUpdate(req.params.id,updateData, {new: true})
  } catch (error) {
    console.log("error" + error)
        return res.status(500).json({message:"Internal server error"})
  }
};


//delete - eliminar 
pacientesController.deletePaciente = async (req, res) =>{
    try {
        //buscamos el paciente a eliminar
        const pacienteFound = await pacientesModel.findById(req.params.id)

        //eliminar la imagen de cloudinary
         await cloudinary.uploader.destroy(pacienteFound.public_id)

        //eliminar de la base de datos
        const pacienteDeleted = await pacientesModel.findByIdAndDelete(req.params.id)
        //sino se elimina
        if(!pacienteDeleted){
            return res.status(404).json({message:"paciente not found"})
        }

        return res.status(200).json({message:"paciente deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export default pacientesController;