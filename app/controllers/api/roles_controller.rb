class Api::RolesController < ApplicationController
  def show

    p params[:id]
    render json:Local.where(:rol=>params[:id]).first(), :include => [:representante]
  end
end
