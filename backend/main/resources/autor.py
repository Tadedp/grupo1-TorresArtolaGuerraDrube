from flask_restful import Resource
from flask import request, jsonify
from main.models import AutorModel
from .. import db

class Autores(Resource):
    def get(self):
        autores = db.session.query(AutorModel).all()
        return jsonify([autor.to_json() for autor in autores])
    
    def post(self):
        autor = AutorModel.from_json(request.get_json())
        try:
            db.session.add(autor)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        return autor.to_json(), 201

class Autor(Resource):
    def get(self,id):
        try:
            autor = db.session.query(AutorModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        return autor.to_json_complete()

    def put(self,id):
        try:
            autor = db.session.query(AutorModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        data = request.get_json().items()
        for key, value in data:
            setattr(autor, key, value)
        db.session.add(autor)
        db.session.commit()
        return autor.to_json() , 201

    def delete(self,id):
        try:
            autor = db.session.query(AutorModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        db.session.delete(autor)
        db.session.commit()
        return autor.to_json(), 204