import { PropsWithChildren, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostType, TagType } from '../utils';
import { API } from '../API';

// -----------------------------------------------------------------------------
const PostCard = ({
  imgSrc,
  text: text,
  title,
  id,
}: PropsWithChildren<PostType>) => (
  <li key={id}>
    <header>
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
    </header>
    <p>
      {text}
      <Link to={`post/${id}`}>Read more...</Link>
    </p>
  </li>
);

// -----------------------------------------------------------------------------
export function PostList() {
  // ---------------------------------------------------------------------------
  // const [SP, setSP] = useSearchParams();
  const [posts, setPosts] = useState<PostType[]>([]);

  const [sp, setSp] = useState<{
    query: string;
    tagList: TagType[];
  }>({
    query: '',
    tagList: ['Brexit', 'Covid-19'],
  });

  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      // setPosts(await API.getPosts());
    })();
  });

  // ---------------------------------------------------------------------------
  return (
    <main id="post-list">
      <aside>
        <label>
          Search:
          <input
            type="search"
            value={sp.query}
            onChange={(e) =>
              void setSp((prev) => ({ ...prev, query: e.target.value }))
            }
          />
        </label>

        <label>Taglist:</label>
      </aside>
      <ul>
        {posts.map((props) => (
          <PostCard {...props} />
        ))}
      </ul>
    </main>
  );
}
