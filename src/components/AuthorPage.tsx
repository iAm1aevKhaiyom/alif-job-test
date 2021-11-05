import { PropsWithChildren, useEffect, useState } from 'react';
import { API } from '../API';
import { useParams } from 'react-router-dom';
import { PostType } from '../utils';

export function AuthorPage(props: PropsWithChildren<{}>) {
  // ---------------------------------------------------------------------------
  const [author, setAuthor] = useState<PostType>();
  const { postID } = useParams();

  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      if (postID) setPost(await API.getPost({ postID }));
    })();
  }, [postID]);

  // ---------------------------------------------------------------------------
  if (!postID) return null; // redirect to 404
  if (!post) return null;

  const { id, text, title, userID } = post;
  return (
    <main id="post-page">
      <h1>{title}</h1>
      <p>{text}</p>

      <address></address>
    </main>
  );
}
