class SuportMailer < ApplicationMailer
  default from: 'soporte@heythink.cl'

  def suport(usuario)
    @usuario = user
    @url = 'http://example.com/login'
    mail(to:@usuario.email, subject: 'Bienvenido')
  end

end
