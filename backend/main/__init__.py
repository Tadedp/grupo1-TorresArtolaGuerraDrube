from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import os
from flask_sqlalchemy import SQLAlchemy

api = Api()
db = SQLAlchemy()

import main.resources as resources

def create_app():
    app = Flask(__name__)
    load_dotenv()

    if not os.path.exists(os.getenv("DATABASE_PATH")+os.getenv("DATABASE_NAME")):
        os.mknod(os.getenv("DATABASE_PATH")+os.getenv("DATABASE_NAME")) 

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    api.add_resource(resources.LibrosResource, "/libros")
    api.add_resource(resources.LibroResource, "/libro/<id>")
    api.add_resource(resources.ReseñaResource, "/reseña")
    api.add_resource(resources.UsuariosResource, "/usuarios")
    api.add_resource(resources.UsuarioResource, "/usuario/<id>")
    api.add_resource(resources.Sign_inResource, "/sign_in")
    api.add_resource(resources.LoginResource, "/login")
    api.add_resource(resources.ConfiguracionResource, "/configuracion/<id>")
    api.add_resource(resources.NotificacionResource, "/notificacion")
    api.add_resource(resources.PrestamosResource, "/prestamos")
    api.add_resource(resources.PrestamoResource, "/prestamo/<id>")    
    api.add_resource(resources.AutoresResource, "/autores")
    api.add_resource(resources.AutorResource, "/autor/<id>")    
    
    api.init_app(app)
    
    return app
