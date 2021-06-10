Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root to: redirect('/search')
  root to: 'site#index'
  # get '/search', to: 'site#index'
  get '/show', to: 'site#index'
  namespace :api do
    namespace :v1 do
      post :search, to: "search#location"
    end
  end
end
