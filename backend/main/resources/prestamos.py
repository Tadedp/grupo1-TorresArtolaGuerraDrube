from flask_restful import Resource
from flask import Request

PRESTAMOS = {
    1:{"nombre":"Juan", "apellido":"Lopez", "libro":"La vida es bella"},
    2:{"nombre":"Carlos", "apellido":"Gomez", "libro":"Harry Potter"}
}

class Prestamos(Resource):
    # def get(self, id):
    #     if int(id) in PRESTAMOS:
    #         return PRESTAMOS[int(id)]
        
    #     return "No existe el id", 404

    def get(self): #GET: Obtener todos los préstamos 
        return PRESTAMOS

    def post(self): #bien POST: Crear un prestamo
        prestamo = request.get_json()
        id = int(max(PRESTAMOS.keys())) + 1
        PRESTAMOS[id] = prestamo
        return PRESTAMOS[id], 201
            
class Prestamo(Resource):
    # def get(self, id):
    #     if int(id) in PRESTAMOS:
    #         return PRESTAMOS[int(id)]
        
    #     return "No existe el id", 404


    def get(self, id): #GET: Obtener préstamo de libro
        for prestamo_id, prestamo_info in PRESTAMOS.items():
            if prestamo_info.get("id_libro") == int(id):
                return prestamo_info
        return "No existe un préstamo para este libro", 404

    def put(self, id):#PUT: Modificar préstamo 
        if int(id) in PRESTAMOS:
            prestamo = PRESTAMOS[int(id)]
            data = request.get_json()
            PRESTAMOS.update(data)
            return "", 201
        
        return "No existe el id", 404

    # def put(self, id):
    #     if int(id) in PRESTAMOS:
    #         prestamo = PRESTAMOS[int(id_prestamo)]
    #         data = request.get_json()
    #         prestamo.update(data)
    #         return "", 201
    #     return "No existe el préstamo", 404

    def delete(self, id): #DELETE: Eliminar préstamo 
        if int(id) in PRESTAMOS:
            del PRESTAMOS[int(id)]
            return "", 204
        
        return "No existe el id", 404