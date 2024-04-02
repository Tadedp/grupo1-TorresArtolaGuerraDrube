from main import create_app
import os

<<<<<<< HEAD
#llama a la funcion que retorna la app
app = create_app()
=======
app = create_app()

>>>>>>> e47d859 (Resolución TP2.)
app.app_context().push()

if __name__ == '__main__':
    app.run(debug=True,port=os.getenv('PORT'))