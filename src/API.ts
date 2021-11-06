// -----------------------------------------------------------------------------
import Axios from 'axios';
import { AuthorType, getRandomHexColor, LocalStorage, PostType } from './utils';

// -----------------------------------------------------------------------------
export const axios = Axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com',
});

// -----------------------------------------------------------------------------
export const API = {
  // ---------------------------------------------------------------------------
  async whoAmI() {
    const userID = Number(LocalStorage.getUserID());
    if (!userID) return null;

    const { data } = await axios.get<{ id: number; username: string }>(
      `users/${userID}`
    );
    return data;
  },

  // ---------------------------------------------------------------------------
  async login(args: { username: string }) {
    const { data: users } = await axios.get<AuthorType[]>('users');

    const user = users.find(({ username }) => username === args.username);
    if (!user) return false;

    LocalStorage.setUserID(user.id);
    return true;
  },

  // ---------------------------------------------------------------------------
  async logout() {
    LocalStorage.removeUserID();
  },

  // ---------------------------------------------------------------------------
  async getAuthor(args: { authorID: string }): Promise<AuthorType> {
    const { data: user } = await axios.get<{
      id: number;
      name: string;
      email: string;
      phone: string;
      username: string;
    }>(`users/${args.authorID}`);

    return {
      ...user,
      imgSrc: {
        x150: `https://via.placeholder.com/150/${getRandomHexColor()}`,
        x400: `https://via.placeholder.com/400/${getRandomHexColor()}`,
      },
    };
  },

  // ---------------------------------------------------------------------------
  async getPost(args: { postID: string }): Promise<PostType> {
    const { data: post } = await axios.get<{
      id: number;
      body: string;
      title: string;
      userId: number;
    }>(`posts/${args.postID}`);

    return {
      id: post.id,
      text: post.body,
      title: post.title,
      authorID: post.userId,
      imgSrc: {
        x150: `https://via.placeholder.com/150/${getRandomHexColor()}`,
        x400: `https://via.placeholder.com/400/${getRandomHexColor()}`,
      },
    };
  },

  // ---------------------------------------------------------------------------
  async getPosts(args: {
    query: string;
    tagList: string[];
    page: number;
  }): Promise<{ posts: PostType[]; pagesCount: number }> {
    const POSTS_PER_PAGE = 8;

    const sliceStart = args.page * POSTS_PER_PAGE;
    const sliceEnd = sliceStart + POSTS_PER_PAGE;

    const { data: posts } = await axios.get<
      {
        id: number;
        body: string;
        title: string;
        userId: number;
      }[]
    >('posts');

    const filteredPosts = posts.filter(
      ({ title }) =>
        title.toLowerCase().includes(args.query.toLowerCase()) &&
        args.tagList.every((tag) =>
          title.toLowerCase().split(' ').includes(tag.toLowerCase())
        )
    );

    const serializedPosts = filteredPosts.map(
      ({ body, id, title, userId }) => ({
        id,
        title,
        text: body,
        authorID: userId,
        imgSrc: {
          x150: `https://via.placeholder.com/150/${getRandomHexColor()}`,
          x400: `https://via.placeholder.com/400/${getRandomHexColor()}`,
        },
      })
    );

    return {
      posts: serializedPosts.slice(sliceStart, sliceEnd),
      pagesCount: Math.ceil(serializedPosts.length / POSTS_PER_PAGE),
    };
  },

  // ---------------------------------------------------------------------------
};
