'use client';

import type { FC, PropsWithChildren } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const GoogleRecaptchaWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default GoogleRecaptchaWrapper;
