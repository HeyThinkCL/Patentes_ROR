class Patentes::PatentesController < ApplicationController
  def index
    # patentes = Patente.select(:id).where(:nombre => params[:patente] ).all().pluck(:id)
    # if patentes.length ==  0
    #   redirect_to  action: 'index',controller: '/dashboard'
    # end
    # @patente = params[:patente]
    # @locales = Local.where(:patentes_id => patentes).all()

    render component:'Buscar_Patente'
  end
  def new

  end
end
