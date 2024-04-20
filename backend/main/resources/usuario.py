

USUARIOS = {
    1:{"nombre":"Celina", "apellido":"Guerra Díaz", "mail":"cad.guerra@gmail.com", "telefono":"2615482516"},
    2:{"nombre":"Victoria","apellido":"Torres","mail":"mvb.torres@gmail.com", "telefono":"2615332269"},
}

from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel


class Usuarios(Resource):
    
    def get(self): #obtener usuario
        usuarios = db.session.query(UsuarioModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios])


    def post(self):  #agregar un usuario
        usuario = UsuarioModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201

class Usuario(Resource):

    def get(self,id):  #obtener listado usuario
        usuarios = db.session.query(UsuarioModel).get_or_404(id)
        return usuarios.to_json()

    
    
    def put(self, id):  #editar usuario
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json() , 201    

    
    def delete(self, id):  #borrar libro
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return usuario.to_json(), 204