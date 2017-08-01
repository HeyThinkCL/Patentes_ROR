module SessionsHelper

  # logeo con el usuario dado
  def log_in(usuario)
    session[:usuario_id] = usuario.id
  end

  # Recuerda un usuario en una sesion persistente
  def remember(usuario)
    usuario.remember
    cookies.permanent.signed[:usuario_id] = usuario.id
    cookies.permanent[:remember_token] = usuario.remember_token
  end

  # Retorna el usuario correspondiente a la cookie token
  def current_user
    if (usuario_id = session[:usuario_id])
      @current_user ||= Usuario.find_by(id: usuario_id)
    elsif (usuario_id = cookies.signed[:user_id])
      usuario = Usuario.find_by(id: usuario_id)
      if usuario && usuario.authenticated?(cookies[:remember_token])
        log_in usuario
        @current_user = usuario
      end
    end
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    forget(current_user)
    reset_session
    @current_user = nil
  end

  # permite que el usuario no sea recordado cada vez que se cierra sesion
  def forget(usuario)
    usuario.forget
    cookies.delete(:usuario_id)
    cookies.delete(:remember_token)
    # update_attribute(:remember_digest,nil)
  end
end
