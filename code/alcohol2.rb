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


    nombre  = s.cell(line, 3).to_s
    rut     = s.cell(line, 2).to_s
    ruts = rut.split("-")


    p ruts[0].to_i
    r = Representante.where(:rut=> ruts[0].to_i).first()
    local = Local.where(:rol => rol).first()
    if ( r == nil )
      representante = Representante.new()
      representante.rut = ruts[0].to_i
      representante.dv  = ruts[1]
      representante.save()
      r= representante;
    end

    local.representante = r

    local.save()

  end



end