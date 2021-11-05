import { PropsWithChildren, useEffect, useState } from 'react';
import { API } from '../API';
import { Link, useParams } from 'react-router-dom';
import { AuthorType, PostType } from '../utils';

export function AuthorPage(props: PropsWithChildren<{}>) {
  // ---------------------------------------------------------------------------
  const [author, setAuthor] = useState<AuthorType | null | undefined>(
    undefined
  );
  const { authorID } = useParams();

  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        if (authorID) setAuthor(await API.getAuthor({ authorID }));
      } catch (error) {
        setAuthor(null);
      }
    })();
  }, [authorID]);

  // ---------------------------------------------------------------------------
  if (!authorID || author === null) return <h1>404</h1>; // redirect to 404
  if (!author) return <p>Loading...</p>;

  // ---------------------------------------------------------------------------
  const { email, imgSrc, name, phone, username } = author;
  return (
    <main id="author-page">
      <img src={imgSrc.x400} alt={name} />
      <h1>{name}</h1>
      <h2>{username}</h2>
      <h2>{email}</h2>
      <h2>{phone}</h2>
    </main>
  );
}
