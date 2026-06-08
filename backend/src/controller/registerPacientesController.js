import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";
import pacientesModel from "../Models/pacientesModel.js";

const registerPacienteController = {};

registerPacienteController.register = async (req, res) => {
  //solicitamos los datos
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
    timeOut,
  } = req.body;

  try {
    //validar que el correo no exista
    const existsPaciente = await pacientesModel.findOne({ email });

    if (existsPaciente) {
      return res.status(400).json({ message: "Paciente alredy exists" });
    }

    //encriptar la contraseña
    const passwordHashed = await bcrypt.hash(password, 10);

    //generamos un codigo aleatorio
    const randomNumber = crypto.randomBytes(3).toString("hex");

    //guardamos en un token la informacion
    const token = jsonwebtoken.sign(
      {
        name,
        lastName,
        email,
        password: passwordHashed,
        birthDate,
        phon,
        address,
        bloodType,
        phoneEmergencyContacts,
        profilePhoto,
        isVerified,
        loginAttemps,
        timeOut,
      },
      config.JWT.secret,
      { expiresIn: "15min" },
    );

    res.cookie("RegistrationCookie", token, { maxAge: 15 * 60 * 1000 });

    //creamos el transporter quien envia el correo

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificacion de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este codigo " +
        randomNumber +
        "expira en 15 minutos",
    };

    //enviar el correo
    (transporter.sendMail(mailOptions),
      (error, info) => {
        if (error) {
          console.log("error" + error);
          return res.status(500).json({ message: "Error sending email" });
        }
        return res.status(200).json({ message: "Email sent" });
      });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
  //verificar el codigo que acabamos de enviar
  registerPacienteController.verifyCode = async (req, res) => {
    try {
      const { verificationCodeRequest } = req.body;

      //obtener el token de las cookies
      const token = req.cookies.RegistrationCookie;

      const decoded = jsonwebtoken.verify(token, config.JWT.secret);
      const {
        randomNumber: storedCode,
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
        timeOut,
      } = decoded;

      //comparar los codigos
      if(verificationCodeRequest !== storedCode){
         return res.status(400).json({ message: "Invalid code" });
      }

      //si todo sale bien yy el usuario escribe bien el codigo lo resgistramos en la DB
      const newPaciente = new pacientesModel({
        name,
        lastName,
        email,
        password,
        birthDate,
        phon,
        address,
        bloodType,
        phoneEmergencyContacts,
        profilePhoto: req.file.path ,
        public_id: req.file.filename,
        isVerified: true,
        loginAttemps,
        timeOut,
      })

      await newPaciente.save();
    
      //limpiamos la cookie
      res.clearCookie("RegistrationCookie")
      return res.status(200).json({ message: "Register paciente" });
    } catch (error) {
      console.log("error" + error)
      return res.status(500).json({ message: "Internal server error" });
    }
  }



export default registerPacienteController;