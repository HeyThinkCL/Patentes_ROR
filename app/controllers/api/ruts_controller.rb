class Api::RutsController < ApplicationController
  def show

    local = Local.where(:rut=> params[:id]).all()
    render json:local
  end
end
