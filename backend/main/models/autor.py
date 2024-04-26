from .. import db

libros_autores = db.Table("libros_autores",
    db.Column("id_libro",db.Integer,db.ForeignKey("libro.id"),primary_key=True),
    db.Column("id_autor",db.Integer,db.ForeignKey("autor.id"),primary_key=True)
    )

class Autor(db.Model):
    __tablename__ = "autores"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    libros = db.relationship("Libro", secondary=libros_autores, backref=db.backref('autores', lazy='dynamic'))
    
    def __repr__(self):
        return '<Autor> nombre:%r apellido:%r' % (self.nombre, self.apellido)

    def to_json(self):
        autor_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido)
        }
        return autor_json
    
    def to_json_complete(self):
        libros = [libro.to_json() for libro in self.libros]
        autor_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'libros': libros
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