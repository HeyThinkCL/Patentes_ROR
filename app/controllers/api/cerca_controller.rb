class Api::CercaController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create

    sql = "SELECT locales.id,rol,nombre_social,direccion,giro,rut,st_astext(ubicacion) as ubicacion,dv,pago,deuda  FROM locales,representantes where representantes_id=representantes.id and st_distancesphere(ubicacion::geometry,st_makepoint(#{params[:lng]},#{params[:lat]})) <= 500 "
    render json:ActiveRecord::Base.connection.execute(sql)

  end
end
