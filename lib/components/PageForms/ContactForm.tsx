'use client';

import TermsAndPolicy from '@components/Footers/TermsAndPolicy';
import {
  Button,
  InputField,
  Select,
  TextArea
} from '@pickleballinc/react-ui';
import LogoButton from '../Buttons/LogoButton';
import Spinner from '../Loadings/Spinner';
import ErrorWrapper from '../Wrappers/ErrorWrapper';
import HelpAlert from '../Alerts/HelpAlert';

interface IFormProps {
}

export default function ContactForm(props: IFormProps) {
  return (
    <>
      <div className="flex w-[100vw] flex-col items-center self-start pt-10 sm:pt-2">
        <div className="pb-8">
          <LogoButton />
        </div>
        <div className="box-border flex w-[512px] flex-col items-center rounded-[12px] bg-white sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="text-[30px] font-semibold leading-9 sm:text-[24px]">
            Contact us
          </div>
          <div className='text-md font-normal leading-6 text-gray-600 mt-3 text-center'>
            Complete the form below and we'll get back to you.
          </div>
          <div className='mt-8'>
            <HelpAlert />
          </div>
          <div className="mt-10 w-full">
            <form autoComplete="off">
              <div className="mt-1 text-left">
                <InputField
                  label="Email"
                  className="input-basic"
                  autoFocus
                />
                <ErrorWrapper>Email is required</ErrorWrapper>
              </div>
              <div className="mt-3 flex flex-wrap gap-5 text-left sm:flex-col">
                <div className="flex-1">
                  <InputField
                    label="First Name"
                    className="input-basic"
                    autoFocus
                  />
                  <ErrorWrapper>First Name is required</ErrorWrapper>
                </div>
                <div className="flex-1">
                  <InputField
                    label="Last Name"
                    className="input-basic"
                  />
                  <ErrorWrapper>Last Name is required</ErrorWrapper>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-5 text-left sm:gap-2">
                <div className="basis-[140px] sm:basis-[30%]">
                  <div className="input-label">Mobile Phone</div>
                  <Select
                    options={[]}
                    className="select-basic"
                    instanceId="country-code-select"
                    placeholder=""
                  />
                  <ErrorWrapper>Country is required</ErrorWrapper>
                </div>
                <div className="flex-1">
                  <InputField
                    label="Phone Number"
                    maxLength={10}
                    className="input-basic"
                  />
                  <ErrorWrapper>Phone number is required</ErrorWrapper>
                </div>
              </div>
              <div className="mt-3 text-left">
                <div className="input-label">Reason for Contact</div>
                <Select
                  className="select-basic"
                  instanceId="country-select"
                  placeholder=""
                />
              </div>
              <div className='mt-3 text-left'>
                <div className="input-label">Description</div>
                <TextArea className="textarea-basic" />
              </div>
              {!false && (
                <ErrorWrapper>
                  We were unable to verify that you are not a robot. Please
                  ensure your browser has cookies and JavaScript enabled.
                </ErrorWrapper>
              )}
              <Button
                variant="primary"
                className="btn-submit mt-10"
                type="submit"
              >
                {true && <Spinner />}
                Send Request
              </Button>
              <ErrorWrapper>Request failed</ErrorWrapper>
            </form>
          </div>
          <div className="mt-8 mb-8 sm:mb-2">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </>
  );
}
