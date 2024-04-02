from flask_restful import Resource
from flask import request

USUARIOS = {
    1:{"nombre":"Celina", "apellido":"Guerra Díaz", "mail":"cad.guerra@gmail.com", "telefono":"2615482516"},
    2:{"nombre":"Victoria","apellido":"Torres","mail":"mvb.torres@gmail.com", "telefono":"2615332269"},
}

class Usuarios(Resource):
    def get(self):
        return USUARIOS, 200

    def post(self):
        usuario = request.get_json()
        id = int(max(USUARIOS.keys())) + 1
        USUARIOS[id] = usuario
        return USUARIOS[id], 201

class Usuario(Resource):
    def get(self,id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)], 200
        
        return "No existe el id", 404

    def put(self,id):
        if int(id) in USUARIOS:
            usuario = USUARIOS[int(id)]
            data = request.get_json()
            usuario.update(data)
            return "El usuario se edito correctamente", 201
        
        return "No existe el id", 404

    def delete(self,id):
        if int(id) in USUARIOS:
            del USUARIOS[int(id)]
            return "El usuario se ha eliminado correctamente", 200
        
        return "No existe el id", 404