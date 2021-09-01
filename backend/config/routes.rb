Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  if Rails.env.development?
    # add the url of your end-point to graphql_path.
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" 
  end
  namespace :v1 do
    mount_devise_token_auth_for "User", at: "auth"
  end
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
