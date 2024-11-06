Rails.application.routes.draw do
  post "login", to: "autenticacao#login"
  post "nova_senha", to: "autenticacao#nova_senha"

  get "registro", to: "registro#show"
  post "registro", to: "registro#create"
  put "registro", to: "registro#update"
  delete "registro", to: "registro#destroy"

  resources :profissionais
  resources :resultados, only: :index
  resources :hitpoint_resultados
  resources :heel_rise_resultados
  resources :up_down_arm_resultados
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
