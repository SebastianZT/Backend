import User from "../models/usuarioModelo.js";
import { encriptarPassword, validarPassword } from "../middlewares/funcionesPassword.js";
import { mensajes } from "../libs/mensajes.js";
import { crearCookie } from "../libs/jwt.js";

export const register = async ({ username, email, password }) => {
    try {
        const usuarioDuplicado = await User.findOne({username});
        const emailDuplicado = await User.findOne({email});
        if(usuarioDuplicado || emailDuplicado){
            return mensajes(400,"El usuario ya existe");
        }
        const { salt, hash } = encriptarPassword(password);
        const dataUser = new User({ username, email, password: hash, salt });
        const respuestaMongo = await dataUser.save();
        const token = await crearCookie({id:respuestaMongo._id});
        return mensajes(200,"Usuario registrado correctamente","",token);
    } catch (error) {
        return mensajes(400, "Error al registrar al usuario", error);
    }
}
export const obtenerUsuarios = async () => {
    try {
        const usuarios = await User.find(); // Recupera todos los usuarios
        return mensajes(200, "Lista de usuarios obtenida correctamente", usuarios);
    } catch (error) {
        return mensajes(400, "Error al obtener usuarios", error);
    }
};
export const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findById(id); // Busca usuario por ID
        if (!usuario) {
            return mensajes(404, "Usuario no encontrado");
        }
        return mensajes(200, "Usuario encontrado", usuario);
    } catch (error) {
        return mensajes(400, "Error al buscar usuario", error);
    }
};
export const eliminarUsuarioPorId = async (id) => {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(id); // Busca y elimina el usuario por ID
        if (!usuarioEliminado) {
            return mensajes(404, "Usuario no encontrado, no se pudo eliminar");
        }
        return mensajes(200, "Usuario eliminado correctamente");
    } catch (error) {
        return mensajes(400, "Error al eliminar usuario", error);
    }
};
export const actualizarUsuarioPorId = async (id, data) => {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(id, data, { new: true }); // Busca y actualiza el usuario por ID
        if (!usuarioActualizado) {
            return mensajes(404, "Usuario no encontrado, no se pudo actualizar");
        }
        return mensajes(200, "Usuario actualizado correctamente", usuarioActualizado);
    } catch (error) {
        return mensajes(400, "Error al actualizar usuario", error);
    }
};
export const login = async ({ username, password }) => {
}