import express from "express"
import registerPacienteController from "../controller/registerPacientesController.js"

const router = express.Router();

router.route("/")
.post(registerPacienteController.register)

router.route("/verifyCodeEmail")
.post(registerPacienteController.verifyCode)


export default router;