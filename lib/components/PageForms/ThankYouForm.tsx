'use client';

import { Button } from '@pickleballinc/react-ui';
import LogoButton from '../Buttons/LogoButton';

export default function ThankYouForm() {
  return (
    <>
      <div className="flex w-[100vw] flex-col items-center self-start pt-40 sm:pt-28">
        <div className="pb-8">
          <LogoButton />
        </div>
        <div className="box-border flex w-[450px] flex-col items-center rounded-[12px] bg-white sm:h-full sm:w-full sm:max-w-[420px] sm:pb-4">
          <div className="text-[30px] font-semibold leading-9 sm:text-[20px]">
            Thank you for <strong>Contacting Us!</strong>
          </div>
          <div className='text-[20px] sm:text-md font-normal leading-8 text-gray-600 mt-3 text-center spacing'>
            Your request has been submitted. Someone will get back to you.
            In the meantime feel free to browse around.
          </div>
          <Button
            variant="primary"
            className="btn-submit mt-5"
            type="submit"
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
