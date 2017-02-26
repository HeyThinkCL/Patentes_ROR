
locales = Local.where("ubicacion is not null and juntas_vecinos_id is null ").all()



locales.each do |local|
  sql = "SELECT  id from juntas_vecinos where ST_Within(ST_GeomFromText('POINT(#{local.ubicacion.x} #{local.ubicacion.y})', 4326),ST_Buffer(area::geometry,0.00001)) = 't' "
  r = ActiveRecord::Base.connection.execute(sql).first()
  local.juntas_vecinos_id = r['id']
  local.save

end
