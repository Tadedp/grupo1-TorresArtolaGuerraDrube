from .. import db
from . import UsuarioModel
from . import LibroModel
from datetime import datetime

class Reseña(db.Model):
    __tablename__ = "reseñas"
    id = db.Column(db.Integer, primary_key = True)
    comentario = db.Column(db.String(250), nullable = True)
    valoracion = db.Column(db.Integer, nullable = False)
    fecha = db.Column(db.DateTime, nullable = False)
    id_libro = db.Column(db.Integer, db.ForeignKey("libro.id"), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    usuario = db.relationship("Usuario", back_populates="reseñas",cascade="all, delete-orphan")
    libro = db.relationship("Libro", back_populates="reseñas",cascade="all, delete-orphan")

    
    def __repr__(self):
        return '<Reseña> id:%r, valoracion:%r, comentario:%r' % (self.id, self.valoracion, self.comentario)

    def to_json(self):
        self.usuario = db.session.query(UsuarioModel).get_or_404(self.id_usuario)
        self.libro = db.session.query(LibroModel).get_or_404(self.id_libro)
        reseña_json = {
            'id': self.id,
            'comentario': str(self.comentario),
            'valoracion': self.valoracion,
            'fecha': str(self.fecha.strftime('%Y-%m-%d')),
            'libro': self.libro.to_json(),
            'usuario': self.usuario.to_json()
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
        fecha = datetime.strptime(reseña_json.get('fecha'), '%Y-%m-%d')

        return Reseña(id = id,
                    valoracion = valoracion,
                    comentario = comentario,
                    fecha = fecha
                    )