// withAuth.js
"use client"
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function WithAuth(Component) {
  return function WrappedComponent(props) {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/'); // Redirige a la página de inicio de sesión si el usuario no está autenticado
      }
    }, [token]);

    return <Component {...props} />;
  };
}
