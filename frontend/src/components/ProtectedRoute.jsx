import {navigate} from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
   return <navigate to="/login" />;
    return null;
  }

  return children;
}