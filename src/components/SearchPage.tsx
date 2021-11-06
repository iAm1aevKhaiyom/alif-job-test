import { PropsWithChildren, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostType, TagEnum, ArrayElement } from '../utils';
import { API } from '../API';

// -----------------------------------------------------------------------------
export function SearchPage() {
  // ---------------------------------------------------------------------------
  const [pages, setPages] = useState<{ [k: number]: PostType[] }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPageCount] = useState(0);

  const [query, setQuery] = useState('');
  const [tagList, setTagList] = useState(new Set<typeof TagEnum[number]>([]));

  console.log({ currentPage, pages, pagesCount });

  // ---------------------------------------------------------------------------
  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement & { value: typeof TagEnum[number] }>
  ) {
    if (!tagList.delete(e.target.value)) tagList.add(e.target.value);
    setTagList(new Set(tagList));
  }

  // ---------------------------------------------------------------------------
  async function handlePageChange(i: number) {
    const { posts } = await API.getPosts({
      query,
      tagList: Array.from(tagList),
      page: i,
    });

    setPages((prev) => ({ ...prev, [i]: posts }));
    setCurrentPage(i);
  }

  // ---------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      const { pagesCount, posts } = await API.getPosts({
        query,
        tagList: Array.from(tagList),
        page: 0,
      });

      setCurrentPage(0);
      setPageCount(pagesCount);
      setPages({ 0: posts });
    })();
  }, [query, tagList]);

  // ---------------------------------------------------------------------------
  return (
    <main id="search-page">
      {/* // --------------------------------------------------------------- */}
      <aside>
        <input
          type="search"
          value={query}
          placeholder="Поиск по названию"
          onChange={(e) => void setQuery(e.target.value)}
        />

        <p>Поиск по тегам:</p>

        {TagEnum.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              value={tag}
              name="tag-list"
              checked={tagList.has(tag)}
              onChange={handleCheckboxChange}
            />
            {tag}
          </label>
        ))}
      </aside>

      {/* // --------------------------------------------------------------- */}
      <main>
        <ul id="post-list">
          {Array.isArray(pages[currentPage]) &&
            pages[currentPage].map((props) => (
              // <PostCard {...props} />
              <li key={props.id}>{props.title}</li>
            ))}
        </ul>

        <ul id="page-list">
          {Array.from({ length: pagesCount }).map((_, i) => (
            <li
              key={i + 1}
              data-is-active={`${i === currentPage}`}
              onClick={(e) => handlePageChange(i)}
            >
              {i + 1}
              {i + 1 === currentPage}
            </li>
          ))}
        </ul>
      </main>
    </main>
  );
}

// -----------------------------------------------------------------------------

// const PostCard = ({
//   imgSrc,
//   text: text,
//   title,
//   id,
// }: PropsWithChildren<PostType>) => (
//   <li key={id}>
//     <header>
//       <img src={imgSrc.x150} alt={title} />
//       <h3>{title}</h3>
//     </header>
//     <p>
//       {text}
//       <Link to={`post/${id}`}>Read more...</Link>
//     </p>
//   </li>
// );
