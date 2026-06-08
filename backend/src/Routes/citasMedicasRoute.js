import express from "express"
import citasMedicasController from "../controller/citasMedicasController.js"

const router = express.Router();

router.route("/")
.get(citasMedicasController.getcitasMedicas)
.post(citasMedicasController.insertcitasMedicas)

router.route("/:id")
.put(citasMedicasController.updatecitasMedicas)
.delete(citasMedicasController.updatecitasMedicas)

export default router;