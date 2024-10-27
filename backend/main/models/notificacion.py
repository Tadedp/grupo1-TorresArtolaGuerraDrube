from .. import db
from datetime import datetime

notificaciones_usuarios = db.Table("notificaciones_usuarios",
    db.Column("id_notificacion",db.Integer,db.ForeignKey("notificaciones.id"),primary_key=True),
    db.Column("id_usuario",db.Integer,db.ForeignKey("usuarios.id"),primary_key=True)
    )

class Notificacion(db.Model):
    __tablename__ = "notificaciones"
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, nullable=False)
    mensaje = db.Column(db.String(250), nullable=False)
    usuarios = db.relationship("Usuario", secondary=notificaciones_usuarios, backref=db.backref('notificaciones', lazy='dynamic'))
    
    def __repr__(self):
        return '<Notificacion> id:%r, mensaje:%r' % (self.id, self.mensaje)

    def to_json(self):
        notificacion_json = {
            'id': self.id,
            'fecha': str(self.fecha.strftime('%Y-%m-%d')),
            'mensaje': str(self.mensaje)
        }
        return notificacion_json

    def to_json_complete(self):
        usuarios = [usuario.to_json() for usuario in self.usuarios]
        notificacion_json = {
            'id': self.id,
            'fecha': str(self.fecha.strftime('%Y-%m-%d')),
            'mensaje': str(self.mensaje),
            'usuarios': usuarios
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
        fecha = datetime.strptime(notificacion_json.get('fecha'), '%Y-%m-%d')
        mensaje = notificacion_json.get('mensaje')

        return Notificacion(id=id,
                            fecha = fecha,
                            mensaje = mensaje
                            )