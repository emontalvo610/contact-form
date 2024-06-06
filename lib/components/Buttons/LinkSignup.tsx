import { useEffect, useState } from 'react';

const LinkSignup = () => {
  const [redirect, setRedirect] = useState('/');

  useEffect(() => {
    setRedirect(window.location.href);
  }, []);

  return (
    <a href={`${process.env.NEXT_PUBLIC_PB_SSO_URI}?redirect=${redirect}`}>
      Click here to create a Pickleball.com account
    </a>
  );
};

export default LinkSignup;
