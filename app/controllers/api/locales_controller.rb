class Api::LocalesController < ApplicationController
  include Ubicacion
  before_action :set_local, only: [:show, :edit, :update, :destroy]

  # POST /api/locales

  def create
    @comuna = Comuna.find_by_id(params[:comuna][:id])
    if @comuna
      @usuario = Usuario.find_by_email(params[:usuario][:email])
      if @usuario && @usuario.authenticate(params[:usuario][:password])
        inside = inComuna(params[:local][:lng],params[:local][:lat],@comuna)
        if inside
          @patente = Patente.find_by(:id => params[:patente][:id])
          @local = Local.new(local_params)
          @local.direccion = params[:local][:direccion].split(",")[0]
          ubicacion(params[:local][:lng],params[:local][:lat])
          @local.ubicacion = @ubicacion
          @local.patente = @pantente
          @representante = Representante.find_by_rut(params[:representante][:rut])
          if @representante
            @local.representante = @representante
          else
            @representante = Representante.new(representane_params)
            if @representante.save
              @local.representante = @represenante
            end
          end
          @local.save
          result = inJunta(@local)
          if result != nil
            @local.juntas_vecinos_id = result
          end

          if @local.save
            render json: @local, status: :created
          end
        else
          render status: :unprocessable_entity
        end
      end
    else
      render json: @comuna.errors, status: :unprocessable_entity
    end
  end

  def update
    if @local.update(local_params)
      render json, status: :ok
    else
      render json: @local.errors, status: :unprocessable_entity
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_local
      @local = Local.find(params[:local][:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def local_params
      params.require(:local).permit(:rol,:pago,:giro,:fecha_otorgada,:codigo_sii,:rol_propiedad,:numero,:calle,:casa,:departamento,:oficina,:local)
    end

    def representane_params
      params.require(:representante).permit(:rut,:dv,:email,:nombre_social,:nombre,:apellido,:telefono,:celular)
    end
end
