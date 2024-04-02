from flask_restful import Resource
from flask import request

PRESTAMOS = {
    1:{"nombre":"Juan", "apellido":"Lopez", "libro":"La vida es bella"},
    2:{"nombre":"Carlos", "apellido":"Gomez", "libro":"Harry Potter"}
}

class Prestamos(Resource):
    def get(self): #GET: Obtener todos los préstamos 
        return PRESTAMOS, 200

    def post(self): #bien POST: Crear un prestamo
        prestamo = request.get_json()
        id = int(max(PRESTAMOS.keys())) + 1
        PRESTAMOS[id] = prestamo
        return PRESTAMOS[id], 201
            
class Prestamo(Resource):
    def get(self, id):
        if int(id) in PRESTAMOS:
            return PRESTAMOS[int(id)], 200
        
        return "No existe el id", 404

    def put(self, id):#PUT: Modificar préstamo 
        if int(id) in PRESTAMOS:
            prestamo = PRESTAMOS[int(id)]
            data = request.get_json()
            prestamo.update(data)
            return "El prestamo se edito correctamente", 201
        
        return "No existe el id", 404

    def delete(self, id): #DELETE: Eliminar préstamo 
        if int(id) in PRESTAMOS:
            del PRESTAMOS[int(id)]
            return "El prestamo se ha elminado correctamente", 200
        
        return "No existe el id", 404