class Patentes::LocalizarController < ApplicationController

  def index


    render component:'Localizar',props:{juntasvecinos:JuntaVecinos.order("numero asc").all(),'giros':Local.select("giro,patentes_id").group("giro,patentes_id").order("giro asc").all(),'patentes':Patente.all()}
  end

end
