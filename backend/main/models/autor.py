from .. import db

class Autor(db.Model):
    __tablename__ = "autores"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    libro = db.relationship("Libro", back_populates="autor",cascade="all, delete-orphan")

    
    def __repr__(self):
        return '<Autor> nombre:%r apellido:%r' % (self.nombre, self.apellido)

    def to_json(self):

        autor_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido)
        }
        return autor_json

    def to_json_short(self):
        autor_json = {
            'id': self.id
        }
        return autor_json

    @staticmethod
    def from_json(autor_json):
        id = autor_json.get('id')
        nombre = autor_json.get('nombre')
        apellido = autor_json.get('apellido')

        return Autor(id = id,
                    nombre = nombre,
                    apellido = apellido
                    )