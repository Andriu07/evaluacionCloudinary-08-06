import pacientesModel from "../Models/pacientesModel.js";
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"

const loginPacientesController = {};

loginPacientesController.login = async (req, res) => {
    //solicito los datos
    const{ email, password} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
        return res.status(400).json({message:"correo invalido"})
    }

    try {
               //buscar el correo electronico de la base
               const pacienteFound = await pacientesModel.findOne({email});
               
               //sino existe el correo en la DB
               if(!pacienteFound){
                return res.status(400).json({message:"paciente not found"})
               }
               //verifficar si la cuenta esta bloqueada
               if(pacienteFound.timeOut && pacienteFound.timeOut > Datenow()){
                 return res.status(403).json({message:"cuenta bloqueada"})
               }

               //validar la contraseña 
               const isMatch = await bcrypt.compare(password, pacienteFound.password);

               if(!isMatch){
                   pacienteFound.loginAttemps = (pacienteFound.loginAttemps || 0) + 1;

                   //si llega a 5 intentos fallidos se bloquea la cuenta
                   if(pacienteFound.loginAttemps >= 5){
                    pacienteFound.timeOut = Datenow() + 5 * 60 * 1000;
                    pacienteFound.loginAttemps = 0;

                    await pacienteFound.save();
                     return res.status(403).json({message:"cuenta bloqueada por multiples intentos fallidos"})
                   }

                   await pacienteFound.save();
                    return res.status(401).json({message:"contraseña incorrecta"})
               }

               //resetear intentos si el login es correcto
               pacienteFound.loginAttemps = 0;
               pacienteFound.timeOut = null;

               //generar el token
               const token = jsonwebtoken.sign(
                //datos a guardar
                {id:pacienteFound._id, userType: "Paciente"},
                //secret key
                config.JWT.secret,
                //cuando expira
                {expiresIn:"30d"},
               )

               //guardamos el tokwn en una cookie
               res.cookie("authCookie", token);
                return res.status(200).json({message:"login exitoso"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
}


export default loginPacientesController;