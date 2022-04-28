module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {},
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {};
  return Post;
};
