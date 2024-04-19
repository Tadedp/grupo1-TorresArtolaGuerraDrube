from main.__init__ import db
import json
from datetime import datetime

class Notificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.String(20), nullable=False)
    mensaje = db.Column(db.String(250), nullable=False)
    
    def __repr__(self):
        return '<Notificacion> id:%r, mensaje:%r' % (self.id, self.mensaje)

    def to_json(self):
        notificacion_json = {
            'id': self.id,
            'fecha': str(self.fecha.strftime("%d-%m-%Y")),
            'mensaje': str(self.mensaje)
        }
        return notificacion_json

    def to_json_short(self):
        notificacion_json = {
            'id': self.id
        }
        return notificacion_json

    @staticmethod
    def from_json(notificacion_json):
        id = notificacion_json.get('id')
        fecha = datetime.strptime(notificacion_json.get('fecha'), "%d-%m-%Y")
        mensaje = notificacion_json.get('mensaje')

        return Notificacion(id=id,
                    fecha = fecha,
                    mensaje = mensaje
                    )