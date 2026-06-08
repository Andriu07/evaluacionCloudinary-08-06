import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

//importar-rutas
import logoutRoute from "./src/Routes/logoutRoute.js"
import loginPacientesRoute from "./src/Routes/loginPacientesRoute.js"
import registerPacienteRoute from "./src/Routes/registerPacienteRoute.js"
import recoveryPasswordPacienteRoute from "./src/Routes/recoveryPasswordPacientes.js"
import pacientesRoute from "./src/Routes/pacientesRoute.js"

import especialidadesRoute from "./src/Routes/especialidadesRoute.js"
import citasMedicasRoute from "./src/Routes/citasMedicasRoute.js"
import equiposMedicosRoute from "./src/Routes/equiposMedicos.js"
import expedientesRoute from "./src/Routes/expedientesRoute.js"

export const app = express();

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
}));

app.use(cookieParser());

app.use(express.json());

app.use("/api/pacientes", pacientesRoute)
app.use("/api/loginPacientes", loginPacientesRoute)
app.use("/api/registerPaciente", registerPacienteRoute)
app.use("/api/recoveryPasswordPaciente", recoveryPasswordPacienteRoute)
app.use("/api/logout", logoutRoute)

app.use("/api/expedientes", expedientesRoute)
app.use("/api/citasMedicas", citasMedicasRoute)
app.use("/api/equipoMedico", equiposMedicosRoute)
app.use("/api/especialidades", especialidadesRoute)

export default app;  
