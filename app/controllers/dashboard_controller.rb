class DashboardController < ApplicationController

  def index


    render component:'Consola',  props: { comuna:Comuna.first() }

  end
end
