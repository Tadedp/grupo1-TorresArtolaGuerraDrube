from flask_restful import Resource
from flask import request, jsonify
from main.models import PrestamoModel, LibroModel
from .. import db

class Prestamos(Resource):
    def get(self):
        prestamos = db.session.query(PrestamoModel).all()
        return jsonify([prestamo.to_json() for prestamo in prestamos])
    
    def post(self):
        libros_ids = request.get_json().get('libros')
        prestamo = PrestamoModel.from_json(request.get_json())
        
        if libros_ids:
            libros = LibroModel.query.filter(LibroModel.id.in_(libros_ids)).all()
            prestamo.libros.extend(libros)
        
        try:
            db.session.add(prestamo)
            db.session.commit()
        except:
            return "Formato incorrecto", 400
        return prestamo.to_json(), 201 
            
class Prestamo(Resource):
    def get(self, id):
        prestamos = db.session.query(PrestamoModel).get_or_404(id)
        return prestamos.to_json_complete()
    
    def put(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        data = PrestamoModel.from_json_attr(request.get_json()).items()
        for key, value in data:
            setattr(prestamo, key, value)
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201
    
    def delete(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return "", 204