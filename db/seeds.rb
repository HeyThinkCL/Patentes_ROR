# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'pg'
con = PG.connect :dbname => 'pnunoabk', :user => 'postgres'
representantes = con.exec "select rut,dv,nombre_social,count(*) as c from locales group by rut,dv,nombre_social order by c desc;"
representantes.each { |representante|

  representante_new = Representante.new
  representante_new.rut = representante['rut']
  representante_new.dv  = representante['dv']
  representante_new.nombre_social = representante['nombre_social']
  representante_new.save()


}

result = con.exec "select * from patentes;"

result.each{ |patente|
  patente_new = Patente.new
  patente_new.nombre = patente['nombre']
  patente_new.tipo   = patente['tipo']
  patente_new.save()
}





Representante.all().each{ |representante|
  locales  = con.exec "select * from locales where rut =#{representante.rut};"
  locales.each{ |local|


    l = Local.new()
    l.rol =local['rol']
    l.direccion =local['direccion']
    l.error =local['error']
    l.ubicacion =local['ubicacion']
    l.patentes_id =local['patentes_id']
    l.giro =local['giro']
    l.representantes_id = representante.id
    l.save()

  }
}

comunas  = con.exec "select * from comunas;"
comunas.each { |comuna|

  comuna_new = Comuna.new()
  comuna_new.nombre =comuna['nombre']
  comuna_new.area =comuna['area']
  comuna_new.ubicacion =comuna['ubicacion']
  comuna_new.save()

}
