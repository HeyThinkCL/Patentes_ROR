class LocalesController <  ApplicationController
  skip_before_action :verify_authenticity_token


  def get_data(latitud,longitud,giro,rut)


    sql = "SELECT  id,numero,nombre,st_astext(area) as area from juntas_vecinos where ST_Within(ST_GeomFromText('POINT(#{longitud} #{latitud})', 4326),area::geometry) = 't' "
    r = ActiveRecord::Base.connection.execute(sql).first()

    sql = "SELECT st_astext(ubicacion) as ubicacion, floor(ST_distancesphere(ST_GeomFromText('POINT(#{longitud} #{latitud})', 4326),ubicacion::geometry))  as distancia from locales  where juntas_vecinos_id = #{r['id']} and giro = '#{giro}'  and patentes_id = 1 order by  distancia asc"
    mismas = ActiveRecord::Base.connection.execute(sql)
    sql = "SELECT st_astext(ubicacion) as ubicacion, floor(ST_distancesphere(ST_GeomFromText('POINT(#{longitud} #{latitud})', 4326),ubicacion::geometry))  as distancia from locales  where juntas_vecinos_id = #{r['id']} and  patentes_id = 1 order by  distancia asc "
    patente = ActiveRecord::Base.connection.execute(sql)


    sql = "SELECT  count(*) as cantidad from locales where juntas_vecinos_id = #{r['id']} and patentes_id = 1"
    cantidad_patente = ActiveRecord::Base.connection.execute(sql).first()['cantidad']

    sql = "SELECT  count(*) as cantidad from locales where juntas_vecinos_id = #{r['id']} and giro = '#{giro}' and patentes_id = 1"
    cantidad_giro = ActiveRecord::Base.connection.execute(sql).first()['cantidad']

    representante = Representante.where(:rut=>rut).first()

    if (representante)

    sql = "SELECT  count(*) as cantidad from locales where representantes_id = #{representante.id} and patentes_id =1 "
    cantidad_rut_patente  = ActiveRecord::Base.connection.execute(sql).first()['cantidad']

    sql = "SELECT  count(*) as cantidad from locales where representantes_id = #{representante.id} and giro = '#{giro}'"
    cantidad_rut_giro  = ActiveRecord::Base.connection.execute(sql).first()['cantidad']

    else
      cantidad_rut_patente=cantidad_rut_giro=0
    end



    mapa = {'lat':latitud,'lng':longitud}

    return {'cantidad_rut_giro':cantidad_rut_giro,'cantidad_rut_patente':cantidad_rut_patente,'mapa':mapa,'cantidad_giro':cantidad_giro,'juntas_vecinos':r,'giro':mismas,'patente':patente,'cantidad_patente':cantidad_patente}

  end

  def new

    render component:'Geolocation',  props: { patentes:Patente.order("nombre asc").all(),'Comuna':Comuna.first(),'giros':Local.select("giro,patentes_id").group("giro,patentes_id").order("giro asc").all()}
  end
  def create

    render json:get_data(params[:lat],params[:lng],params[:giro],params[:rut].split("-")[0])

  end

  def show
    solicitud=Solicitud.find(params[:id])
    @props ={'resultados': get_data(solicitud.ubicacion.y,solicitud.ubicacion.x,solicitud.giro,solicitud.representante.rut)}
  end

  def index


  end


  def guardar


    local = Solicitud.new()
    local.rol = params[:rol]
    local.direccion=params[:direccion].split(",")[0]
    local.ubicacion="POINT (#{params[:lng]} #{params[:lat]})"
    local.casa= params[:casa]
    local.local         = params[:local]
    local.oficina       = params[:oficina]
    local.codigo_sii    = params[:codigo_sii]
    local.departamento  = params[:departamento]
    local.rol_propiedad = params[:rol_propiedad]
    local.monto = params[:monto]
    local.deuda = params[:deuda]

    representante = Representante.find_or_create_by(:rut=>params[:rut])
    representante.nombre = params[:nombre]
    representante.apellido = params[:apellido]
    representante.celular = params[:celular]
    representante.telefono = params[:telefono]
    representante.email = params[:email]
    representante.rut = params[:rut]
    representante.nombre_social = params[:nombre_social]
    local.giro = params[:giro]
    representante.save()
    local.representantes_id=representante.id
    local.patentes_id = 1
    local.save

    render json:{'id':local.id}
  end
end
