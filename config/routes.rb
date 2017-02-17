Rails.application.routes.draw do
  resources :login
  resources :ingresar_pagos
  resources :rutas
  resources :visitas
  resources :registrar_visitas
  resources :ingresar_pagos
  resources :usuarios
  resources :locales

  namespace :api do
    resources :ruts
    resources :localizar
    resources :cerca
    resources :error
    resources :roles
  end
  namespace :patentes do

    resources :localizar
    resources :patentes
    resources :densidades

    resources :error
  end
 # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => "dashboard#index"
end
