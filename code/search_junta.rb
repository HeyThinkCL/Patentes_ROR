
Local.where("ubicacion is not null and error = 'f' ").all.each do |local|



sql = "select juntas_vecinos.id as junta,locales.id

 from locales,juntas_vecinos

where

st_within(locales.ubicacion::geometry,juntas_vecinos.area ::geometry) = 't'

and locales.id = #{local.id} limit 1
"
begin
dentro = ActiveRecord::Base.connection.execute(sql).first()['junta']


  p dentro

local.juntas_vecinos_id = dentro
local.save

rescue
end

end
