import { useContext } from 'react';
import { API } from '../API';
import { MeContext } from '../Contexts';

export function LogoutForm() {
  const [_, setMe] = useContext(MeContext);

  async function handleLogout() {
    await API.logout();
    setMe(await API.whoAmI());
  }

  return (
    <form onSubmit={(e) => void e.preventDefault()}>
      <legend>Хотите выйти ?</legend>
      <button onClick={handleLogout}>Logout</button>
    </form>
  );
}
