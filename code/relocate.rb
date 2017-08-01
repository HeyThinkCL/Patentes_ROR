require 'google_maps_service'
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


locales = Local.joins([",comunas"]).where("ST_Within(ST_GeomFromText(st_astext(locales.ubicacion), 4326),ST_GeomFromText(st_astext(ST_Buffer(comunas.area,10)) , 4326) ) ='f'").all()
#locales =Local.where(:ubicacion => nil,:error => false).all()


locales.each{|local|

  direccion = local.direccion
  direccion=  fin(direccion)<< ", Ñuñoa"
  results = gmaps.geocode(direccion)
  results.each { |result|
    sql = "SELECT  ST_Within(ST_GeomFromText('POINT(#{result[:geometry][:location][:lng]} #{result[:geometry][:location][:lat]})', 4326),ST_GeomFromText(st_astext(area), 4326)) as dentro FROM comunas"
    dentro = ActiveRecord::Base.connection.execute(sql).first()['dentro']
    if dentro

      # local.ubicacion = GEO_FACTORY.point(result[:geometry][:location][:lat],result[:geometry][:location][:lng])
      # local.save
      # p "adentro update"

    else
      local.error =true
      local.save

    end
  }
}