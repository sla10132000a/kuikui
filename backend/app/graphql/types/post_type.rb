module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :description, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :likes, [Types::LikeType], null: false
    field :liked_users, [Types::UserType], null: false
    field :user_id, ID, null: false
    field :shop_id, String, null: true
    
  end
end
