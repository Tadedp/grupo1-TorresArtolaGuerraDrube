from flask_restful import Resource
from flask import request, jsonify
from main.models import PrestamoModel, LibroModel, UsuarioModel
from .. import db
from sqlalchemy import func, asc, desc
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required, get_jwt_identity

class Prestamos(Resource):
    @jwt_required()
    def get(self):
        page = 1
        per_page = 6
        prestamos = db.session.query(PrestamoModel)
        
        args = ["page", "per_page", "id", "libro_id", "usuario_id", "fecha_inicio", "fecha_fin", "sortby_id", "sortby_libro_titulo", "sortby_usuario_alias", "sortby_fecha_inicio", "sortby_fecha_fin"]
        
        for key in request.args.keys():
            if key not in args:
                return "URL inexistente.", 404 
        
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)        
        
        if current_user.rol == "Usuario":
            prestamos=prestamos.filter(PrestamoModel.id_usuario.like("%"+str(jwt_identity)+"%"))
        
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
        
        if request.args.get('id'):
            prestamos=prestamos.filter(PrestamoModel.id.like("%"+request.args.get('id')+"%"))
            
        if request.args.get('libro_id'):
            prestamos=prestamos.filter(PrestamoModel.id_libro.like("%"+request.args.get('libro_id')+"%"))

        if request.args.get('usuario_id'):
            prestamos=prestamos.filter(PrestamoModel.id_usuario.like("%"+request.args.get('usuario_id')+"%"))
                
        if request.args.get('fecha_inicio'):
            prestamos=prestamos.filter(PrestamoModel.fecha_inicio.like("%"+request.args.get('fecha_inicio')+"%"))
                    
        if request.args.get('fecha_fin'):
            prestamos=prestamos.filter(PrestamoModel.fecha_fin.like("%"+request.args.get('fecha_fin')+"%"))

        if request.args.get('sortby_id'):
            if request.args.get('sortby_id') == "asc":
                prestamos=prestamos.order_by(asc(PrestamoModel.id))
            elif request.args.get('sortby_id') == "desc":
                prestamos=prestamos.order_by(desc(PrestamoModel.id))
            else:
                return "URL inexistente.", 404
            
        if request.args.get('sortby_libro_titulo'):
            if request.args.get('sortby_libro_titulo') == "asc":
                prestamos=prestamos.join(PrestamoModel.libro).order_by(asc(LibroModel.titulo))
            elif request.args.get('sortby_libro_titulo') == "desc":
                prestamos=prestamos.join(PrestamoModel.libro).order_by(desc(LibroModel.titulo))
            else:
                return "URL inexistente.", 404
    
        if request.args.get('sortby_usuario_alias'):
            if request.args.get('sortby_usuario_alias') == "asc":
                prestamos=prestamos.join(PrestamoModel.usuario).order_by(asc(UsuarioModel.alias))
            elif request.args.get('sortby_usuario_alias') == "desc":
                prestamos=prestamos.join(PrestamoModel.usuario).order_by(desc(UsuarioModel.alias))
            else:
                return "URL inexistente.", 404

        if request.args.get('sortby_fecha_inicio'):
            if request.args.get('sortby_fecha_inicio') == "asc":
                prestamos=prestamos.order_by(asc(PrestamoModel.fecha_inicio))
            elif request.args.get('sortby_fecha_inicio') == "desc":
                prestamos=prestamos.order_by(desc(PrestamoModel.fecha_inicio))
            else:
                return "URL inexistente.", 404
                
        if request.args.get('sortby_fecha_fin'):
            if request.args.get('sortby_fecha_fin') == "asc":
                prestamos=prestamos.order_by(asc(PrestamoModel.fecha_fin))
            elif request.args.get('sortby_fecha_fin') == "desc":
                prestamos=prestamos.order_by(desc(PrestamoModel.fecha_fin))
            else:
                return "URL inexistente.", 404
            
        prestamos = prestamos.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'prestamos': [prestamo.to_json_complete() for prestamo in prestamos],
                'total': prestamos.total,
                'pages': prestamos.pages,
                'page': page
                })
    
    @role_required(roles = ["Admin", "Bibliotecario"])    
    def post(self):
        prestamo = PrestamoModel.from_json(request.get_json())
        try:
            db.session.add(prestamo)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        return prestamo.to_json(), 201 
            
class Prestamo(Resource):
    @jwt_required()
    def get(self, id):
        try:
            prestamos = db.session.query(PrestamoModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)    
            
        if current_user.rol == "Usuario" and current_user.id != prestamos.id_usuario:
            return "Permiso denegado.", 403
        else: 
            return prestamos.to_json_complete()
    
    @role_required(roles = ["Admin", "Bibliotecario"])
    def put(self, id):
        try:
            prestamo = db.session.query(PrestamoModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        
        data = PrestamoModel.from_json_attr(request.get_json())
        
        for key, value in data.items():
            if key == "id" or key == "usuario" or key == "libro":
                continue
            setattr(prestamo, key, value)
        
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201
    
    @role_required(roles = ["Admin", "Bibliotecario"])
    def delete(self, id):
        try:
            prestamo = db.session.query(PrestamoModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        db.session.delete(prestamo)
        db.session.commit()
        return "", 204