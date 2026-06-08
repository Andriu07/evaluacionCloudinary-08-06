
import equiposMedicosModel from "../Models/equiposMedicosModel.js"

const equiposMedicosController = {};

//get
equiposMedicosController.getequiposMedicos = async (req, res) =>{
    const equiposMedicos = await equiposMedicosModel.find()
    res.json(equiposMedicos)
}

//post
equiposMedicosController.insertequiposMedicos = async ( req, res) =>{
    const { equiposName, description, brand, model, purchaseDate, maintenanceDate, location, image, status, isAvailable } = req.body;
    const newequiposMedicos = new equiposMedicosModel({equiposName, description, brand, model, purchaseDate, maintenanceDate, location, image, status, isAvailable})

    await newequiposMedicos.save()
    res.json({message: "equiposMedicos saved"})
}

//delete
equiposMedicosController.deleteequiposMedicos = async (req, res) =>{
    await equiposMedicosModel.findByIdAndDelete(req.params.id);
    res.json({message:"equiposMedicos deleted"})
}

//update
equiposMedicosController.updateequiposMedicos = async(req,res) =>{
    const { equiposName, description, brand, model, purchaseDate, maintenanceDate, location, image, status, isAvailable } = req.body;
    await equiposMedicosModel.findByIdAndUpdate(req.params.id,
        { equiposName, description, brand, model, purchaseDate, maintenanceDate, location, image, status, isAvailable  },
        {new:true}
    )
     
    const equiposMedicosFound = await pacientesModel.findById(req.params.id)
    
    const updateData = {
         equiposName, description, brand, model, purchaseDate, maintenanceDate, location, image, status, isAvailable       
    }
    
    if(req.file){
        //eliminamos la imagen anterior de cloudinary
        await cloudinary.uploader.destroy(equiposMedicosFound.public_id)
        updateData.image = req.file.path
        updateData.image = req.file.filename
    }
    res.json({message:"equiposMedicos updated"})
}


export default equiposMedicosController;