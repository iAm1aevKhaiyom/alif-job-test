// -----------------------------------------------------------------------------
import Axios from 'axios';
import { getRandomHexColor, LocalStorage, PostType } from './utils';

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
    const { data: users } = await axios.get<{ id: number; username: string }[]>(
      'users'
    );

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
  async createPost(args: { postID: string }) {},

  // ---------------------------------------------------------------------------
  async removePost(args: { postID: string }) {},

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
        x600: `https://via.placeholder.com/600/${getRandomHexColor()}`,
      },
    };
  },

  // ---------------------------------------------------------------------------
  async getPosts(args: {
    query: string;
    tagList: string[];
    page: number;
  }): Promise<PostType[]> {
    const { data: posts } = await axios.get<
      {
        id: number;
        body: string;
        title: string;
        userId: number;
      }[]
    >('posts');

    return posts
      .filter(
        ({ title, body }) =>
          title.toLowerCase().includes(args.query.toLowerCase()) &&
          args.tagList.every((tag) =>
            body.toLowerCase().includes(tag.toLowerCase())
          )
      )
      .map(({ body, id, title, userId }) => ({
        id,
        title,
        text: body,
        authorID: userId,
        imgSrc: {
          x150: `https://via.placeholder.com/150/${getRandomHexColor()}`,
          x600: `https://via.placeholder.com/600/${getRandomHexColor()}`,
        },
      }));
  },

  // ---------------------------------------------------------------------------
};
