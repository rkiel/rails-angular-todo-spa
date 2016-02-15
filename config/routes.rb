Rails.application.routes.draw do

  namespace :api do
    post 'signup', to: 'signup#create'
    post 'login', to: 'login#create'
  end

  root "home#index"
  get "*path", to: "home#index"

end
