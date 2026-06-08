import express from "express"
import especialidadesController from "../controller/especialidadesController.js"

const router = express.Router();

router.route("/")
.get(especialidadesController.getEspecialidades)
.post(especialidadesController.insertEspecialidades)

router.route("/:id")
.put(especialidadesController.updateEspecialidades)
.delete(especialidadesController.deleteEspecialidades)

export default router;