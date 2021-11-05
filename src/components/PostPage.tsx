import { PropsWithChildren, useEffect, useState } from 'react';
import { API } from '../API';
import { Link, useParams } from 'react-router-dom';
import { PostType } from '../utils';

export function PostPage(props: PropsWithChildren<{}>) {
  // ---------------------------------------------------------------------------
  const [post, setPost] = useState<PostType | null | undefined>(undefined);
  const { postID } = useParams();

  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        if (postID) setPost(await API.getPost({ postID }));
      } catch (error) {
        setPost(null);
      }
    })();
  }, [postID]);

  // ---------------------------------------------------------------------------
  if (!postID || post === null) return <h1>404</h1>; // redirect to 404
  if (!post) return <p>Loading...</p>;

  // ---------------------------------------------------------------------------
  const { id, text, title, authorID, imgSrc } = post;
  return (
    <main id="post-page">
      <img src={imgSrc.x400} alt={title} />
      <h1> {title}</h1>
      <p> {text}</p>

      <Link rel="author" to={`/author/${authorID}`}>
        Goto Author's Page
      </Link>
    </main>
  );
}
