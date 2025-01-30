import crypto from "crypto";

export function encriptarPassword(password) {
    const salt=crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password,salt,10,64,"sha512").toString("hex");
    return{
        salt,
        hash
    }
}
export function validarPassword(password, salt, hash) {
    const hashEvaluar = crypto.scryptSync(password,salt,10,64,"sha512").toString("hex");
}
export function usuarioAutorizado() {
    
}
export function adminAutorizado() {
    
}

/*Lineas para probar las funciones

const {hash,salt} =encriptarPassword("hola");
console.log("hash --->"+hash);
console.log("salt --->"+salt);

const passwordValido = validarPassword ("hola", salt, hash);
console.log("Password valido "+passwordValido);*/