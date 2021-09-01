module Mutations
  class CreateLike < BaseMutation
    graphql_name 'CreateLike'

    field :like, Types::LikeType, null: true
    field :result, Boolean, null: true

    argument :userId, Integer, required: false
    argument :postId, Integer, required: false

    def resolve(**args)
       user = User.find(args[:userId])
       like = user.likes.create!(post_id: args[:postId])
      {
        like: like,
        result: true
      }
    end
  end
end
