class SoporteController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new

  end

  def create
    SoporteMailer.soporte(soporte_params).deliver
  end

  private
    def soporte_params
      params.require(:soporte).permit(:nombre,:apellido,:email,:opcion,:mensaje)
    end
end
