from flask_restful import Resource
from flask import request, jsonify
from main.models import LibroModel, AutorModel, PrestamoModel, ReseñaModel
from .. import db
from sqlalchemy import func, desc, asc
from main.auth.decorators import role_required

class Libros(Resource):    
    def get(self):
        page = 1
        per_page = 6
        libros = db.session.query(LibroModel)
        
        args = ["page", "per_page", "id", "titulo", "autor_id", "genero", "editorial", "estado", "cantidad", "isbn", "sortby_id", "sortby_titulo", "sortby_estado", "sortby_cantidad", "sortby_nrPrestamos", "sortby_nrReseñas", "sortby_nrAutores"]
        
        for key in request.args.keys():
            if key not in args:
                return "URL inexistente.", 404 
        
        if list(request.args.keys()) == []:
            page = 1
        
        if request.args.get('page'):
            try:
                page = int(request.args.get('page'))
            except:
                return "URL inexistente.", 404
        
        if request.args.get('per_page'):
            try:
                per_page = int(request.args.get('per_page'))
            except:
                return "URL inexistente.", 404
            
        if request.args.get('id'):
            libros=libros.filter(LibroModel.id.like("%"+request.args.get('id')+"%"))    
            
        if request.args.get('titulo'):
            libros=libros.filter(LibroModel.titulo.like("%"+request.args.get('titulo')+"%"))
                
        if request.args.get('autor_id'):
            libros=libros.join(LibroModel.autores).filter(AutorModel.id == request.args.get('autor_id'))     
                         
        if request.args.get('genero'):
            libros=libros.filter(LibroModel.genero.like("%"+request.args.get('genero')+"%"))
                    
        if request.args.get('editorial'):
            libros=libros.filter(LibroModel.editorial.like("%"+request.args.get('editorial')+"%"))

        if request.args.get('estado'):
            libros=libros.filter(LibroModel.estado.like("%"+request.args.get('estado')+"%"))
                    
        if request.args.get('cantidad'):
            libros=libros.filter(LibroModel.cantidad.like("%"+request.args.get('cantidad')+"%"))
                    
        if request.args.get('isbn'):
            libros=libros.filter(LibroModel.isbn.like("%"+request.args.get('isbn')+"%"))
             
        if request.args.get('sortby_id'):
            if request.args.get('sortby_id') == "asc":
                libros=libros.order_by(asc(LibroModel.id))
            elif request.args.get('sortby_id') == "desc":
                libros=libros.order_by(desc(LibroModel.id))
            else:
                return "URL inexistente.", 404     
            
        if request.args.get('sortby_titulo'):
            if request.args.get('sortby_titulo') == "asc":
                libros=libros.order_by(asc(LibroModel.titulo))
            elif request.args.get('sortby_titulo') == "desc":
                libros=libros.order_by(desc(LibroModel.titulo))
            else:
                return "URL inexistente.", 404     
              
        if request.args.get('sortby_estado'):
            if request.args.get('sortby_estado') == "asc":
                libros=libros.order_by(asc(LibroModel.estado))
            elif request.args.get('sortby_estado') == "desc":
                libros=libros.order_by(desc(LibroModel.estado))
            else:
                return "URL inexistente.", 404
                  
        if request.args.get('sortby_cantidad'):
            if request.args.get('sortby_cantidad') == "asc":
                libros=libros.order_by(asc(LibroModel.cantidad))
            elif request.args.get('sortby_cantidad') == "desc":
                libros=libros.order_by(desc(LibroModel.cantidad))
            else:
                return "URL inexistente.", 404
            
        if request.args.get('sortby_nrPrestamos'):
            if request.args.get('sortby_nrPrestamos') == "asc":
                libros=libros.outerjoin(LibroModel.prestamos).group_by(LibroModel.id).order_by(func.count(PrestamoModel.id).asc())
            elif request.args.get('sortby_nrPrestamos') == "desc":
                libros=libros.outerjoin(LibroModel.prestamos).group_by(LibroModel.id).order_by(func.count(PrestamoModel.id).desc())
            else:
                return "URL inexistente.", 404
            
        if request.args.get('sortby_nrReseñas'):
            if request.args.get('sortby_nrReseñas') == "asc":
                libros=libros.outerjoin(LibroModel.reseñas).group_by(LibroModel.id).order_by(func.count(ReseñaModel.id).asc())
            elif request.args.get('sortby_nrReseñas') == "desc":
                libros=libros.outerjoin(LibroModel.reseñas).group_by(LibroModel.id).order_by(func.count(ReseñaModel.id).desc())
            else:
                return "URL inexistente.", 404
                  
        libros = libros.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'libros': [libro.to_json_complete() for libro in libros],
                  'total': libros.total,
                  'pages': libros.pages,
                  'page': page
                })
    
    @role_required(roles = ["Admin", "Bibliotecario"])
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
    
    @role_required(roles = ["Admin", "Bibliotecario"])
    def delete(self, id):
        try:
            libro = db.session.query(LibroModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        db.session.delete(libro)
        db.session.commit()
        return libro.to_json(), 204
    
    @role_required(roles = ["Admin", "Bibliotecario"])
    def put(self, id):
        try:
            libro = db.session.query(LibroModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        
        data = request.get_json()
        
        if "autor" in data:
            autor_id = data["autores"]
            autor = db.session.query(AutorModel).get_or_404(autor_id)
            libro.autores = autor
        
        for key, value in data.items():
            if key == "id":
                continue
            setattr(libro, key, value)
            
        db.session.add(libro)
        db.session.commit()
        return libro.to_json() , 201
