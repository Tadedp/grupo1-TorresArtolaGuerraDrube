from flask_restful import Resource
from flask import request, jsonify
from main.models import AutorModel
<<<<<<< HEAD
from main.__init__ import db
=======
from .. import db
>>>>>>> main

class Autores(Resource):
    def get(self):
        autores = db.session.query(AutorModel).all()
        return jsonify([autor.to_json() for autor in autores])
    
    def post(self):
        autor = AutorModel.from_json(request.get_json())
        db.session.add(autor)
        db.session.commit()
        return autor.to_json(), 201

class Autor(Resource):
    def get(self,id):
        autor = db.session.query(AutorModel).get_or_404(id)
        return autor.to_json()

    def put(self,id):
        autor = db.session.query(AutorModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(autor, key, value)
        db.session.add(autor)
        db.session.commit()
        return autor.to_json() , 201

    def delete(self,id):
        autor = db.session.query(AutorModel).get_or_404(id)
        db.session.delete(autor)
        db.session.commit()
        return autor.to_json(), 204