from flask_restful import Resource
from flask import request, jsonify
from main.models import AutorModel, LibroModel
from .. import db
from sqlalchemy import func, desc, asc


class Autores(Resource):
    def get(self):
        page = 1
        per_page = 10
        autores = db.session.query(AutorModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))


        if request.args.get('nombre'):
            autores=autores.filter(AutorModel.nombre.like("%"+request.args.get('nombre')+"%"))
                    
        if request.args.get('apellido'):
            autores=autores.filter(AutorModel.apellido.like("%"+request.args.get('apellido')+"%"))
                    
        if request.args.get('id'):
            autores=autores.filter(AutorModel.id.like("%"+request.args.get('id')+"%"))
                                                
        if request.args.get('sortby_apellido'):
            if request.args.get('sortby_apellido') == "asc":
                autores=autores.order_by(asc(AutorModel.apellido))
            if request.args.get('sortby_apellido') == "desc":
                autores=autores.order_by(desc(AutorModel.apellido))
        
        if request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre') == "asc":
                autores=autores.order_by(asc(AutorModel.nombre))
            if request.args.get('sortby_nombre') == "desc":
                autores=autores.order_by(desc(AutorModel.nombre))
                
        if request.args.get('sortby_cantLibros'):
            if request.args.get('sortby_cantLibros') == "asc":
                autores=autores.outerjoin(AutorModel.libros).group_by(AutorModel.id).order_by(func.count(LibroModel.id).asc())
            if request.args.get('sortby_cantLibros') == "desc":
                autores=autores.outerjoin(AutorModel.libros).group_by(AutorModel.id).order_by(func.count(LibroModel.id).desc())
                
        autores = autores.paginate(page=page, per_page=per_page, error_out=True)
    
        return jsonify({'autores': [usuario.to_json() for usuario in autores],
                  'total': autores.total,
                  'pages': autores.pages,
                  'page': page
                })
  
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