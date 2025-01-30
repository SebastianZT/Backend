import { Router } from "express";
import { register } from "../db/usuariosdb.js";
const router=Router();

router.post("/registro", async (req,res)=>{
    const respuesta = await register(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});
import { obtenerUsuarios } from "../db/usuariosdb.js";

router.get("/usuarios", async (req, res) => {
    const respuesta = await obtenerUsuarios();
    res.status(respuesta.status).json(respuesta);
});
import { obtenerUsuarioPorId } from "../db/usuariosdb.js";

router.get("/usuario/:id", async (req, res) => {
    const respuesta = await obtenerUsuarioPorId(req.params.id);
    res.status(respuesta.status).json(respuesta);
});
import { eliminarUsuarioPorId } from "../db/usuariosdb.js";

router.delete("/usuario/:id", async (req, res) => {
    const respuesta = await eliminarUsuarioPorId(req.params.id);
    res.status(respuesta.status).json(respuesta);
});
import { actualizarUsuarioPorId } from "../db/usuariosdb.js";

router.put("/usuario/:id", async (req, res) => {
    const respuesta = await actualizarUsuarioPorId(req.params.id, req.body);
    res.status(respuesta.status).json(respuesta);
});
/*

Codigo hecho en clase, el cual para realizar la tarea queda en comentario por el momento

router.post("/incioSesion", (req,res)=>{
    res.json("Estas en Inicio de sesion");
});
router.get("/cerrarSesion",(req,res)=>{
    res.json("Estas en cerrar sesion");
});
router.get("/usuariosLogueados", (req,res)=>{
    res.json("Estas en usuarios y administradores");
});
router.get("/administradores",(req,res)=>{
    res.json("Estas en administradores");
});
router.get("/libre",(req,res)=>{
    res.json("Aqui puedes entrar sin estar registrado");
});*/

export default router;