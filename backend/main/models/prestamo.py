from .. import db
from datetime import datetime

class Prestamo(db.Model):
    __tablename__ = "prestamos"
    id = db.Column(db.Integer, primary_key=True)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_fin = db.Column(db.DateTime, nullable=False)
    
    
    def __repr__(self):
        return '<Prestamo> id:%r' % (self.id)

    def to_json(self):
        prestamo_json = {
            'id': self.id,
            'fecha_inicio': str(self.fecha_inicio.strftime('%Y-%m-%d')),
            'fecha_fin': str(self.fecha_fin.strftime('%Y-%m-%d'))
        }
        return prestamo_json

    def to_json_short(self):
        prestamo_json = {
            'id': self.id
        }
        return prestamo_json

    @staticmethod
    def from_json_attr(prestamo_json):
        if prestamo_json.get('fecha_inicio') != None:
            prestamo_json['fecha_inicio'] = datetime.strptime(prestamo_json.get('fecha_inicio'), '%Y-%m-%d')
        if prestamo_json.get('fecha_fin') != None:
            prestamo_json['fecha_fin'] = datetime.strptime(prestamo_json.get('fecha_fin'), '%Y-%m-%d')
        return prestamo_json

    @staticmethod
    def from_json(prestamo_json):
        id = prestamo_json.get('id')
        fecha_inicio = datetime.strptime(prestamo_json.get('fecha_inicio'), '%Y-%m-%d')
        fecha_fin = datetime.strptime(prestamo_json.get('fecha_fin'), '%Y-%m-%d')

        return Prestamo(id = id,
                        fecha_inicio = fecha_inicio,
                        fecha_fin = fecha_fin
                    )