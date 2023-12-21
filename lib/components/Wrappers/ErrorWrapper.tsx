'use client';

import type { FC, PropsWithChildren } from 'react';

const ErrorWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={`text-sm text-red-700 ${children ? 'my-2' : ''}`}>
      {children}
    </div>
  );
};

export default ErrorWrapper;
