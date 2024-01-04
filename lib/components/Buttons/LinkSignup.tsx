import { useEffect, useState } from 'react';

const LinkSignup = () => {
  const [redirect, setRedirect] = useState('/');

  useEffect(() => {
    setRedirect(window.location.href);
  }, []);

  return (
    <a href={`${process.env.NEXT_PUBLIC_PB_SSO_URI}?redirect=${redirect}`}>
      Click here to sign up.
    </a>
  );
};

export default LinkSignup;
