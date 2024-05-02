from flask_restful import Resource
from flask import request, jsonify
from main.models import LibroModel, AutorModel, PrestamoModel, ReseñaModel
from .. import db
from sqlalchemy import func, desc, asc

class Libros(Resource):
    def get(self):
        page = 1
        per_page = 10
        libros = db.session.query(LibroModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
            
        if request.args.get('titulo'):
            libros=libros.filter(LibroModel.titulo.like("%"+request.args.get('titulo')+"%"))
                         
        if request.args.get('genero'):
            libros=libros.filter(LibroModel.genero.like("%"+request.args.get('genero')+"%"))
                    
        if request.args.get('editorial'):
            libros=libros.filter(LibroModel.editorial.like("%"+request.args.get('editorial')+"%"))

        if request.args.get('estado'):
            libros=libros.filter(LibroModel.estado.like("%"+request.args.get('estado')+"%"))
                    
        if request.args.get('ISBN'):
            libros=libros.filter(LibroModel.isbn.like("%"+request.args.get('ISBN')+"%"))
                    
        if request.args.get('id'):
            libros=libros.filter(LibroModel.id.like("%"+request.args.get('id')+"%"))
                            
        if request.args.get('sortby_cantidad'):
            if request.args.get('sortby_cantidad') == "asc":
                libros=libros.order_by(asc(LibroModel.cantidad))
            if request.args.get('sortby_cantidad') == "desc":
                libros=libros.order_by(desc(LibroModel.cantidad))
        
        if request.args.get('sortby_titulo'):
            if request.args.get('sortby_titulo') == "asc":
                libros=libros.order_by(asc(LibroModel.titulo))
            if request.args.get('sortby_titulo') == "desc":
                libros=libros.order_by(desc(LibroModel.titulo))
                
        if request.args.get('sortby_nrPrestamos'):
            if request.args.get('sortby_nrPrestamos') == "asc":
                libros=libros.outerjoin(LibroModel.prestamos).group_by(LibroModel.id).order_by(func.count(PrestamoModel.id).asc())
            if request.args.get('sortby_nrPrestamos') == "desc":
                libros=libros.outerjoin(LibroModel.prestamos).group_by(LibroModel.id).order_by(func.count(PrestamoModel.id).desc())
        
        if request.args.get('sortby_nrReseñas'):
            if request.args.get('sortby_nrReseñas') == "asc":
                libros=libros.outerjoin(LibroModel.reseñas).group_by(LibroModel.id).order_by(func.count(ReseñaModel.id).asc())
            if request.args.get('sortby_nrReseñas') == "desc":
                libros=libros.outerjoin(LibroModel.reseñas).group_by(LibroModel.id).order_by(func.count(ReseñaModel.id).desc())
        
        if request.args.get('sortby_nrAutores'):
            if request.args.get('sortby_nrAutores') == "asc":
                libros=libros.outerjoin(LibroModel.autores).group_by(LibroModel.id).order_by(func.count(AutorModel.id).asc())
            if request.args.get('sortby_nrAutores') == "desc":
                libros=libros.outerjoin(LibroModel.autores).group_by(LibroModel.id).order_by(func.count(AutorModel.id).desc())

        libros = libros.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'libros': [libro.to_json() for libro in libros],
                  'total': libros.total,
                  'pages': libros.pages,
                  'page': page
                })
    
    def post(self): 
        autores_ids = request.get_json().get('autores')
        libro = LibroModel.from_json(request.get_json())
        
        if autores_ids:
            autores = AutorModel.query.filter(AutorModel.id.in_(autores_ids)).all()
            libro.autores.extend(autores)
        else:
            return "Formato de datos incorrecto.", 400
        
        try:
            db.session.add(libro)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        return libro.to_json(), 201

class Libro(Resource):
    def get(self,id): 
        try:
            libro = db.session.query(LibroModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        return libro.to_json_complete()
    
    def delete(self, id):
        try:
            libro = db.session.query(LibroModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        db.session.delete(libro)
        db.session.commit()
        return libro.to_json(), 204
    
    def put(self, id):
        try:
            libro = db.session.query(LibroModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        data = request.get_json().items()
        for key, value in data:
            setattr(libro, key, value)
        db.session.add(libro)
        db.session.commit()
        return libro.to_json() , 201
