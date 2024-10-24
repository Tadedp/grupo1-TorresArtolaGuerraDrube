from flask_restful import Resource
from flask import request, jsonify
from main.models import NotificacionModel, UsuarioModel
from .. import db
from main.auth.decorators import role_required
from sqlalchemy import func, desc, asc
from flask_jwt_extended import jwt_required, get_jwt_identity

class Notificaciones(Resource):
    @jwt_required()
    def get(self):
        page = 1
        per_page = 6
        notificaciones = db.session.query(NotificacionModel)
        
        args = ["page", "per_page", "sortby_fecha"]
        
        for key in request.args.keys():
            if key not in args:
                return "URL inexistente.", 404 
        
        jwt_identity = get_jwt_identity()
        notificaciones = notificaciones.join(NotificacionModel.usuarios).filter(UsuarioModel.id == jwt_identity)
        
        if list(request.args.keys()) == []:
            page = 1
        
        if request.args.get('page'):
            try:
                page = int(request.args.get('page'))
            except:
                return "URL inexistente.", 404
        
        if request.args.get('per_page'):
            try:
                per_page = int(request.args.get('per_page'))
            except:
                return "URL inexistente.", 404

        if request.args.get('sortby_fecha'):
            if request.args.get('sortby_fecha') == "asc":
                notificaciones=notificaciones.order_by(asc(NotificacionModel.fecha))
            elif request.args.get('sortby_fecha') == "desc":
                notificaciones=notificaciones.order_by(desc(NotificacionModel.fecha))
            else:
                return "URL inexistente.", 404    
            
        notificaciones = notificaciones.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'notificaciones': [notificacion.to_json() for notificacion in notificaciones],
                  'total': notificaciones.total,
                  'pages': notificaciones.pages,
                  'page': page
                })

    @jwt_required()
    def post(self):
        usuarios_ids = request.get_json().get('usuarios')
        notificacion = NotificacionModel.from_json(request.get_json())
                        
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)     
                        
        if usuarios_ids:
            if current_user.rol == "Bibliotecario":
                usuarios = UsuarioModel.query.filter(UsuarioModel.id.in_(usuarios_ids), UsuarioModel.rol == "Usuario").all()
            else:
                usuarios = UsuarioModel.query.filter(UsuarioModel.id.in_(usuarios_ids)).all()

            if not usuarios:
                return "No se encontraron usuarios válidos.", 400

            notificacion.usuarios.extend(usuarios)
        else:
            return "Formato de datos incorrecto.", 400
        
        try:
            db.session.add(notificacion)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        
        return notificacion.to_json_complete(), 201
        
class Notificacion(Resource):
    @jwt_required()
    def get(self,id): 
        try:
            notificacion = db.session.query(NotificacionModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)        
        
        if current_user.rol == "Usuario" and current_user not in notificacion.usuarios:
            return "Permiso denegado.", 403
        else: 
            return notificacion.to_json_complete()
    
    @jwt_required()
    def delete(self, id):
        try:
            notificacion = db.session.query(NotificacionModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)        
        
        if current_user.rol == "Usuario" and current_user not in notificacion.usuarios:
            return "Permiso denegado.", 403
        else: 
            db.session.delete(notificacion)
            db.session.commit()
            return notificacion.to_json(), 204