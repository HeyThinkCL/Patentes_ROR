Rails.application.routes.draw do
  resources :login
  resources :ingresar_pagos
  resources :rutas
  namespace :api do
    resources :ruts
    resources :localizar
    resources :cerca
  end
  namespace :patentes do

    resources :localizar
    resources :patentes

    resources :error
  end
 # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => "dashboard#index"
end
