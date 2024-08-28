from flask_restful import Resource
from flask import request, jsonify
from main.models import ReseñaModel
from .. import db
from sqlalchemy import func, desc, asc
from flask_jwt_extended import jwt_required

class Reseña(Resource):
    @jwt_required()
    def get(self):   
        page = 1
        per_page = 10
        reseñas = db.session.query(ReseñaModel)
        
        args = ["page", "per_page", "id", "valoracion", "fecha", "id_usuario", "id_libro", "sortby_valoracion", "sortby_fecha"]
        
        for key in request.args.keys():
            if key not in args:
                return "URL inexistente.", 404 
        
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
            reseñas=reseñas.filter(ReseñaModel.id.like("%"+request.args.get('id')+"%"))
                         
        if request.args.get('valoracion'):
            reseñas=reseñas.filter(ReseñaModel.valoracion.like("%"+request.args.get('valoracion')+"%"))
                    
        if request.args.get('fecha'):
            reseñas=reseñas.filter(ReseñaModel.fecha.like("%"+request.args.get('fecha')+"%"))

        if request.args.get('id_usuario'):
            reseñas=reseñas.filter(ReseñaModel.id_usuario.like("%"+request.args.get('id_usuario')+"%"))
                    
        if request.args.get('id_libro'):
            reseñas=reseñas.filter(ReseñaModel.id_libro.like("%"+request.args.get('id_libro')+"%"))
    
        if request.args.get('sortby_valoracion'):
            if request.args.get('sortby_valoracion') == "asc":
                reseñas=reseñas.order_by(asc(ReseñaModel.valoracion))
            elif request.args.get('sortby_valoracion') == "desc":
                reseñas=reseñas.order_by(desc(ReseñaModel.valoracion))
            else:
                return "URL inexistente.", 404
            
        if request.args.get('sortby_fecha'):
            if request.args.get('sortby_fecha') == "asc":
                reseñas=reseñas.order_by(asc(ReseñaModel.fecha))
            elif request.args.get('sortby_fecha') == "desc":
                reseñas=reseñas.order_by(desc(ReseñaModel.fecha))
            else:
                return "URL inexistente.", 404
                
        reseñas = reseñas.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'reseñas': [reseña.to_json() for reseña in reseñas],
                  'total': reseñas.total,
                  'pages': reseñas.pages,
                  'page': page
                })
    
    @jwt_required()
    def post(self):
        reseña = ReseñaModel.from_json(request.get_json())
        try:
            db.session.add(reseña)
            db.session.commit()
        except:
            return "Formato de datos incorrecto.", 400
        return reseña.to_json(), 201
