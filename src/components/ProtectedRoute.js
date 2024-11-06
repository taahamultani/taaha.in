import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const fromCatEmoji = sessionStorage.getItem('fromCatEmoji');
    
    if (!fromCatEmoji) {
      alert("404: Secret Access Not Found. Try following something furry... 🐈");
      navigate('/', { replace: true });
    } else {
      setIsAllowed(true);
      sessionStorage.removeItem('fromCatEmoji');
    }
  }, [navigate, location]);

  if (!isAllowed) {
    return null;
  }

  return children;
}

export default ProtectedRoute; 