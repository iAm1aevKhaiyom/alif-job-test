import { Link } from 'react-router-dom';

export function Page404() {
  return (
    <main id="page-404">
      <h1>Error '404' - Page not found!</h1>
      <p>
        This page does not exist. Check if URL's is being spelled correctly.
        Else click <Link to="/">here</Link> to go to Home Page.
      </p>
    </main>
  );
}
