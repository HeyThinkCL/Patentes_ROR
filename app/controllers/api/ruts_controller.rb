class Api::RutsController < ApplicationController
  def show

    local = Representante.where(:rut=> params[:id].split("-")[0]).first()
    render json:local
  end
end
