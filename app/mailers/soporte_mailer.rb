class SoporteMailer < ApplicationMailer
  default from: "soporte@heythink.cl"

  def respuesta(usuario)
    @usuario = usuario
    mail(to: @usuario.email,subject: "Soporte HeyCity")
  end

  def soporte(params)
    @nombre = params[:nombre] <<" "<< params[:apellido]
    @email = params[:email]
    @mensaje = params[:mensaje]
    @problema = params[:opcion]
    mail(to: 'soporte@heythink.cl', subject: "Mensaje de Soporte")
  end
end
