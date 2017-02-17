class IngresarPagosController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index

    render component:'Ingresarpago',props:{'rol':params[:rol]}
  end
  def create

    pago = Pago.new()
    local=Local.where(:rol => params[:rol]).first()
    p params

    pago.local=local
    pago.usuario=@usuario
    pago.pagado=params[:monto_pagar]
    pago.local.deuda=pago.local.deuda-params[:monto_pagar].to_i
    pago.save()
    pago.local.save()

    render json:{'msg':"Se ha efectuado el pago por #{pago.pagado} con el id #{pago.id}"}
  end
end
