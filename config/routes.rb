Rails.application.routes.draw do

  namespace :api do
    resources :locales
  end
  namespace :gestiones do
    resources :gestiones
  end
  namespace :gestiones do
    resources :finanzas
  end
  # resources :login
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
    resources :info
    resources :excel
  end
  namespace :patentes do

    resources :localizar
    resources :patentes
    resources :densidades
    resources :error
  end

  get '/soporte', to: 'soporte#new'
  post '/soporte', to: 'soporte#create'
  get '/home' => "dashboard#index"
  post '/locales_guardar' => 'locales#guardar'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  get '/logout',  to: 'sessions#destroy'
  root 'sessions#new'
end
