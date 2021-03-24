const Query = {
  posts(parent, args, { db }, info) {
    if (typeof args.query === "undefined") {
      return db.posts;
    }

    return db.posts.filter((post) => {
      return post.published === args.query;
    });
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
