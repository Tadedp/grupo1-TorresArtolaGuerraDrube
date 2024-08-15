from flask_restful import Resource
from flask import request
from main.models import NotificacionModel
from .. import db
from main.auth.decorators import role_required

class Notificacion(Resource):
    @role_required(roles = ["Admin", "Bibliotecario"])
    def post(self):
        notificacion = NotificacionModel.from_json(request.get_json())
        try:
            db.session.add(notificacion)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        return notificacion.to_json(), 201
