module Ubicacion

  extend ActiveSupport::Concern

  # Retorna true si las coordenadas se encuentran dentro de la comuna seleccionada.
  def inComuna(lng,lat,comuna)
    ubicacion(lng,lat)
    sql = "SELECT st_within((SELECT ST_SetSRID(ST_MakePoint(#{lng},#{lat}),4326)),(SELECT ST_GeomFromText(st_astext(area),4326) FROM comunas where id = #{comuna.id}));"
    inside = ActiveRecord::Base.connection.execute(sql).first()['st_within']

    if inside
      return true
    else
      return false
    end
  end

  def ubicacion(lng,lat)
    sql = "SELECT ST_SetSRID(ST_MakePoint(#{lng},#{lat}),4326)"
    @ubicacion = ActiveRecord::Base.connection.execute(sql).first()['st_setsrid']
  end

  def inJunta(local)
    sql = "SELECT juntas_vecinos.id FROM locales, juntas_vecinos where st_within(locales.ubicacion::geometry,juntas_vecinos.area::geometry) = 't' AND locales.id = #{local.id};"
    juntaVecinos = ActiveRecord::Base.connection.execute(sql).first()
    if juntaVecinos != nil
      return juntaVecinos['id']
    else
      return nil
    end
  end
end
