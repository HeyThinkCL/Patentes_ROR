class UsuariosController < ApplicationController
  def show
    @usuario_nuevo= Usuario.find(params[:id])
  end
  def update

    @usuario = Usuario.find(params[:id])
    @usuario.nombre=params['usuario']['nombre']
    @usuario.apellido=params['usuario']['apellido']
    @usuario.email=params['usuario']['email']

    if params['usuario']['passwd'] != ""
      @usuario.passwd=params['usuario']['passwd']
    end

    @usuario.roles_id = params['usuario']['roles_id']
    @usuario.save

    redirect_to action:'index'

  end

  def index

    @usuario_nuevo = Usuario.new

  end
  def create

    @usuario = Usuario.new
    @usuario.nombre=params['usuario']['nombre']
    @usuario.apellido=params['usuario']['apellido']
    @usuario.email=params['usuario']['email']


    @usuario.passwd=params['usuario']['passwd']

    @usuario.roles_id = params['usuario']['roles_id']
    @usuario.save
    redirect_to action:'index'

  end


end
