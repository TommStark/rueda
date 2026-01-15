import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
  visible: boolean;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (msg: string, toastType: ToastType = 'info', duration: number = 2000) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setMessage(msg);
      setType(toastType);
      setVisible(true);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        timeoutRef.current = null;
      }, duration);
    },
    []
  );

  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
        visible,
        message,
        type,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
