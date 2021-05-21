const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const Post = require("../../models/Post");
const Posts = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish("New_Post", {
        newPost: post,
      });

      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("post not found");
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("New_Post"),
    },
  },
};
