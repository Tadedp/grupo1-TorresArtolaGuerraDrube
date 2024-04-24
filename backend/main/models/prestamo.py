from .. import db
from datetime import datetime

class Prestamo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha_inicio = db.Column(db.String(20), nullable=False)
    fecha_fin = db.Column(db.String(20), nullable=False)
    
    
    def __repr__(self):
        return '<Prestamo> id:%r' % (self.id)

    def to_json(self):
        prestamo_json = {
            'id': self.id,
            'fecha_inicio': str(self.fecha_inicio.strftime('%d-%m-%Y')),
            'fecha_fin': str(self.fecha_fin.strftime('%d-%m-%Y'))
        }
        return prestamo_json

    def to_json_short(self):
        prestamo_json = {
            'id': self.id
        }
        return prestamo_json

    @staticmethod
    def from_json(prestamo_json):
        id = prestamo_json.get('id'),
        fecha_inicio = datetime.strptime(prestamo_json.get('fecha_inicio'), '%d-%m-%Y'),
        fecha_fin = datetime.strptime(prestamo_json.get('fecha_fin'), '%d-%m-%Y')


        return Prestamo(id = id,
                        fecha_inicio = fecha_inicio,
                        fecha_fin = fecha_fin
                    )