from .. import db
from . import AutorModel

class Libro(db.Model):
    __tablename__ = "libros"
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    editorial = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(100), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    isbn = db.Column(db.String(100), nullable=False)
    sinopsis = db.Column(db.String(5000), nullable=False)
    portada = db.Column(db.String(100), nullable=False)
    id_autor = db.Column(db.Integer, db.ForeignKey("autores.id"), nullable=False)
    autor = db.relationship("Autor", back_populates="libros", uselist=False, single_parent=True)
    reseñas = db.relationship("Reseña", back_populates="libro",cascade="all, delete-orphan")
    prestamos = db.relationship("Prestamo", back_populates="libro",cascade="all, delete-orphan")
   
    def __repr__(self):
        return '<Libro> titulo:%r' % (self.titulo)

    def to_json(self):
        self.autor = db.session.query(AutorModel).get_or_404(self.id_autor) 
        libro_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'genero': str(self.genero),
            'editorial': str(self.editorial),
            'estado': str(self.estado),
            'cantidad': self.cantidad,
            'isbn': str(self.isbn),
            'sinopsis': str(self.sinopsis),
            'portada': str(self.portada),
            'autor': self.autor.to_json()
        }
        return libro_json
            
    def to_json_complete(self):
        self.autor = db.session.query(AutorModel).get_or_404(self.id_autor) 
        reseñas = [reseña.to_json_complete() for reseña in self.reseñas]
        prestamos = [prestamo.to_json() for prestamo in self.prestamos]
        libro_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'genero': str(self.genero),
            'editorial': str(self.editorial),
            'estado': str(self.estado),
            'cantidad': self.cantidad,
            'isbn': str(self.isbn),
            'sinopsis': str(self.sinopsis),
            'portada': str(self.portada),
            'autor': self.autor.to_json(),
            'reseñas': reseñas,
            'prestamos': prestamos
        }
        return libro_json

    def to_json_short(self):
        libro_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'genero': str(self.genero),
            'portada': str(self.portada)
        }
        return libro_json

    @staticmethod
    def from_json(libro_json):
        id = libro_json.get('id')
        titulo = libro_json.get('titulo')
        genero = libro_json.get('genero')
        editorial = libro_json.get('editorial')
        estado = libro_json.get('estado')
        cantidad = libro_json.get('cantidad')
        isbn = libro_json.get('isbn')
        sinopsis = libro_json.get('sinopsis')
        portada = libro_json.get('portada')
        id_autor = libro_json.get('id_autor')

        return Libro(id=id,
                    titulo = titulo,
                    genero = genero,
                    editorial = editorial,
                    estado = estado,
                    cantidad = cantidad,
                    isbn = isbn,
                    sinopsis = sinopsis,
                    portada = portada,
                    id_autor = id_autor
                    )
