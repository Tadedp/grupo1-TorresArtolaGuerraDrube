from flask_restful import Resource
from flask import request

LIBROS = {
    1: {"titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico"},
    2: {"titulo": "1984", "autor": "George Orwell", "genero": "Distopía"},
    3: {"titulo": "El señor de los anillos", "autor": "J.R.R. Tolkien", "genero": "Fantasía"},
    4: {"titulo": "Harry Potter y la piedra filosofal", "autor": "J.K. Rowling", "genero": "Fantasía"},
    5: {"titulo": "Matar un ruiseñor", "autor": "Harper Lee", "genero": "Ficción"},
    6: {"titulo": "Don Quijote de la Mancha", "autor": "Miguel de Cervantes", "genero": "Novela de caballerías"},
    7: {"titulo": "Orgullo y prejuicio", "autor": "Jane Austen", "genero": "Romance"},
    8: {"titulo": "Crimen y castigo", "autor": "Fyodor Dostoevsky", "genero": "Ficción psicológica"},
    9: {"titulo": "Las aventuras de Sherlock Holmes", "autor": "Arthur Conan Doyle", "genero": "Misterio"},
    10: {"titulo": "El retrato de Dorian Gray", "autor": "Oscar Wilde", "genero": "Gótico"},
    11: {"titulo": "La metamorfosis", "autor": "Franz Kafka", "genero": "Absurdo"},
    12: {"titulo": "Moby Dick", "autor": "Herman Melville", "genero": "Aventura"},
    13: {"titulo": "El gran Gatsby", "autor": "F. Scott Fitzgerald", "genero": "Ficción"},
    14: {"titulo": "Anna Karenina", "autor": "Leo Tolstoy", "genero": "Romance"},
    15: {"titulo": "Drácula", "autor": "Bram Stoker", "genero": "Gótico"},
    16: {"titulo": "El alquimista", "autor": "Paulo Coelho", "genero": "Ficción inspiracional"},
    17: {"titulo": "Los miserables", "autor": "Victor Hugo", "genero": "Novela histórica"},
    18: {"titulo": "La odisea", "autor": "Homero", "genero": "Epopeya"},
    19: {"titulo": "Hamlet", "autor": "William Shakespeare", "genero": "Tragedia"},
    20: {"titulo": "El nombre del viento", "autor": "Patrick Rothfuss", "genero": "Fantasía épica"}
}

class Libro (Resource):
    def get(self,id):  #obtener libro
        if int(id) in LIBROS:
            return LIBROS[int(id)]
        return "El libro ingresado no existe", 404
    
    def delete(self, id):  #borrar libro
        if int(id) in LIBROS:
            del LIBROS [int(id)]
            return "El libro se ha eliminado correctamente", 204
        return "El libro ingresado no existe", 404
    
    def put(self, id):  #editar libro
        if int(id) in LIBROS:
            libro = LIBROS[int(id)]
            data = request.get_json()
            libro.update(data)
            return "El libro se edito correctamente", 201
        return "El libro ingresado no existe", 404
    
class Libros(Resource):
    def get(self): #obtener una lista de libros
        return LIBROS
    
    def post(self):  #agregar un libro
        libro = request.get_json()
        id = int(max(LIBROS.keys()))+1
        LIBROS[id] = libro
        return LIBROS[id], 201

