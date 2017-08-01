class SessionsController < ActionController::Base
  include SessionsHelper
  def new
  end

  def create
    @usuario = Usuario.find_by_email(params[:email].downcase)
    if @usuario && @usuario.authenticate(params[:password])
      log_in(@usuario)
      params[:remember_me] == 'on' ? remember(@usuario) : forget(@usuario)
      remember(@usuario)
      session[:email] = @usuario.email
      redirect_to action: 'index',controller:'dashboard', status: 302
    else
      render :new
    end

  end

  def destroy
    log_out
    redirect_to root_url
  end
end
