from .. import db
from . import UsuarioModel
from datetime import datetime

class Notificacion(db.Model):
    __tablename__ = "notificaciones"
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, nullable=False)
    mensaje = db.Column(db.String(250), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    usuario = db.relationship("Usuario", back_populates="notificaciones",cascade="all, delete-orphan")

    def __repr__(self):
        return '<Notificacion> id:%r, mensaje:%r' % (self.id, self.mensaje)

    def to_json(self):
        self.usuario = db.session.query(UsuarioModel).get_or_404(self.id_usuario)
        notificacion_json = {
            'id': self.id,
            'fecha': str(self.fecha.strftime('%Y-%m-%d')),
            'mensaje': str(self.mensaje),
            'usuario': self.usuario.to_json()
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