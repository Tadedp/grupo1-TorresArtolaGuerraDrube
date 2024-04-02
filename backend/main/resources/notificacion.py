from flask_restful import Resource
from flask import request

NOTIFICACIONES = {
    1: [{"mensaje": "hola", "fecha": "hoy"}, {"mensaje": "chau", "fecha": "hoy"}],
    2: []
}

class Notificacion(Resource):
    def post(self, id):
        notificacion = request.get_json()
        NOTIFICACIONES[int(id)].append(notificacion)
        return NOTIFICACIONES[int(id)], 201