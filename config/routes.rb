Rails.application.routes.draw do

  namespace :api do
    post '/signup', to: 'signup#create'
    post '/login', to: 'login#create'
    delete '/login', to: 'login#destroy'
  end

  root "home#index"
  get "*path", to: "home#index"

end
