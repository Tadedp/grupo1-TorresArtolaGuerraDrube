from .. import db

class Libro(db.Model):
    __tablename__ = "libros"
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    editorial = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(100), nullable=False)
    cantidad = db.Column(db.Integer)
    isbn = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return '<Libro> titulo:%r' % (self.titulo)

    def to_json(self):
        libro_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'genero': str(self.genero),
            'editorial': str(self.editorial),
            'estado': self.estado,
            'cantidad': self.cantidad,
            'isbn': str(self.isbn)
        }
        return libro_json

    def to_json_short(self):
        libro_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'genero': str(self.genero),
        }
        return libro_json

    @staticmethod
    def from_json(libro_json):
        id = libro_json.get('id')
        titulo = libro_json.get('titulo')
        genero = libro_json.get('genero')
        editorial = libro_json.get('editorial')
        estado = libro_json.get('estado')
        isbn = libro_json.get('isbn')

        return Libro(id=id,
                    titulo = titulo,
                    genero = genero,
                    editorial = editorial,
                    estado = estado,
                    isbn = isbn
                    )
