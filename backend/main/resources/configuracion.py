from flask_restful import Resource
from flask import request

CONFIGURACION = {1:{"abierto": "si"}}

class Configuracion(Resource):
    def get(self,id):
        if int(id) in CONFIGURACION:
            return CONFIGURACION[int(id)], 200
        return "ID inexistente.", 404
    
    def put(self, id): 
        if int(id) in CONFIGURACION:
            configuracion = CONFIGURACION[int(id)]
            data = request.get_json()
            configuracion.update(data)
            return "La configuración se editó correctamente", 201
        return "ID inexistente.", 404