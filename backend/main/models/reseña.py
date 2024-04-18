from main.__init__ import db
import json
from datetime import datetime

class Reseña(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    comentario = db.Column(db.String(250), nullable = True)
    valoracion = db.Column(db.Float, nullable = False)
    fecha = db.Column(db.DateTime, nullable = False)
    
    def __repr__(self):
        return '<Reseña> id:%r, valoracion:%r, comentario:%r' % (self.id, self.valoracion, self.comentario)

    def to_json(self):
        reseña_json = {
            'id': self.id,
            'comentario': str(self.comentario),
            'valoracion': self.valoracion,
            'fecha': str(self.fecha.strftime('%d-%m-%Y'))
            
        }
        return reseña_json

    def to_json_short(self):
        reseña_json = {
            'id': self.id,
        }
        return reseña_json

    @staticmethod
    def from_json(reseña_json):
        id = reseña_json.get('id')
        valoracion = reseña_json.get('valoracion')
        comentario = reseña_json.get('comentario')
        fecha = datetime.strptime(reseña_json.get('fecha'), '%d-%m-%Y')

        return Reseña(id = id,
                      valoracion = valoracion,
                      comentario = comentario,
                      fecha = fecha
                    )