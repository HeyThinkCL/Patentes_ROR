class RegistrarVisitasController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    render component:'Registarvisitas'
  end

  def show

    @local=Local.find(params[:id])
  end
  def create
    visita = Visita.new()
    visita.futuro_pago = Time.strptime("02/28/2017", "%m/%d/%Y")
    local=Local.find(params[:id])
    visita.local=local
    local.representante.nombre=params[:nombre]
    local.representante.apellido=params[:apellido]
    local.representante.email=params[:email]
    local.representante.celular=params[:celular]
    local.representante.telefono=params[:telefono]
    visita.usuario=@usuario
    @local=local
    visita.save()
    local.representante.save()
    @visita=visita


    p params



  end
end
