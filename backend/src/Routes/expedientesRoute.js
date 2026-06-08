import express from "express"
import expedientesController from "../controller/expedientesController.js"

const router = express.Router();

router.route("/")
.get(expedientesController.getexpedientes)
.post(expedientesController.insertexpedientes)

router.route("/:id")
.put(expedientesController.updateexpedientes)
.delete(expedientesController.deleteexpedientes)

export default router;