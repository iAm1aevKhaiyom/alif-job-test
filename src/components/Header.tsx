import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../API';
import { IsModalVisibleContext, MeContext } from '../Contexts';
import { Modal } from './Modal';

export function Header() {
  // ---------------------------------------------------------------------------
  const [me] = useContext(MeContext);
  const [_, setIsModalVisible] = useContext(IsModalVisibleContext);

  // ---------------------------------------------------------------------------
  function LogoutForm() {
    return (
      <form onSubmit={(e) => void e.preventDefault()}>
        <label>Want to logout?</label>
        <button onClick={() => void API.logout()}>Logout</button>
      </form>
    );
  }

  // ---------------------------------------------------------------------------
  function LoginForm() {
    const [username, setUsername] = useState('');

    return (
      <form onSubmit={(e) => void e.preventDefault()}>
        <label>Want to login?</label>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button onClick={() => void API.login({ username })}>Login</button>
      </form>
    );
  }

  // ---------------------------------------------------------------------------
  return (
    <header>
      <h1>
        <Link to="/">Alif Task</Link>
      </h1>
      <p>
        Hello,{' '}
        <span onClick={() => void setIsModalVisible(true)}>
          {me?.username || 'Guest'}
        </span>
        <Modal>{me ? <LogoutForm /> : <LoginForm />}</Modal>
      </p>
    </header>
  );
}
