from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel

USUARIOS = {
    1:{"nombre":"Celina", "apellido":"Guerra Díaz", "mail":"cad.guerra@gmail.com", "telefono":"2615482516"},
    2:{"nombre":"Victoria","apellido":"Torres","mail":"mvb.torres@gmail.com", "telefono":"2615332269"},
}

class Usuarios(Resource):
    def get(self):
        usuarios = db.session.query(UsuarioModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios])

    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        try:
            db.session.add(usuario)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        return usuario.to_json(), 201

class Usuario(Resource):
    def get(self, id): 
        try:
            usuarios = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        return usuarios.to_json_complete()

    def put(self, id):
        try:
            usuario = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json() , 201    
    
    def delete(self, id):
        try:
            usuario = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        db.session.delete(usuario)
        db.session.commit()
        return usuario.to_json(), 204
