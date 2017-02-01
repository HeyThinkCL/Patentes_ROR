require 'pg'
con = PG.connect :dbname => 'pnunoabk', :user => 'postgres'
comunas  = con.exec "select * from comunas;"
comunas.each { |comuna|

  comuna_new = Comuna.new()
  comuna_new.nombre =comuna['nombre']
  comuna_new.area =comuna['area']
  comuna_new.ubicacion =comuna['ubicacion']
  comuna_new.save()

}
