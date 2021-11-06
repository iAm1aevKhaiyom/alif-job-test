import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostType, TagEnum, ArrayElement } from '../utils';
import { API } from '../API';
import { MeContext } from '../Contexts';

// -----------------------------------------------------------------------------
export function SearchPage() {
  // ---------------------------------------------------------------------------
  const [me] = useContext(MeContext);

  const [pages, setPages] = useState<{ [k: number]: PostType[] }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPageCount] = useState(0);

  const [query, setQuery] = useState('');
  const [tagList, setTagList] = useState(new Set<typeof TagEnum[number]>([]));
  const [onlyMyFlag, setOnlyMyFlag] = useState(false);

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
      const { pagesCount, posts } = await API.getPosts(
        Object.assign(
          {
            query,
            tagList: Array.from(tagList),
            page: 0,
          },
          onlyMyFlag &&
            me && {
              userId: me?.id,
            }
        )
      );

      setCurrentPage(0);
      setPageCount(pagesCount);
      setPages({ 0: posts });
    })();
  }, [query, tagList, onlyMyFlag, me]);

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

        <label>
          Показать только мои посты:{' '}
          <input
            type="checkbox"
            name="tag-list"
            value="only-my-posts"
            checked={onlyMyFlag}
            onChange={() => setOnlyMyFlag((prev) => !prev)}
          />
        </label>

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

        <hr />
        <p className="notification">
          Логины уже готовые используются из сервиса "jsonplaceholder". Один из
          них: "Bret". Чтоб войти, нажмите на "Guest"
        </p>

        <p className="notification">
          К сожалению времени не было много, успел сделать на уровне каркаса, но
          постарался писать читабельный и оптимальный код
        </p>
      </aside>

      {/* // --------------------------------------------------------------- */}
      <main>
        <ul id="post-list">
          {Array.isArray(pages[currentPage]) &&
            pages[currentPage].map((props) => (
              <PostCard {...props} />
              // <li key={props.id}>{props.title}</li>
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

const PostCard = ({
  imgSrc,
  text: text,
  title,
  id,
}: PropsWithChildren<PostType>) => (
  <li key={id}>
    <header>
      <img src={imgSrc.x150} alt={title} />
      <h3>{title.substr(0, 20)}</h3>
    </header>
    <p>
      {text.substr(0, 40)}
      <br />
      <Link to={`post/${id}`}>Read more...</Link>
    </p>
  </li>
);
