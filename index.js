import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import usuariosRutas from "./routes/usuariosRutas.js";
import { conectarBD } from "./db/db.js";

const app=express();
const respuesta= conectarBD();
respuesta.then((value)=>{
    console.log(value); 
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api",usuariosRutas);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Servidor en el puerto http://localhost:${PORT}`);});