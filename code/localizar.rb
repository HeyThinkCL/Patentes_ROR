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
GEO_FACTORY = RGeo::Geographic.spherical_factory(srid: 4326)


locales =Local.where(:ubicacion => nil,:error => false).all()

locales.each{|local|

  p local.id

  direccion = local.direccion
  p direccion
  direccion=  fin(direccion)<< ", Ñuñoa"
  p direccion
  results = gmaps.geocode(direccion)

  begin

      local.ubicacion = GEO_FACTORY.point(results[0][:geometry][:location][:lat],results[0][:geometry][:location][:lng])

  rescue
      local.error = true
  end
  local.save


}