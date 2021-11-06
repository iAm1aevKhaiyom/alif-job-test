import { useContext, useState } from 'react';
import { API } from '../API';
import { MeContext } from '../Contexts';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [_, setMe] = useContext(MeContext);

  async function handleLogin() {
    await API.login({ username });
    setMe(await API.whoAmI());
  }

  return (
    <form onSubmit={(e) => void e.preventDefault()}>
      <legend>Вход</legend>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
