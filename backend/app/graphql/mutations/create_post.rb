module Mutations
  class CreatePost < BaseMutation
    graphql_name 'CreatePost'

    field :post, Types::PostType, null: true
    field :result, Boolean, null: true

    argument :user_id, Integer, required: false
    argument :shop_id, String, required: false
    argument :title, String, required: false
    argument :description, String, required: false

    def resolve(**args)
      user = User.find(args[:user_id])
      post = user.posts.create!(shop_id: args[:shop_id], title: args[:title], description: args[:description])
      {
        post: post,
        result: post.errors.blank?
      }
    end
  end
end
