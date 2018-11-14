const fetch = require('node-fetch');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = require('graphql');

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

const fetchPosts = (posts, num) =>
    fetch(`http://react.test/wp-json/wp/v2/${posts}/?per_page=${num}`)
    .then(response => response.json())

const fetchPost = (post, id) =>
    fetch(`http://react.test/wp-json/wp/v2/${post}/${id}`)
    .then(response => response.json())

const fetchPagination = (posts, num, page) =>
    fetch(`http://react.test/wp-json/wp/v2/${posts}/?per_page=${num}&page=${page}`)
    .then(response => response.json())

const fetchMenu = (id) =>
    fetch(`http://react.test/wp-json/wp-api-menus/v2/menus/${id}`)
    .then(response => response.json())

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: { 
                id: { type: GraphQLID },
                post: { type: GraphQLString } 
            },
            resolve: (root, args) => fetchPost(args.post, args.id)
        },
        posts: {
            type: new GraphQLList(PostType),
            args: { 
                posts: {type: GraphQLString },
                num: { type: GraphQLInt },
            },
            resolve: (root, args) => fetchPosts(args.posts, args.num)
        },
        pagination: {
            type: new GraphQLList(PostType),
            args: { 
                posts: { type: GraphQLString } ,
                num: { type: GraphQLInt },
                page: { type: GraphQLInt }
            },
            resolve: (root, args) => fetchPagination(args.posts, args.num, args.page)
        },
        menus: {
            type: MenuType,
            args: { id: { type: GraphQLID } },
            resolve: (root, args) => fetchMenu(args,id)
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});