from .. import db

libros_prestamos = db.Table("libros_prestamos",
    db.Column("id_libro",db.Integer,db.ForeignKey("libros.id"),primary_key=True),
    db.Column("id_prestamo",db.Integer,db.ForeignKey("prestamos.id"),primary_key=True)
    )

class Libro(db.Model):
    __tablename__ = "libros"
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    editorial = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(100), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    isbn = db.Column(db.String(100), nullable=False) 
    reseñas = db.relationship("Reseña", back_populates="libro",cascade="all, delete-orphan")
    prestamos = db.relationship("Prestamo", secondary=libros_prestamos, backref=db.backref('libros', lazy='dynamic'))
   
    def __repr__(self):
        return '<Libro> titulo:%r' % (self.titulo)

    def to_json(self):
        libro_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'genero': str(self.genero),
            'editorial': str(self.editorial),
            'estado': str(self.estado),
            'cantidad': self.cantidad,
            'isbn': str(self.isbn)
        }
        return libro_json
            
    def to_json_complete(self):
        autores = [autor.to_json() for autor in self.autores]  
        reseñas = [reseña.to_json() for reseña in self.reseñas]
        prestamos = [prestamo.to_json() for prestamo in self.prestamos]
        libro_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'genero': str(self.genero),
            'editorial': str(self.editorial),
            'estado': str(self.estado),
            'cantidad': self.cantidad,
            'isbn': str(self.isbn),
            'autores': autores,
            'reseñas': reseñas,
            'prestamos': prestamos
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
        cantidad = libro_json.get('cantidad')
        isbn = libro_json.get('isbn')

        return Libro(id=id,
                    titulo = titulo,
                    genero = genero,
                    editorial = editorial,
                    estado = estado,
                    cantidad = cantidad,
                    isbn = isbn
                    )
