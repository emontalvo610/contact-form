/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

type ILinkButtonProps = PropsWithChildren<{
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}>;

const LinkButton = ({
  disabled,
  children,
  href,
  onClick
}: ILinkButtonProps) => {
  return (
    <Button
      size="md"
      variant="secondary"
      className="btn-link"
      onClick={onClick}
      disabled={disabled}
    >
      {href && (
        <Link className="btn-link" href={href} target="_blank">
          {children}
        </Link>
      )}
      {!href && <div className="btn-link">{children}</div>}
    </Button>
  );
};

export default LinkButton;
