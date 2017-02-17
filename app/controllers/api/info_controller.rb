class Api::InfoController < ApplicationController
  def show
    visita=Visita.where(:locales_id=>params[:id]).all()
    pagos=Pago.where(:locales_id=>params[:id]).all()

    render json:{'visitas':visita,'pagos':pagos}
  end
end
