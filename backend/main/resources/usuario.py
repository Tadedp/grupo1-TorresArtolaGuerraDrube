from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel, PrestamoModel, ReseñaModel
from sqlalchemy import func, desc, asc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required
from werkzeug.security import generate_password_hash

class Usuarios(Resource):
    @role_required(roles = ["Admin"])
    def get(self):
        page = 1
        per_page = 10
        usuarios = db.session.query(UsuarioModel)
        
        if list(request.args.keys()) == []:
            page = 1
        
        elif request.args.get('page'):
            try:
                page = int(request.args.get('page'))
            except:
                return "URL inexistente.", 404
                 
        elif request.args.get('per_page'):
            try:
                per_page = int(request.args.get('per_page'))
            except:
                return "URL inexistente.", 404
            
        elif request.args.get('id'):
            usuarios=usuarios.filter(UsuarioModel.id.like("%"+request.args.get('id')+"%"))
                             
        elif request.args.get('rol'):
            usuarios=usuarios.filter(UsuarioModel.rol.like("%"+request.args.get('rol')+"%"))
                         
        elif request.args.get('nombre'):
            usuarios=usuarios.filter(UsuarioModel.nombre.like("%"+request.args.get('nombre')+"%"))
                    
        elif request.args.get('apellido'):
            usuarios=usuarios.filter(UsuarioModel.apellido.like("%"+request.args.get('apellido')+"%"))
                    
        elif request.args.get('dni'):
            usuarios=usuarios.filter(UsuarioModel.dni.like("%"+request.args.get('dni')+"%"))
                    
        elif request.args.get('mail'):
            usuarios=usuarios.filter(UsuarioModel.mail.like("%"+request.args.get('mail')+"%"))
                    
        elif request.args.get('telefono'):
            usuarios=usuarios.filter(UsuarioModel.telefono.like("%"+request.args.get('telefono')+"%"))
        
        elif request.args.get('sortby_apellido'):
            if request.args.get('sortby_apellido') == "asc":
                usuarios=usuarios.order_by(asc(UsuarioModel.apellido))
            elif request.args.get('sortby_apellido') == "desc":
                usuarios=usuarios.order_by(desc(UsuarioModel.apellido))
            else:
                return "URL inexistente.", 404
            
        elif request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre') == "asc":
                usuarios=usuarios.order_by(asc(UsuarioModel.nombre))
            elif request.args.get('sortby_nombre') == "desc":
                usuarios=usuarios.order_by(desc(UsuarioModel.nombre))
            else:
                return "URL inexistente.", 404
                
        elif request.args.get('sortby_nrPrestamos'):
            if request.args.get('sortby_nrPrestamos') == "asc":
                usuarios=usuarios.outerjoin(UsuarioModel.prestamos).group_by(UsuarioModel.id).order_by(func.count(PrestamoModel.id).asc())
            elif request.args.get('sortby_nrPrestamos') == "desc":
                usuarios=usuarios.outerjoin(UsuarioModel.prestamos).group_by(UsuarioModel.id).order_by(func.count(PrestamoModel.id).desc())
            else:
                return "URL inexistente.", 404
             
        elif request.args.get('sortby_nrReseñas'):
            if request.args.get('sortby_nrReseñas') == "asc":
                usuarios=usuarios.outerjoin(UsuarioModel.reseñas).group_by(UsuarioModel.id).order_by(func.count(ReseñaModel.id).asc())
            elif request.args.get('sortby_nrReseñas') == "desc":
                usuarios=usuarios.outerjoin(UsuarioModel.reseñas).group_by(UsuarioModel.id).order_by(func.count(ReseñaModel.id).desc())
            else:
                return "URL inexistente.", 404
            
        else:
            return "URL inexistente.", 404
        
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios],
                  'total': usuarios.total,
                  'pages': usuarios.pages,
                  'page': page
                })
        
    @role_required(roles = ["Admin", "Bibliotecario"])
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)
        if current_user.rol == "Bibliotecario" and (usuario.rol == "Admin" or usuario.rol == "Bibliotecario"):
            return "Permiso denegado.", 403
        else:
            try:
                db.session.add(usuario)
                db.session.commit()
            except:
                return "Formato de datos incorrecto.", 400
            return usuario.to_json(), 201

class Usuario(Resource):
    @jwt_required()
    def get(self, id): 
        try:
            usuario = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
    
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)
        if current_user.rol == "Usuario": 
            if usuario.rol == "Usuario": 
                if int(jwt_identity) != int(id):
                    return usuario.to_json_short()
                else:
                    return usuario.to_json_complete()
            else:
                return "Permiso denegado.", 403

        elif current_user.rol == "Bibliotecario":
            if usuario.rol == "Admin":
                return "Permiso denegado.", 403
            else:
                return usuario.to_json_complete()

        else:
            return usuario.to_json_complete()
    
    @jwt_required()
    def put(self, id):
        try:
            usuario = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        data = request.get_json().items()
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)
        
        for key, value in data:
            if key == "id" or key == "rol" or key == "reseñas" or key == "prestamos" or key == "notificaciones":
                continue
            if key == "contraseña":
                value = generate_password_hash(value)
            setattr(usuario, key, value)
        
        if (current_user.rol == "Usuario" or current_user.rol == "Bibliotecario") and int(jwt_identity) != int(id):
            return "Permiso denegado.", 403
        else:
            db.session.add(usuario)
            db.session.commit()
            return usuario.to_json(), 201    

    @jwt_required()    
    def delete(self, id):
        try:
            usuario = db.session.query(UsuarioModel).get_or_404(id)
        except:
            return "ID inexistente.", 404

        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)
        if current_user.rol == "Usuario" and int(jwt_identity) != int(id):
            return "Permiso denegado.", 403
        if current_user.rol == "Bibliotecario" and (usuario.rol == "Admin" or usuario.rol == "Bibliotecario"):
            return "Permiso denegado.", 403
        else:
            db.session.delete(usuario)
            db.session.commit()
            return usuario.to_json(), 204
