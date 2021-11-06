// -----------------------------------------------------------------------------
import React from 'react';

// -----------------------------------------------------------------------------
export const getRandomHexColor = () => Math.random().toString(16).substr(2, 6);

// -----------------------------------------------------------------------------
export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext([defaultValue, defaultUpdate] as const);

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue);
    return <ctx.Provider value={[state, update]} {...props} />;
  }

  return [ctx, Provider] as const;
}
// -----------------------------------------------------------------------------
export const LocalStorage = {
  getUserID: () => localStorage.getItem('USER_ID'),
  setUserID: (value: number) => localStorage.setItem('USER_ID', `${value}`),
  removeUserID: () => localStorage.removeItem('USER_ID'),
};

// -----------------------------------------------------------------------------
export type AwaitedType<T> = T extends PromiseLike<infer U> ? U : T;

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
// -----------------------------------------------------------------------------
export type FetchedEntityType = {
  id: number;
  imgSrc: {
    x150: string;
    x400: string;
  };
};

export type PostType = FetchedEntityType & {
  text: string;
  title: string;
  authorID: number;
};

export type AuthorType = FetchedEntityType & {
  name: string;
  email: string;
  phone: string;
  username: string;
};

// -----------------------------------------------------------------------------
export const TagEnum = ['ea', 'sit', 'amet', 'dolor', 'magnam'] as const;

// export const TagEnum = [
//   'ES-List',
//   'Multi-Threading',
//   'Golang',
//   'Life-Hacks',
//   'Football-2022',
//   'Covid-19',
//   'IT',
//   'Genshin Impact',
//   'Brexit',
//   'Fun',
//   'Science',
//   'Typescript',
//   'React',
// ] as const;

// -----------------------------------------------------------------------------
