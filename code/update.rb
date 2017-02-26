locales =Local.where("direccion like '%19 DE ABRIL%'").all()
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


p "aca"

gmaps = GoogleMapsService::Client.new(key: 'AIzaSyC4ov_3nLteN23j0ksd7ZzP1hb8W6Q0nmA')
#gmaps = GoogleMapsService::Client.new(key: 'AIzaSyBJuv-jjU4NIZOJZUcCghmvJTJe6WzJ49w')

GEO_FACTORY = RGeo::Geographic.spherical_factory(srid: 4326)
locales.each { |local|


  direccion = local.direccion

  direccion = direccion.gsub("19 DE ABRIL","DIECINUEVE DE ABRIL")

  direccion=  fin(direccion)<< ", Ñuñoa"

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




}
p "fin"