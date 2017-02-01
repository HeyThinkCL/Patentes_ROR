class Patentes::ErrorController < ApplicationController
  def index
    @errores = Local.where(:error=>true).all()
    @errores = JSON.parse @errores.to_json(include: :representante)
  end
end
