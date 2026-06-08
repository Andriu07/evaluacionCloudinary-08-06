import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";
import pacientesModel from "../Models/pacientesModel.js";
import { error, info } from "console";

const recoveryPasswordPacienteController = {};

recoveryPasswordPacienteController.requestCode = async (req, res) => {
  try {
    //solicitamos los datos
    const { email } = req.body;

    //validar si el correo existe

    const userFound = await pacientesModel.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    //generar el codigo aleatorio
    const randomCode = crypto.randomBytes(8).toString("hex");

    //guardamos todo en el token
    const token = jsonwebtoken.sign(
      //datos a guardar
      { email, randomCode, userType: "Paciente", verified: false },
      //clave secreta
      config.JWT.secret,
      { expiresIn: "15min" },
    );
    //tiempo
    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });

    //enviar el codigo que generamos
    //quien lo envia
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
      subject: "Código de recuperación de contraseña",
      body: "El código expira en 15 minutos",
    };

    //enviar el correo
    transporter.sendMail(mailOptions),
      (error, info) => {
        if (error) {
          console.log("error" + error);
          return res.status(500).json({ message: "Error sending email" });
        }
        return res.status(200).json({ message: "Email sent" });
      };
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

  //codigo de verificacion
  recoveryPasswordPacienteController.verifyCode = async (req, res) => {
    try {
      //solicitamos los datos
      const { code } = req.body;

      const token = req.cookies.recoveryCookie;

      const decoded = jsonwebtoken.verify(token.config.JWT.secret);

      //comparamos el codigo que el usuario escribio con el que esta dentro del token
      if (code !== decoded.randomCode) {
        return res.status(400).json({ message: "Invalid code" });
      }

      //si escribe bien el codigo colocar en el token que ya esta verificado
      const newToken = jsonwebtoken.sign(
        { email: decoded.email, userType: "Paciente", verified: true },
        config.JWT.secret,
        { expiresIn: "15min" },
      );

      res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });
      return res.status(200).json({ message: "Code verified successfuly" });
    } catch (error) {
      console.log("error" + error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  recoveryPasswordPacienteController.newPassword = async (req, res) => {
    try {
      const { newPassword, confirmNewPassword } = req.body;

      if (newPassword !== confirmNewPassword) {
        console.log("error" + error);
        return res.status(400).json({ message: "Password doesnt match" });
      }

      //comprobar que la constante verified que esta en el token ya este en true
      const token = req.cookies.recoveryCookie;
      const decoded = jsonwebtoken.verify(token, config.JWT.secret);

      if (!decoded.verified) {
        return res.status(400).json({ message: "Code not verified" });
      }

      ////encriptar

      const passwordHash = await bcrypt.hash(newPassword, 10);
      //actualizamos la contraseña en nuestra base de datos
      await pacientesModel.findOneAndUpdate(
        { email: decoded.email },
        { password: passwordHash },
        { new: true },
      );

      //limpiar la cookie
      res.clearCookie("recoveryCookie");
      return res.status(200).json({ message: "Password updated" });
    } catch (error) {
      console.log("error" + error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


export default recoveryPasswordPacienteController;
