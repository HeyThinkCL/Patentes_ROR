class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_request

  protected
  def authenticate_request
    if session[:email]
      @current_user = Usuario.find_by_email(session[:email])
      @comuna = Comuna.first()
    else
      redirect_to action: 'new',controller: 'sessions', status: 302
    end
  end

  private
    def user_not_authorized
      flash[:warning] = "Usuario no autorizado para ejecutar esta acción"
      redirect_to root_path
    end

end

