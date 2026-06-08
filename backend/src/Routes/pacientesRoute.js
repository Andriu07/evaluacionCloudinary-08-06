import express from "express"
import pacientesController from "../controller/PacientesController.js"
import  upload from "../Utils/configCloudinary.js"

const router = express.Router();

router.route("/")
.get(pacientesController.getAllPacientes)

router.route("/:id")
.put(upload.single("image"),pacientesController.updatePaciente)
.delete(pacientesController.deletePaciente)

export default router;