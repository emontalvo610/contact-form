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
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useEffect, useRef, useState } from 'react';
import { ICountrySelectOption, ISelectOption } from '@lib/types/select';
import { getLocationFromIP } from '@lib/utils/location';
import { ILocation } from '@lib/types/location';
import { useGetCountries } from '@lib/hooks/country';
import { useForm } from 'react-hook-form';
import { firstNameValidatorOptions, lastNameValidatorOptions, phoneNumberValidatorOptions, descriptionValidatorOptions, emailValidatorOptions } from '@lib/validators/form-validation';
import { validateRecaptchaToken } from '@lib/server/recaptcha';

interface IFormProps {
  ip: string;
};

const contactReasonOptions = [
  { value: "Registration", label: "Registration" },
  { value: "MyWebsiteAccount", label: "My Website Account" },
  { value: "Other", label: "Other" }
];

type ContactReasonType = "Registration" | "MyWebsiteAccount" | "Other";

interface IContactRequest {
  email: string;
  firstName: string;
  lastName: string;
  phoneCountryId: string;
  phoneNumber: string;
  contactReason: ContactReasonType;
  description: string;
};

export default function ContactForm(props: IFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState(true);
  const { data: countriesData } = useGetCountries();
  const isSubmitted = useRef<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [defaultCountryCodeOption, setDefaultCountryCodeOption] =
    useState<ICountrySelectOption | null>(null);

  const {
    register,
    getValues,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<IContactRequest>();

  useEffect(() => {
    getLocationFromIP(props.ip).then(location => {
      setLocation(location);
    });
  }, []);

  useEffect(() => {
    if (location && countriesData.results.length > 0) {
      const countryCodeOption = getDefaultCountryCodeOption();
      setDefaultCountryCodeOption(countryCodeOption);
    }
  }, [countriesData, location]);

  const getCountryCodesOptions = () => {
    return countriesData.results
      .filter(country => country.internationalCountryCallingCode.length > 0)
      .map(country => {
        return {
          value: country.id,
          label: `${country.abbreviation} (${country.internationalCountryCallingCode})`,
          abbreviation: country.abbreviation
        } as ICountrySelectOption;
      });
  };

  const checkManualValidation = () => {
    const { phoneCountryId, contactReason } = getValues();
    let valid = true;
    if (phoneCountryId) {
      clearErrors('phoneCountryId');
    } else {
      setError('phoneCountryId', { message: 'Country is required' });
      valid = false;
    }
    if (contactReason) {
      clearErrors('contactReason');
    } else {
      setError('contactReason', { message: 'Reason is required' });
      valid = false;
    }
    return valid;
  };

  const getDefaultCountryCodeOption = () => {
    const countryOptions = getCountryCodesOptions();
    let result;
    if (location?.error) {
      result = countryOptions[0];
    } else {
      result = countryOptions.find(
        country => country.abbreviation === location?.country_code_iso3
      );
    }
    setValue('phoneCountryId', result?.value || '');
    return result || null;
  };

  const onSelectChange = (option: unknown, id: keyof IContactRequest) => {
    const { value } = option as ISelectOption;
    setValue(id, value);
    if (isSubmitted.current) checkManualValidation();
  };

  const getSelectedCountryCodeOption = () => {
    const countryCodeOptions = getCountryCodesOptions();
    const selectedCountryId = watch('phoneCountryId');
    const selectedCountry = countryCodeOptions.find(
      country => country.value === selectedCountryId
    );
    return selectedCountry;
  };

  const getSelectedReasonOption = () => {
    const selectedReason = watch('contactReason');
    const selectedReasonOption = contactReasonOptions.find(
      option => option.value === selectedReason
    );
    return selectedReasonOption;
  };
  
  const onClickSubmit = () => {
    isSubmitted.current = true;
    if (checkManualValidation()) trigger();
  };

  const onSubmit = async () => {
    isSubmitted.current = true;
    const isValid = checkManualValidation() && (await trigger());
    if (!isValid) return;
    if (!executeRecaptcha) return;
    let isHuman = false;
    setLoading(true);
    try {
      const token = await executeRecaptcha();
      if (!token) {
        setRecaptchaResult(false);
        setLoading(false);
        return;
      }
      isHuman = await validateRecaptchaToken(token);
      setRecaptchaResult(isHuman);
    } catch (err) {
      console.error(err);
      setRecaptchaResult(false);
    }

    if (isHuman) {
      try {
        const {
          firstName,
          lastName,
          email,
          phoneNumber,
          phoneCountryId,
          contactReason,
          description
        } = getValues();
        // Request contact
        console.log(getValues());
      } catch (err) {
        setError('root.server', {
          message: 'Something went wrong. Please try again some time later'
        });
      } finally {
        setLoading(false);
      }
    }
  };
  
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
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="mt-1 text-left">
                <InputField
                  label="Email"
                  className="input-basic"
                  autoFocus
                  {...register('email', emailValidatorOptions)}
                />
                <ErrorWrapper>{errors.email?.message}</ErrorWrapper>
              </div>
              <div className="mt-3 flex flex-wrap gap-5 text-left sm:flex-col">
                <div className="flex-1">
                  <InputField
                    label="First Name"
                    className="input-basic"
                    {...register('firstName', firstNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.firstName?.message}</ErrorWrapper>
                </div>
                <div className="flex-1">
                  <InputField
                    label="Last Name"
                    className="input-basic"
                    {...register('lastName', lastNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.lastName?.message}</ErrorWrapper>
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
                    onChange={option =>
                      onSelectChange(option, 'phoneCountryId')
                    }
                    value={
                      getSelectedCountryCodeOption() || defaultCountryCodeOption
                    }
                  />
                  <ErrorWrapper>{errors.phoneCountryId?.message}</ErrorWrapper>
                </div>
                <div className="flex-1">
                  <InputField
                    label="Phone Number"
                    maxLength={10}
                    className="input-basic"
                    {...register('phoneNumber', phoneNumberValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.phoneNumber?.message}</ErrorWrapper>
                </div>
              </div>
              <div className="mt-3 text-left">
                <div className="input-label">Reason for Contact</div>
                <Select
                  className="select-basic"
                  instanceId="reason-select"
                  placeholder=""
                  options={contactReasonOptions}
                  value={getSelectedReasonOption()}
                  onChange={option => onSelectChange(option, 'contactReason')}
                />
                <ErrorWrapper>{errors.contactReason?.message}</ErrorWrapper>
              </div>
              <div className='mt-3 text-left'>
                <div className="input-label">Description</div>
                <TextArea
                  className="textarea-basic resize-y"
                  {...register('description', descriptionValidatorOptions)}
                />
                <ErrorWrapper>{errors.description?.message}</ErrorWrapper>
              </div>
              {!recaptchaResult && (
                <ErrorWrapper>
                  We were unable to verify that you are not a robot. Please
                  ensure your browser has cookies and JavaScript enabled.
                </ErrorWrapper>
              )}
              <Button
                variant="primary"
                className="btn-submit mt-10"
                type="submit"
                onClick={onClickSubmit}
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                Send Request
              </Button>
              <ErrorWrapper>{errors.root?.server.message}</ErrorWrapper>
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
