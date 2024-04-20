from flask_restful import Resource
from flask import request, jsonify
from main.models import ReseñaModel
from .. import db

class Reseña(Resource):
    def get(self):   
        reseñas = db.session.query(ReseñaModel).all()
        return jsonify([reseña.to_json() for reseña in reseñas])
    
    def post(self):
        reseña = ReseñaModel.from_json(request.get_json())
        db.session.add(reseña)
        db.session.commit()
        return reseña.to_json(), 201