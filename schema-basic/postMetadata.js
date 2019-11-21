import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

export const PostMetadata = new GraphQLObjectType({
  description: 'A post from a user',
  name: 'PostMetadata',
  // another table in SQL to map to
  fields: () => ({
    postVersion: {
      // SQL column assumed to be "id"
      type: GraphQLString,
      resolve: postMetadata => JSON.parse(`${postMetadata}`)['postVersion'],
    },
    postContent: {
      type: GraphQLString,
      resolve: postMetadata => JSON.parse(`${postMetadata}`)['postContent'],
    },
    postHashtags: {
      type: GraphQLString,
      resolve: postMetadata => JSON.parse(`${postMetadata}`)['postHashtags'],
    },
    postImages: {
      type: GraphQLString,
      resolve: postMetadata => JSON.parse(`${postMetadata}`)['postImages'],
    },
  }),
});

export const postImage = new GraphQLObjectType({
  description: 'Images hosted in the Post',
  name: 'postImage',
  // another table in SQL to map to
  fields: () => ({
    imageName: {
      type: GraphQLString,
      resolve: postImage => `${postImage}`,
    },
    imageLink: {
      type: GraphQLString,
      resolve: postImage => `${postImage}`,
    },
  }),
});
