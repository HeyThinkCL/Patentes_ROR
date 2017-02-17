class Patentes::ErrorController < ApplicationController
  def index

    @errores = Local.where(:error=>true).limit(5).all()
    @errores = JSON.parse @errores.to_json(include: :representante)

    render component:'Errores',  props: { errores:@errores}
  end
end
