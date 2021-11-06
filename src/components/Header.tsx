import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IsModalVisibleContext, MeContext } from '../Contexts';
import { LoginForm } from './LoginForm';
import { LogoutForm } from './LogoutForm';
import { Modal } from './Modal';

export function Header() {
  // ---------------------------------------------------------------------------
  const [me, _] = useContext(MeContext);
  const [__, setIsModalVisible] = useContext(IsModalVisibleContext);

  // ---------------------------------------------------------------------------
  return (
    <header>
      <h1 id="logo">
        <Link to="/">Alif Task</Link>
      </h1>
      <p id="welcome">
        Привет,{' '}
        <code onClick={() => void setIsModalVisible(true)}>
          {me?.username || 'Guest'}
        </code>
        <Modal>{me ? <LogoutForm /> : <LoginForm />}</Modal>
      </p>
    </header>
  );
}
