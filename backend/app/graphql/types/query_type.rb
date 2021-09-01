module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :posts, [Types::PostType], null: false
    def posts
      Post.all.order(updated_at: "DESC").limit(3)
    end

    field :post, [Types::PostType], null: false do
      argument :shopId, String, required: false
    end
    def post(shopId:)
      Post.where(shop_id:shopId).order(updated_at: "DESC").limit(3)
    end

    field :like, Boolean, null: false do
      argument :user_id, Int, required: false
      argument :post_id, Int, required: false
    end
    def like(user_id:, post_id:)
      user = User.find(user_id)
      user.likes.exists?(post_id: post_id)
    end
    
  end
end
