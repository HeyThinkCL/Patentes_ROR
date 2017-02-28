class DashboardController < ApplicationController

  def index


    render component:'Consola',  props: {juntasvecinos:JuntaVecinos.order("numero asc").all(),comuna:Comuna.first() ,pagos:Pago.order("id desc").limit(4).all(),visitas:Visita.order("id desc").limit(4).all(), patentes:Patente.select("nombre").group("nombre").order("nombre asc").all()}

  end
end
