from flask_restful import Resource
from flask import request, jsonify
from main.models import LibroModel, AutorModel, PrestamoModel
from .. import db

class Libros(Resource):
    def get(self):
        libros = db.session.query(LibroModel).all()
        return jsonify([libro.to_json() for libro in libros])
    
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
