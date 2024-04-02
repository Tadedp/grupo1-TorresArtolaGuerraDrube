from flask_restful import Resource
from flask import request

#La ID de OPINIONES se corresponde con la de LIBROS.
OPINIONES = {
    1:{"valoraciones": [5], "comentarios": [{"usuario":"Tadeo", "comentario":"Excelente."}]},
    2:{"valoraciones": [2, 3], "comentarios": [{"usuario":"Celina", "comentario":"???"}, {"usuario":"Victoria", "comentario":"Medio aburrido"}]}
}

class Valoracion(Resource):
    def get(self, id):
        if int(id) in OPINIONES:
            valoracion = 0
            
            cantidad_valoraciones = len(OPINIONES[int(id)]["valoraciones"]) 
            if cantidad_valoraciones == 0:
                return 0, 200
            
            for i in range(cantidad_valoraciones):
                valoracion +=  OPINIONES[int(id)]["valoraciones"][i]
            return valoracion / cantidad_valoraciones, 200
        
        return "No existe el id", 404

    def post(self, id):
        if int(id) in OPINIONES:
            try:
                valoracion = float(request.get_json())
                if valoracion > 5 or valoracion < 0:
                    raise Exception
            except Exception:
                return "La valoración debe ser un número entre 0 y 5.", 400
            
            OPINIONES[int(id)]["valoraciones"].append(valoracion)
            return OPINIONES[int(id)]["valoraciones"], 201
        return "No existe el id", 404
    
class Comentario(Resource):
    def get(self, id):
        if int(id) in OPINIONES:
            return OPINIONES[int(id)]["comentarios"]
        return "No existe el id", 404

    def post(self, id):
        if int(id) in OPINIONES:
            comentario = request.get_json()
            OPINIONES[int(id)]["comentarios"].append(comentario)
            return OPINIONES[int(id)]["comentarios"], 201
        return "No existe el id", 404