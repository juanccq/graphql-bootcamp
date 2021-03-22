import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

// Scalar Types: String, Boolean, Int, Float, ID

const users = [
  {
    id: "1",
    name: "Juan",
    email: "juan@mail.com",
    age: 38,
  },
  {
    id: "2",
    name: "Carlos",
    email: "carlos@mail.com",
    age: 27,
  },
  {
    id: "3",
    name: "David",
    email: "david@example.com",
    age: 38,
  },
];

const posts = [
  {
    id: "1",
    title: "the new comments",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie maximus lorem, quis facilisis enim varius eget. Curabitur in efficitur enim.",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "another book",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie maximus lorem, quis facilisis enim varius eget. Curabitur in efficitur enim.",
    published: true,
    author: "2",
  },
  {
    id: "3",
    title: "here is your solution",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie maximus lorem, quis facilisis enim varius eget. Curabitur in efficitur enim.",
    published: true,
    author: "1",
  },
];

const comments = [
  {
    id: "1",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ex lectus, tristique in metus ac, mattis commodo lorem. Aliquam est ante, cursus a sollicitudin in",
    author: "1",
    post: "3",
  },
  {
    id: "2",
    text:
      "Aliquam neque nisi, ornare a sem nec, venenatis lacinia nibh. Nullam varius leo urna, et dignissim nisl venenatis in.",
    author: "2",
    post: "2",
  },
  {
    id: "3",
    text:
      "Morbi pellentesque consequat ligula, vel convallis dolor viverra ac. Duis ullamcorper vestibulum mi non egestas. Nunc posuere orci nec egestas malesuada",
    author: "3",
    post: "1",
  },
  {
    id: "4",
    text:
      "Suspendisse pellentesque, ligula sit amet congue condimentum, leo urna sollicitudin dolor, venenatis porta dui massa eget nunc. Integer eleifend consequat ex ut rutrum",
    author: "1",
    post: "1",
  },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        posts(query:Boolean): [Post!]!
        users: [User!]!
        comments: [Comment!]!
    }

    type Mutation{
      createUser(data: CreateUserInput): User!
      createPost(data: CreatePostInput): Post!
      createComment(data:CreateCommentInput): Comment!
    }

    input CreateUserInput {
      name:String!, 
      email:String!, 
      age:Int
    }

    input CreatePostInput {
      title:String!, 
      body:String!, 
      published:Boolean!, 
      author: ID!
    }

    input CreateCommentInput {
      text:String!, 
      author:ID!, 
      post:ID!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id: ID!,
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }

    type Comment {
      id: ID!,
      text: String!
      author: User!
      post: Post!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (typeof args.query === "undefined") {
        return posts;
      }

      return posts.filter((post) => {
        return post.published === args.query;
      });
    },
    users(parent, args, ctx, info) {
      return users;
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);

      if (emailTaken) {
        throw new Error("Email taken");
      }

      const user = {
        id: uuidv4(),
        ...args.data,
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);

      if (!userExists) {
        throw new Error("User doesn't exists");
      }

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postEnabled = posts.some(
        (post) => post.id === args.data.post && post.published
      );

      if (!userExists) {
        throw new Error("User doesn't exists");
      }

      if (!postEnabled) {
        throw new Error("Post doesn't exists or is not published");
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
