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


GEO_FACTORY = RGeo::Geographic.spherical_factory(srid: 4326)


comunas  = con.exec "select * from comunas;"
comunas.each { |comuna|

  comuna_new = Comuna.new()
  comuna_new.nombre ="Municipalidad de Ñuñoa"
  comuna_new.area =comuna['area']
  comuna_new.ubicacion = GEO_FACTORY.point(-70.5959592,-33.4558882)
  comuna_new.expiracion=Date.today()+170
  comuna_new.borde='#3fb7ff'
  comuna_new.fondo='#61aeff'
  comuna_new.zoom = 13
  comuna_new.save()

}




user1=Usuario.new
user1.nombre="Marcelo"
user1.apellido="Pizarro"
user1.passwd="demodemo"
user1.email="marcelo.pizarro01@gmail.com"
user1.save

user1=Usuario.new
user1.nombre="Manuel"
user1.apellido="Alba"
user1.email="m.alba@heythink.cl"
user1.passwd="mmae2010"
user1.save

user1=Usuario.new
user1.nombre="Fabian"
user1.apellido="Plaza"
user1.email="f.plaza@heythink.cl"
user1.passwd="sanantonio"
user1.save

