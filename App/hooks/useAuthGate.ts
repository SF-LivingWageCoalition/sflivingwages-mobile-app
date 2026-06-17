import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/userSlice/userSlice";

export type AuthModalProps = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onForgotPassword: () => void;
};

/**
 * Generic auth gate hook.
 *
 * Usage:
 *   const authGate = useAuthGate({ onForgotPassword: () => navigation.navigate(...) });
 *   // ...
 *   authGate.trigger(() => navigation.navigate("ProtectedScreen"));
 *   // ...
 *   <AuthModal {...authGate.modalProps} />
 *
 * If the user is already logged in, `trigger` runs the callback immediately.
 * Otherwise, it opens the AuthModal. On successful auth, the callback runs
 * and the modal closes.
 */
export const useAuthGate = (options: {
  onForgotPassword: () => void;
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [modalVisible, setModalVisible] = useState(false);
  const pendingCallback = useRef<(() => void) | null>(null);

  const trigger = useCallback(
    (onAuthed: () => void) => {
      if (isLoggedIn) {
        onAuthed();
      } else {
        pendingCallback.current = onAuthed;
        setModalVisible(true);
      }
    },
    [isLoggedIn],
  );

  const handleSuccess = useCallback(() => {
    setModalVisible(false);
    pendingCallback.current?.();
    pendingCallback.current = null;
  }, []);

  const handleClose = useCallback(() => {
    setModalVisible(false);
    pendingCallback.current = null;
  }, []);

  const modalProps: AuthModalProps = {
    visible: modalVisible,
    onClose: handleClose,
    onSuccess: handleSuccess,
    onForgotPassword: () => {
      handleClose();
      options.onForgotPassword();
    },
  };

  return { trigger, modalProps };
};
