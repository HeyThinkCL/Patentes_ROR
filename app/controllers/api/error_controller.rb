class Api::ErrorController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create

    p params
    id = params[:id]
    local = Local.find(id)
    local.direccion = params[:direccion].split(",")[0].upcase()



    location = params[:ubicacion]
    location= location.gsub("POINT (","POINT(")
    local.ubicacion =  location

    local.save()

    render json:{'status':'ok'}

  end
end
