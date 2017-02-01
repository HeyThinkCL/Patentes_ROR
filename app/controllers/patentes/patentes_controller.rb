class Patentes::PatentesController < ApplicationController
  def index
    patentes = Patente.select(:id).where(:nombre => params[:patente] ).all().pluck(:id)
    if patentes.length ==  0
      redirect_to  action: 'index',controller: '/dashboard'
    end
    @patente = params[:patente]
    @locales = Local.where(:patentes_id => patentes).all()
  end
  def new
    @patente = params[:patente].downcase()

  end
end
