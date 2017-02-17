class LocalesController <  ApplicationController
  skip_before_action :verify_authenticity_token

  def new

    render component:'Geolocation',  props: { patentes:Patente.order("nombre asc").all()}
  end
  def create


    p params


    local = Local.new()
    local.rol = params[:rol]
    local.direccion=params[:direccion].split(",")[0]
    local.ubicacion="POINT (#{params[:lng]} #{params[:lat]})"

    representante = Representante.new()
    representante.nombre = params[:nombre]
    representante.apellido = params[:apellido]
    representante.celular = params[:celular]
    representante.telefono = params[:telefono]
    representante.email = params[:email]
    representante.rut = params[:rut]
    representante.nombre_social = params[:nombre_social]
    representante.giro = params[:giro]
    representante.save()
    local.representante=representante
    local.save

    render json:local



  end
end
