from flask_restful import Resource
from flask import request, jsonify
from main.models import PrestamoModel
from main.__init__ import db


class Prestamos(Resource):
    def get(self): 
        prestamos = db.session.query(PrestamoModel).all()
        return jsonify([prestamo.to_json() for prestamo in prestamos])
    
    def post(self): 
        prestamo = PrestamoModel.from_json(request.get_json())
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201
    
            
class Prestamo(Resource):
    def get(self,id): 
        prestamos = db.session.query(PrestamoModel).get_or_404(id)
        return prestamos.to_json()
    
    
    def put(self, id): 
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(prestamo, key, value)
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json() , 201 

    
    def delete(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return prestamo.to_json(), 204