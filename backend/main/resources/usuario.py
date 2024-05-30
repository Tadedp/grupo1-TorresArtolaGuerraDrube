from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel
from sqlalchemy import func, desc, asc


USUARIOS = {
    1:{"nombre":"Celina", "apellido":"Guerra Díaz", "mail":"cad.guerra@gmail.com", "telefono":"2615482516"},
    2:{"nombre":"Victoria","apellido":"Torres","mail":"mvb.torres@gmail.com", "telefono":"2615332269"},
}


class Usuarios(Resource):
    @role_required(roles = ["Admin"])
    def get(self):
        page = 1
        per_page = 10
        usuarios = db.session.query(UsuarioModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
            
        if request.args.get('rol'):
            usuarios=usuarios.filter(UsuarioModel.rol.like("%"+request.args.get('rol')+"%"))
                         
        if request.args.get('nombre'):
            usuarios=usuarios.filter(UsuarioModel.nombre.like("%"+request.args.get('nombre')+"%"))
                    
        if request.args.get('apellido'):
            usuarios=usuarios.filter(UsuarioModel.apellido.like("%"+request.args.get('apellido')+"%"))
                    
        if request.args.get('dni'):
            usuarios=usuarios.filter(UsuarioModel.dni.like("%"+request.args.get('dni')+"%"))
                    
        if request.args.get('mail'):
            usuarios=usuarios.filter(UsuarioModel.mail.like("%"+request.args.get('mail')+"%"))
                    
        if request.args.get('telefono'):
            usuarios=usuarios.filter(UsuarioModel.telefono.like("%"+request.args.get('telefono')+"%"))
        
        if request.args.get('sortby_apellido'):
            if request.args.get('sortby_apellido') == "asc":
                usuarios=usuarios.order_by(asc(UsuarioModel.apellido))
            if request.args.get('sortby_apellido') == "desc":
                usuarios=usuarios.order_by(desc(UsuarioModel.apellido))
        
        if request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre') == "asc":
                usuarios=usuarios.order_by(asc(UsuarioModel.nombre))
            if request.args.get('sortby_nombre') == "desc":
                usuarios=usuarios.order_by(desc(UsuarioModel.nombre))
                
        if request.args.get('sortby_nrPrestamos'):
            if request.args.get('sortby_nrPrestamos') == "asc":
                usuarios=usuarios.outerjoin(UsuarioModel.prestamos).group_by(UsuarioModel.id).order_by(func.count(PrestamoModel.id).asc())
            if request.args.get('sortby_nrPrestamos') == "desc":
                usuarios=usuarios.outerjoin(UsuarioModel.prestamos).group_by(UsuarioModel.id).order_by(func.count(PrestamoModel.id).desc())
        
        if request.args.get('sortby_nrReseñas'):
            if request.args.get('sortby_nrReseñas') == "asc":
                usuarios=usuarios.outerjoin(UsuarioModel.reseñas).group_by(UsuarioModel.id).order_by(func.count(ReseñaModel.id).asc())
            if request.args.get('sortby_nrReseñas') == "desc":
                usuarios=usuarios.outerjoin(UsuarioModel.reseñas).group_by(UsuarioModel.id).order_by(func.count(ReseñaModel.id).desc())
        
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios],
                  'total': usuarios.total,
                  'pages': usuarios.pages,
                  'page': page
                })
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        try:
            db.session.add(usuario)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        return usuario.to_json(), 201

class Usuario(Resource):
    @jwt_required(optional=True)
    def get(self, id): 
        try:
            usuario = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        
        if get_jwt_identity():
            current_identity = get_jwt_identity()
            if int(current_identity) == int(id):
                return usuario.to_json_complete()
        return usuario.to_json()
        
    @jwt_required()
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
    
    @role_required(roles = ["Admin","Bibliotecario","Usuario"])
    def delete(self, id):
        try:
            usuario = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        db.session.delete(usuario)
        db.session.commit()
        return usuario.to_json(), 204
