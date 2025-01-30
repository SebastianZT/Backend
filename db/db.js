import mongoose from "mongoose";
import { mensajes } from "../libs/mensajes.js";
export async function conectarBD(){
    try {
        const conexionBD = await mongoose.connect("mongodb://127.0.0.1:27017/TI01");
        return mensajes(200,"Conexion Correcta");
    }catch(error){
        return mensajes (400,'Error DB',error);
    }
}