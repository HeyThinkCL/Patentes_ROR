class LocalesController <  ApplicationController
  def new

    render component:'Geolocation',  props: { patentes:Patente.order("nombre asc").all()}
  end
end
