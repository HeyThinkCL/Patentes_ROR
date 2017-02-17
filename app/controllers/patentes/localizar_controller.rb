class Patentes::LocalizarController < ApplicationController

  def index


    render component:'Localizar',props:{'patentes':Patente.all()}
  end

end
