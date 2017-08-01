# class LoginController <  ActionController::Base
#   def index
#
#
#   end
#   def create
#
#     user=Usuario.where(:email=>params[:email]).first
#     if user!=nil
#       if user.passwd== params[:password]
#         session[:email]=user.email
#         redirect_to action: 'index',controller:'dashboard', status: 302
#
#       else
#         redirect_to action: 'index', status: 302
#       end
#
#     else
#
#       redirect_to action: 'index', status: 302
#     end
#
#   end
# end
