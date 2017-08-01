class VistaPolicy < ApplicationPolicy

  class Scope < ApplicationScope

    attr_reader :usuario, :scope

    def initialize(usuario,scope)
      @usuario = usuario
      @scope = scope
    end

    def resolve
      if @usuario.roles_id != 6
        scope.all
      end
    end
  end
end
