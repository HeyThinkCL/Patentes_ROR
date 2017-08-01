class VisitasController < ApplicationController
  before_action :roles

  def index

  end

  private
    def roles
      if @current_user.roles_id == 6
        redirect_to 'dashboard'
      end
    end
end
