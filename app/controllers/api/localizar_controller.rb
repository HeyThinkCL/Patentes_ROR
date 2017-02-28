class Api::LocalizarController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    sql = "locales.ubicacion is not null and error='f' and locales.representantes_id=representantes.id "
    rol = params[:rol].to_s()

    if rol != "" and  rol.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
      sql = sql<<"and locales.rol = '#{params[:rol]}' "

    end
    rut = params[:rut].split("-")[0].to_s
    if rut != "" and rut.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
      sql = sql<<"and representantes.rut = '#{rut}' "
    end
    if params[:direccion].to_s != ""
      sql = sql<<"and direccion like '%#{params[:direccion].upcase()}%' "
    end
    if params[:nombre_social].to_s != ""
      sql = sql<<"and representantes.nombre_social like '%#{params[:nombre_social].upcase()}%' "
    end
    begin

    giros=[]

    p  params[:giro][0]
    params[:giro].each { |giro|

      giros.push("locales.giro = '#{giro}'")

    }


    giros= giros.join(" or ")
    if params[:giro].length

      sql = sql<<"and (#{giros}) "
    end

    rescue
    end

    begin

    juntas=[]

    params[:junta_vecinos].each { |x_id|

      junta = JuntaVecinos.where(:numero=>x_id.split("-")[0].gsub(" ","")).first()

      juntas.push("juntas_vecinos_id = #{junta.id}")
       }

    juntas=juntas.join(" or ")
    if (params[:junta_vecinos].length)

      sql = sql<<"and (#{juntas})"

    end



  rescue
  end



    sql = "SELECT locales.id,rol,nombre_social,direccion,giro,rut,st_astext(ubicacion) as ubicacion,dv,pago,deuda  FROM locales,representantes where representantes_id=representantes.id and "<<sql<<" order by locales.ubicacion asc"
    p sql
    render json:ActiveRecord::Base.connection.execute(sql)
    # render json:Local.joins(",representantes").where(sql).all(), include:[:representante]
  end
end
