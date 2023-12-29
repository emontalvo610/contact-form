/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import type { ContactType } from '@lib/hooks/contact';
import { getPlatformInfo } from '@lib/hooks/contact';
import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';

import LogoButton from '../Buttons/LogoButton';

interface IFormProps {
  contactType: ContactType;
}

export default function ThankYouForm(props: IFormProps) {
  const platformInfo = getPlatformInfo(props.contactType);

  return (
    <div className="flex w-[100vw] flex-col items-center self-start pt-40 sm:pt-28">
      <div className="pb-8">
        <LogoButton />
      </div>
      <div className="box-border flex w-[450px] flex-col items-center rounded-[12px] bg-white text-center sm:h-full sm:w-full sm:max-w-[420px] sm:pb-4">
        <div className="text-[30px] font-semibold leading-9 sm:text-[20px]">
          Thank you for <strong>Contacting {platformInfo.name}!</strong>
        </div>
        <div className="spacing mt-3 text-center text-[20px] font-normal leading-8 text-gray-600 sm:text-md">
          Your request has been submitted. Someone will get back to you. In the
          meantime feel free to browse around.
        </div>
        <div className="mt-5 w-full">
          <Link href={platformInfo.url}>
            <Button variant="primary" className="btn-submit" type="submit">
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
