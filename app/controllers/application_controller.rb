class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


  before_action :ensure_login
  protected
  def ensure_login


    if session[:email]
      @usuario=Usuario.where(:email=>session[:email]).first
      @comuna = Comuna.first()
    else
      redirect_to action: 'index',controller: 'login', status: 302
    end
  end


end
