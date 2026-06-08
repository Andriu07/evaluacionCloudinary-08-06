import express from "express"
import recoveryPasswordPacienteController from "../controller/recoveryPasswordPacienteController.js"

const router = express.Router();

router.route("/requestCode")
.post(recoveryPasswordPacienteController.requestCode)

router.route("/verifyCode")
.post(recoveryPasswordPacienteController.verifyCode)

router.route("/newPassword")
.post(recoveryPasswordPacienteController.newPassword)

export default router;