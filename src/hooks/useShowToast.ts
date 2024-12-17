import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastOptions = {
    status: 'success' | 'error' | 'info' | 'warning';
    title: string;
    description: string;
}

export const useShowToast = () => {
    const showToast = ({ status, title, description }: ToastOptions) => {
    const options = {
        type: status,
        position: 'top-center' as ToastPosition,
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };
    // const message = `${title || 'Notification'}\n${description || ''}`;
    // toast(message, options);
    toast(title || 'Notification', options);
    if (description) {
        toast(description, {
        type: 'info',
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
      }
    };
  
    return showToast;
};