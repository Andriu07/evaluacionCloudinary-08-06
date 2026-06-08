import express from "express"
import equiposMedicosController from "../controller/equiposMedicosController.js"
import  upload from "../Utils/configCloudinary.js"

const router = express.Router();

router.route("/")
.get(equiposMedicosController.getequiposMedicos)
.post(upload.single("image"), equiposMedicosController.insertequiposMedicos)

router.route("/:id")
.put(upload.single("image"),equiposMedicosController.updateequiposMedicos)
.delete(equiposMedicosController.deleteequiposMedicos)

export default router;