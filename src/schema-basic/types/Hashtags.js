import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from "graphql";

import User from "./User";
import Comment from "./Comment";
import Post from "./Post";

export default new GraphQLObjectType({
  description: "Hashtags on a Post",
  name: "Hashtag",
  // another table in SQL to map to
  sqlTable: "HASHTAGSTABLE",
  uniqueKey: "ID",
  fields: () => ({
    ID: {
      // SQL column assumed to be "id"
      type: GraphQLString
    },
    postID: {
      type: GraphQLString,
      sqlColumn: "POSTID"
    },
    post: {
      description: "Post that the Hashtag Belongs to",
      type: Post,
      sqlJoin: (hashtagTable, postTable) =>
        `${hashtagTable}.POSTID = ${postTable}.ID`
    },
    hashtag: {
      sqlColumn: "HASHTAG",
      description: "Hashtags on post",
      // assumed to be "body"
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: "CREATEDAT"
    },
    modifiedAt: {
      type: GraphQLString,
      sqlColumn: "MODIFIEDAT"
    },
  })
});
