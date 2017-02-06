Rails.application.routes.draw do
  resources :login
  namespace :api do
    resources :ruts
    resources :localizar
  end
  namespace :patentes do

    resources :localizar
    scope '/:patente', :as => 'patente' do
      resources :patentes
    end
    resources :error
  end
 # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => "dashboard#index"
end
