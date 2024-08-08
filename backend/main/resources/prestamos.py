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
        per_page = 10
        prestamos = db.session.query(PrestamoModel)
        
        jwt_identity = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get_or_404(jwt_identity)        
        if current_user.rol == "Usuario":
            prestamos=prestamos.filter(PrestamoModel.id_usuario.like("%"+str(jwt_identity)+"%"))
        
        else:    
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
                prestamos=prestamos.filter(PrestamoModel.id.like("%"+request.args.get('id')+"%"))
                    
            elif request.args.get('fecha_inicio'):
                prestamos=prestamos.filter(PrestamoModel.fecha_inicio.like("%"+request.args.get('fecha_inicio')+"%"))
                        
            elif request.args.get('fecha_fin'):
                prestamos=prestamos.filter(PrestamoModel.fecha_fin.like("%"+request.args.get('fecha_fin')+"%"))
                        
            elif request.args.get('id_usuario'):
                prestamos=prestamos.filter(PrestamoModel.id_usuario.like("%"+request.args.get('id_usuario')+"%"))

            elif request.args.get('sortby_fecha_inicio'):
                if request.args.get('sortby_fecha_inicio') == "asc":
                    prestamos=prestamos.order_by(asc(PrestamoModel.fecha_inicio))
                elif request.args.get('sortby_fecha_inicio') == "desc":
                    prestamos=prestamos.order_by(desc(PrestamoModel.fecha_inicio))
                else:
                    return "URL inexistente.", 404
                    
            elif request.args.get('sortby_fecha_fin'):
                if request.args.get('sortby_fecha_fin') == "asc":
                    prestamos=prestamos.order_by(asc(PrestamoModel.fecha_fin))
                elif request.args.get('sortby_fecha_fin') == "desc":
                    prestamos=prestamos.order_by(desc(PrestamoModel.fecha_fin))
                else:
                    return "URL inexistente.", 404
                
            elif request.args.get('sortby_nrLibros'):
                if request.args.get('sortby_nrLibros') == "asc":
                    prestamos=prestamos.outerjoin(PrestamoModel.libros).group_by(PrestamoModel.id).order_by(func.count(LibroModel.id).asc())
                elif request.args.get('sortby_nrLibros') == "desc":
                    prestamos=prestamos.outerjoin(PrestamoModel.libros).group_by(PrestamoModel.id).order_by(func.count(LibroModel.id).desc())
                else:
                    return "URL inexistente.", 404
            
            else:
                return "URL inexistente.", 404              

        prestamos = prestamos.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'prestamos': [prestamo.to_json() for prestamo in prestamos],
                'total': prestamos.total,
                'pages': prestamos.pages,
                'page': page
                })
    
    @role_required(roles = ["Admin", "Bibliotecario"])    
    def post(self):
        libros_ids = request.get_json().get('libros')
        prestamo = PrestamoModel.from_json(request.get_json())
        
        if libros_ids:
            libros = LibroModel.query.filter(LibroModel.id.in_(libros_ids)).all()
            prestamo.libros.extend(libros)
        else:
            return "Formato de datos incorrecto.", 400
        
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
        data = PrestamoModel.from_json_attr(request.get_json()).items()
        for key, value in data:
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