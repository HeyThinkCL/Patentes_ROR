class UsuariosController < ApplicationController
  before_action :roles
  before_action :set_usuario, only: [:update,:destroy]


  def index
    @usuarios = Usuario.where.not(:roles_id => nil).order('apellido')
  end

  def new
    @usuario = Usuario.new
  end

  def create
    @usuario = Usuario.new(usuario_params)
    @usuario.roles_id = params['usuario']['roles_id']
    if @usuario.save
      redirect_to action:'index'
    end
  end

  def edit
    @usuario = Usuario.find(params[:id])
  end

  def update
    @usuario.update(:nombre => params[:usuario][:nombre],:apellido => params[:usuario][:apellido])
    @usuario.roles_id = params[:usuario][:roles_id]
    if @usuario.save
      redirect_to usuarios_path
    else
      redirect_to usuarios_path
    end
  end

  def destroy
    @usuario.destroy
    redirect_to usuarios_path
  end

  private

    def set_usuario
      @usuario = Usuario.find(params[:id])
    end

    def usuario_params
      params.require(:usuario).permit(:nombre,:apellido,:email,:password,:password_confirmation)
    end

    def roles
      if @current_user.roles_id == 6
        redirect_to 'dashboard'
      end
    end
end
