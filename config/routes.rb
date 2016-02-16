Rails.application.routes.draw do

  namespace :api do
    post '/signup', to: 'signup#create'
    post '/login', to: 'login#create'
    delete '/login', to: 'login#destroy'

    get '/todo', to: 'todo#index'
    post '/todo', to: 'todo#create'
    delete '/todo/:id', to: 'todo#destroy'
  end

  root "home#index"
  get "*path", to: "home#index"

end
