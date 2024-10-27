from flask_restful import Resource
from flask import request, jsonify
from main.models import AutorModel, LibroModel
from .. import db
from sqlalchemy import func, desc, asc
from main.auth.decorators import role_required

class Autores(Resource):
    def get(self):
        page = 1
        per_page = 10
        autores = db.session.query(AutorModel)       

        args = ["page", "per_page", "id", "nombre", "apellido", "sortby_apellido", "sortby_nombre", "sortby_nrLibros"]
        
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
            autores=autores.filter(AutorModel.id.like("%"+request.args.get('id')+"%"))
                                                    
        if request.args.get('nombre'):
            autores=autores.filter(AutorModel.nombre.like("%"+request.args.get('nombre')+"%"))
                 
        if request.args.get('apellido'):
            autores=autores.filter(AutorModel.apellido.like("%"+request.args.get('apellido')+"%"))
                   
        if request.args.get('sortby_apellido'):
            if request.args.get('sortby_apellido') == "asc":
                autores=autores.order_by(asc(AutorModel.apellido))
            elif request.args.get('sortby_apellido') == "desc":
                autores=autores.order_by(desc(AutorModel.apellido))
            else:
                return "URL inexistente.", 404
            
        if request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre') == "asc":
                autores=autores.order_by(asc(AutorModel.nombre))
            elif request.args.get('sortby_nombre') == "desc":
                autores=autores.order_by(desc(AutorModel.nombre))
            else:
                return "URL inexistente.", 404
                  
        if request.args.get('sortby_nrLibros'):
            if request.args.get('sortby_nrLibros') == "asc":
                autores=autores.outerjoin(AutorModel.libros).group_by(AutorModel.id).order_by(func.count(LibroModel.id).asc())
            elif request.args.get('sortby_nrLibros') == "desc":
                autores=autores.outerjoin(AutorModel.libros).group_by(AutorModel.id).order_by(func.count(LibroModel.id).desc())       
            else:
                return "URL inexistente.", 404
         
        autores = autores.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'autores': [autor.to_json() for autor in autores],
                  'total': autores.total,
                  'pages': autores.pages,
                  'page': page
                })

    @role_required(roles = ["Admin", "Bibliotecario"])
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

    @role_required(roles = ["Admin", "Bibliotecario"])
    def put(self,id):
        try:
            autor = db.session.query(AutorModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        
        data = request.get_json().items()
        
        for key, value in data:
            if key == "id" or key == "libros":
                continue
            setattr(autor, key, value)
        
        db.session.add(autor)
        db.session.commit()
        return autor.to_json_complete() , 201

    @role_required(roles = ["Admin", "Bibliotecario"])
    def delete(self,id):
        try:
            autor = db.session.query(AutorModel).get_or_404(id)
        except:
            return "ID inexistente.", 404
        db.session.delete(autor)
        db.session.commit()
        return autor.to_json(), 204