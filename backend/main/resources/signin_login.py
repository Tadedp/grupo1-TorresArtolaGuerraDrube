from .usuario import USUARIOS
from flask_restful import Resource
from flask import request

class Sign_in(Resource):
#igual que el post en usuario pero lo hace un usuario
    def post(self):
        usuario = request.get_json()
        id = int(max(USUARIOS.keys())) + 1
        USUARIOS[id] = usuario
        return USUARIOS[id], 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        usuario = data["nombre"]

        for usuario_id, usuario_info in USUARIOS.items():
            if usuario_info["nombre"] == usuario:
                return {'usuario_id':usuario_id}, 200
            
        return "no existe el id", 404