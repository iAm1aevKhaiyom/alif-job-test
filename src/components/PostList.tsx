import { PropsWithChildren, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostType, TagEnum, ArrayElement } from '../utils';
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
      <img src={imgSrc.x150} alt={title} />
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
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pagesCount, setPageCount] = useState(0);

  const [query, setQuery] = useState('');
  const [tagList, setTagList] = useState(
    new Set<typeof TagEnum[number]>(['IT', 'React'])
  );

  // ---------------------------------------------------------------------------
  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement & { value: typeof TagEnum[number] }>
  ) {
    if (!tagList.delete(e.target.value)) tagList.add(e.target.value);
    setTagList(new Set(tagList));
  }

  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      const { pagesCount, posts } = await API.getPosts({
        query,
        tagList: Array.from(tagList),
        page: 1,
      });

      setPageCount(pagesCount);
      setPosts(posts);
    })();
  }, [query, tagList]);

  // ---------------------------------------------------------------------------
  return (
    <main id="post-list">
      <aside>
        {/* // ------------------------------------------------------------- */}
        <h3>Search:</h3>
        <input
          type="search"
          value={query}
          placeholder="type something..."
          onChange={(e) => void setQuery(e.target.value)}
        />

        {/* // ------------------------------------------------------------- */}
        <h3>Taglist:</h3>
        {TagEnum.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              value={tag}
              checked={tagList.has(tag)}
              onChange={handleCheckboxChange}
            />
            {tag}
          </label>
        ))}

        {/* // ------------------------------------------------------------- */}
      </aside>
      <ul>
        {posts.map((props) => (
          <PostCard {...props} />
        ))}
      </ul>
    </main>
  );
}
