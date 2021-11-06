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
  if (!postID || post === null) return <h1>404 - Post not found</h1>;
  if (!post) return <p>Loading...</p>;

  // ---------------------------------------------------------------------------
  return (
    <main id="post-page">
      <img src={post.imgSrc.x400} alt={post.title} />
      <h1> {post.title}</h1>
      <p> {post.text}</p>

      <Link rel="author" to={`/author/${post.authorID}`}>
        Goto Author's Page
      </Link>
    </main>
  );
}
