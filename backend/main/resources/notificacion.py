from flask_restful import Resource
from flask import request
from main.models import NotificacionModel
from .. import db

class Notificacion(Resource):
    def post(self):
        notificacion = NotificacionModel.from_json(request.get_json())
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201
