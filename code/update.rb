locales =Local.where("ubicacion is not NULL and error ='f'").all()

p "aca"
GEO_FACTORY = RGeo::Geographic.spherical_factory(srid: 4326)
locales.each { |local|
# x  = local.ubicacion.x
# y  = local.ubicacion.y
# local.ubicacion = GEO_FACTORY.point(y,x)

  p local.ubicacion
  exit()
}
p "fin"