from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    __tablename__ = "usuarios"
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100), nullable = False)
    apellido = db.Column(db.String(100), nullable = False)
    mail = db.Column(db.String(100), unique=True, index=True, nullable = False)
    dni = db.Column(db.Integer,nullable = False)
    telefono = db.Column(db.Integer,nullable = False)
    rol = db.Column(db.String(100),nullable = False, server_default = "Usuario")
    alias = db.Column(db.String,nullable = False)
    contraseña = db.Column(db.String,nullable = False)
    estado = db.Column(db.String(20),nullable = True)
    reseñas = db.relationship("Reseña", back_populates="usuario",cascade="all, delete-orphan")
    prestamos = db.relationship("Prestamo", back_populates="usuario",cascade="all, delete-orphan")
    
    @property
    def plain_contraseña(self):
        raise AttributeError('La contraseña no puede ser leida.')
    
    @plain_contraseña.setter
    def plain_contraseña(self, contraseña):
        self.contraseña = generate_password_hash(contraseña)
    
    def validar_contraseña(self,contraseña):
        return check_password_hash(self.contraseña, contraseña)

    def __repr__(self):
        return '<Usuario> id:%r, nombre:%r, apellido:%r' % (self.id, self.nombre, self.apellido)

    def to_json(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'mail': str(self.mail),
            'dni': self.dni,
            'telefono': self.telefono,
            'rol': str(self.rol),
            'alias': str(self.alias),
            'estado': str(self.estado)
        }
        return usuario_json

    def to_json_complete(self):
        notificaciones = [notificacion.to_json_complete() for notificacion in self.notificaciones]
        prestamos = [prestamo.to_json_complete() for prestamo in self.prestamos]
        reseñas = [reseña.to_json() for reseña in self.reseñas]
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'mail': str(self.mail),
            'dni': self.dni,
            'telefono': self.telefono,
            'rol': str(self.rol),
            'alias': str(self.alias),
            'estado': str(self.estado),
            'notificaciones':notificaciones,
            'prestamos':prestamos,
            'reseñas':reseñas  
        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'alias': str(self.alias),
            'mail': str(self.mail),
            'estado': str(self.estado)
        }
        return usuario_json

    @staticmethod
    def from_json(usuario_json):
        id = usuario_json.get('id')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        mail = usuario_json.get('mail')
        dni = usuario_json.get('dni')
        telefono = usuario_json.get('telefono')
        rol = usuario_json.get('rol')
        alias = usuario_json.get('alias')
        estado = usuario_json.get('estado')
        contraseña = usuario_json.get('contraseña')
        
        return Usuario(id = id,
                       nombre = nombre,
                       apellido = apellido,
                       mail = mail,
                       dni = dni,
                       telefono = telefono,
                       rol = rol,
                       alias = alias,
                       estado = estado,
                       plain_contraseña = contraseña  
                    )