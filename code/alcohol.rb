require "simple-spreadsheet"
class String
  def is_integer?
    self.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
  end
end

def fin(direccion)
  dx=direccion.split(" ")
  dire=[]
  ix = 0
  dx.each {|x|

    dire.push(x)

    if ix+1 == dx.length
      return dire.join(' ')
    else

      j=  dx[ix+1]
      if x.is_integer? and j.is_integer?
        dire.push(j)
        return dire.join(' ')
      elsif x.is_integer?
        return dire.join(' ')
      end
    end

    ix = ix +1

  }
end


gmaps = GoogleMapsService::Client.new(key: 'AIzaSyC4ov_3nLteN23j0ksd7ZzP1hb8W6Q0nmA')
#gmaps = GoogleMapsService::Client.new(key: 'AIzaSyBJuv-jjU4NIZOJZUcCghmvJTJe6WzJ49w')
GEO_FACTORY = RGeo::Geographic.spherical_factory(srid: 4326)

s = SimpleSpreadsheet::Workbook.read("code/alcohol.xls")
s.selected_sheet = s.sheets.first

ixx =0
s.first_row.upto(s.last_row) do |line|
  rol = s.cell(line, 1).to_i
  if (rol!=0)


    nombre  = s.cell(line, 2).to_s
    direccion = s.cell(line, 4).to_s.gsub("  "," ").gsub("        ","").gsub("   "," ").gsub("ALCALDE EDUARDO CASTILLO V","EDUARDO CASTILLO VELASCO")
    rol_prop = s.cell(line, 5).to_s
    giro = s.cell(line, 6).to_s
    tipo = s.cell(line, 7).to_s

    local = Local.new()
    local.direccion = direccion

    direccion=  fin(direccion)<< ", Ñuñoa"
    p direccion


    local.rol = rol
    #local.nombre = nombre

    local.rol_propiedad = rol_prop
    local.giro = giro

    if (false)
    results = gmaps.geocode(direccion)
    results.each { |result|
      sql = "SELECT  ST_Within(ST_GeomFromText('POINT(#{result[:geometry][:location][:lng]} #{result[:geometry][:location][:lat]})', 4326),ST_GeomFromText(st_astext(area), 4326)) as dentro FROM comunas"
      dentro = ActiveRecord::Base.connection.execute(sql).first()['dentro']
      if dentro

        local.ubicacion = GEO_FACTORY.point(result[:geometry][:location][:lng],result[:geometry][:location][:lat])
        local.numero = result[:address_components][0][:long_name]
        local.calle  = result[:address_components][1][:long_name]

        local.comunas_id = 1
        sql = "SELECT  id from juntas_vecinos where ST_Within(ST_GeomFromText('POINT(#{result[:geometry][:location][:lng]} #{result[:geometry][:location][:lat]})', 4326),area::geometry) = 't' "
        p sql

        r = ActiveRecord::Base.connection.execute(sql).first()

        if (r)

          local.juntas_vecinos_id = r['id']
        else

          sql = "SELECT  id from juntas_vecinos where ST_Within(ST_GeomFromText('POINT(#{result[:geometry][:location][:lng]} #{result[:geometry][:location][:lat]})', 4326),ST_Buffer(area::geometry,0.00001)) = 't' "
          r = ActiveRecord::Base.connection.execute(sql).first()
          local.juntas_vecinos_id = r['id']

        end


        local.juntas_vecinos_id = r
        local.save

        p "adentro update"
        break



      else
        local.error =true
        local.save

      end


    }

    else
      c =Local.where(:rol=> rol).first()
      if(c== nil )
        local.save

      end

    end


  else


  end



end