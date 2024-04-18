from flask_restful import Resource
from flask import request

AUTORES = {
    1:{"nombre":"Celina", "apellido":"Guerra Díaz"},
    2:{"nombre":"Victoria","apellido":"Torres"},
}

class Autores(Resource):
    def get(self):
        return AUTORES, 200

    def post(self):
        autor = request.get_json()
        id = int(max(AUTORES.keys())) + 1
        AUTORES[id] = autor
        return AUTORES[id], 201

class Autor(Resource):
    def get(self,id):
        if int(id) in AUTORES:
            return AUTORES[int(id)], 200
        
        return "No existe el id", 404

    def put(self,id):
        if int(id) in AUTORES:
            usuario = AUTORES[int(id)]
            data = request.get_json()
            usuario.update(data)
            return "El autor se edito correctamente", 201
        
        return "No existe el id", 404

    def delete(self,id):
        if int(id) in AUTORES:
            del AUTORES[int(id)]
            return "El autor se ha eliminado correctamente", 200
        
        return "No existe el id", 404