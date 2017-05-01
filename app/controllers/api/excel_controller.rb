class Api::ExcelController < ApplicationController

  skip_before_action :verify_authenticity_token

  def show
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


    if params['aldia'].to_s == 'true'

      if params['compromiso'].to_s == 'true' and params['deudor'].to_s == 'false'
        sql = sql<<" and deudor = 'f'"

      elsif params['deudor'].to_s == 'false' and params['compromiso'].to_s == 'false'
        sql = sql<<" and deudor = 'f' and deuda = 0 "

      elsif params['deudor'].to_s == 'false'
        sql = sql<<" and deudor = 'f' and deuda = 0 "
      end


    elsif params['deudor'].to_s == 'true'

      if params['compromiso'].to_s == 'true'
        sql = sql<<" and deuda > 0"

      else
        sql = sql<<" and ( deudor = 't')"
      end

    elsif  params['compromiso'].to_s == 'true'
      sql = sql<<" and deudor = 'f' and deuda > 0 "
    end



    sql = "SELECT locales.id,rol,nombre_social,direccion,giro,rut,st_astext(ubicacion) as ubicacion,dv,pago,deuda,deudor,futuro_pago  FROM locales,representantes where representantes_id=representantes.id and "<<sql<<" order by locales.ubicacion asc"
    p sql
    @datas=  ActiveRecord::Base.connection.execute(sql)


    respond_to do |format|
      format.xlsx
    end



=begin
    wb = xlsx_package.workbook
    wb.add_worksheet(name: "Locales") do |sheet|
      sheet.add_row ["id","rol","rol","nombre_social","direccion","giro","rut","dv","pago","deuda","deudor","futuro_pago"]
      data.each do |local|
        sheet.add_row [local.id,local.rol,local.nombre_social,local.direccion,local.giro,local.rut,local.dv,local.pago,local.deuda,local.deudor,local.futuro_pago]
end

      end


    return wb
=end
  end
end

