from main import create_app
import os

#llama a la funcion que retorna la app
app = create_app()
app.app_context().push()

if __name__ == '__main__':
    app.run(debug=True,port=os.getenv('PORT'))

