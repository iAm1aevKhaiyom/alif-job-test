// -----------------------------------------------------------------------------
import { PropsWithChildren, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IsModalVisibleContext } from '../Contexts';

// -----------------------------------------------------------------------------
const modalRoot = document.getElementById('modal-root')!;

// -----------------------------------------------------------------------------
export function Modal({ children }: PropsWithChildren<{}>) {
  // ---------------------------------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useContext(IsModalVisibleContext);

  // ---------------------------------------------------------------------------
  useEffect(() => {
    function onEscapePress(e: KeyboardEvent) {
      if (e.key == 'Escape') setIsModalVisible(false);
    }

    document.body.addEventListener('keydown', onEscapePress);
    return () => document.body.removeEventListener('keydown', onEscapePress);
  }, []);

  // ---------------------------------------------------------------------------
  if (!isModalVisible) return null;

  // ---------------------------------------------------------------------------
  return createPortal(
    <>
      <div
        className="background"
        onClick={() => void setIsModalVisible(false)}
      />
      <div className="content">{children}</div>
    </>,
    modalRoot
  );
}
