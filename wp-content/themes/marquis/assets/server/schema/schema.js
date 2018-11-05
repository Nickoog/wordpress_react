const graphql = require('graphql');
const fetch = require('node-fetch');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        name: { type: GraphQLString },
        items: {type: new GraphQLList(MenuItemsType) },
    })
});

const MenuItemsType = new GraphQLObjectType({
    name: 'Items',
    fields: () => ({
        title: { type: GraphQLString },
        object_slug: { type: GraphQLString }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        author_name: { type: GraphQLString },
        published_date: { type: GraphQLString },
        featured_image_src: { type: GraphQLString },
        title: {
            type: GraphQLString,
            resolve: res => res.title.rendered
        },
        content: {
            type: GraphQLString,
            resolve: res => res.content.rendered
        },
        acf_gallery: {
            type: new GraphQLList(AcfGalleryType),
            resolve: res => res.acf.gallery
        },
        acf_text: {
            type: GraphQLString,
            resolve: res => res.acf.text
        }
    })
});

const AcfGalleryType = new GraphQLObjectType({
    name: 'Gallery',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        description: { type: GraphQLString },
        caption: { type: GraphQLString },
        alt: { type: GraphQLString },
        width: { type: GraphQLInt },
        height: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: { 
                id: { type: GraphQLID },
                post: { type: GraphQLString } 
            },
            resolve: (root, args) => fetch(
                `http://react.test/wp-json/wp/v2/${args.post}/${args.id}`
            )
            .then(res => res.json())
        },
        posts: {
            type: new GraphQLList(PostType),
            args: { 
                posts: {type: GraphQLString },
                num: { type: GraphQLInt },
            },
            resolve: (root, args) => fetch(
                `http://react.test/wp-json/wp/v2/${args.posts}/?per_page=${args.num}`
            )
            .then(res => res.json())
        },
        pagination: {
            type: new GraphQLList(PostType),
            args: { 
                posts: { type: GraphQLString } ,
                num: { type: GraphQLInt },
                page: { type: GraphQLInt }
            },
            resolve: (root, args) => fetch(
                `http://react.test/wp-json/wp/v2/${args.posts}/?per_page=${args.num}&page=${args.page}`
            )
            .then(res => res.json())
        },
        menus: {
            type: MenuType,
            args: { id: { type: GraphQLID } },
            resolve: (root, args) => fetch(
                `http://react.test/wp-json/wp-api-menus/v2/menus/${args.id}`
            )
            .then(res => res.json())
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});