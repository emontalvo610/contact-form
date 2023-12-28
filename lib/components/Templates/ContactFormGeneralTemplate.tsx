'use client';

import TermsAndPolicy from '@components/Footers/TermsAndPolicy';
import type { ContactType } from '@lib/hooks/contact';
// import { usePostContact } from '@lib/hooks/contact';
import { useGetCountries } from '@lib/hooks/country';
import { validateRecaptchaToken } from '@lib/server/recaptcha';
import type { IContactRequest } from '@lib/types/contact';
import type { ILocation } from '@lib/types/location';
import type { ICountrySelectOption, ISelectOption } from '@lib/types/select';
import type { IUser } from '@lib/types/user';
import { getLocationFromIP } from '@lib/utils/location';
import {
  clubNameValidatorOptions,
  descriptionValidatorOptions,
  emailValidatorOptions,
  firstNameValidatorOptions,
  lastNameValidatorOptions,
  phoneNumberValidatorOptions,
  venuAddressValidatorOptions,
  venuNameValidatorOptions
} from '@lib/validators/form-validation';
import { Button, InputField, Select, TextArea } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import LogoButton from '../Buttons/LogoButton';
import Spinner from '../Loadings/Spinner';
import AlertWrapper from '../Wrappers/AlertWrapper';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

interface IFormProps {
  ip: string;
  title: string;
  subtitle: string;
  alertContent?: ReactNode;
  contactReasonOptions?: Array<ISelectOption>;
  shouldIncludeClub?: boolean;
  clubTypeOptions?: Array<ISelectOption>;
  mixDoubleSkillOptions?: Array<ISelectOption>;
  contactType: ContactType;
  user?: IUser;
}

export default function ContactFormGeneralTemplate(props: IFormProps) {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState(true);
  const { data: countriesData } = useGetCountries();
  const isSubmitted = useRef<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [defaultCountryCodeOption, setDefaultCountryCodeOption] =
    useState<ICountrySelectOption | null>(null);
  // const postContact = usePostContact(props.contactType);

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
  } = useForm<IContactRequest>({
    defaultValues: {
      email: props.user?.email || '',
      firstName: props.user?.firstName || '',
      lastName: props.user?.lastName || '',
      phoneNumber: props.user?.phone
    }
  });

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
    const { phoneCountryId, contactReason, clubType, mixDoubleSkill } =
      getValues();
    let valid = true;
    if (phoneCountryId) {
      clearErrors('phoneCountryId');
    } else {
      setError('phoneCountryId', { message: 'Country is required' });
      valid = false;
    }
    if (Number(props.contactReasonOptions?.length) > 0) {
      if (contactReason) {
        clearErrors('contactReason');
      } else {
        setError('contactReason', { message: 'Reason is required' });
        valid = false;
      }
    }
    if (props.shouldIncludeClub) {
      if (clubType) {
        clearErrors('clubType');
      } else {
        setError('clubType', { message: 'Club type is required' });
        valid = false;
      }
    }
    if (Number(props.mixDoubleSkillOptions?.length) > 0) {
      if (mixDoubleSkill) {
        clearErrors('mixDoubleSkill');
      } else {
        setError('mixDoubleSkill', { message: 'Mix Double Skill is required' });
        valid = false;
      }
    }
    return valid;
  };

  const getDefaultCountryCodeOption = () => {
    const countryOptions = getCountryCodesOptions();
    let result;
    if (props.user?.phoneCountryId) {
      result = countryOptions.find(
        country => country.value === props.user?.phoneCountryId
      );
    } else if (location?.error) {
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
    const selectedReasonOption = props.contactReasonOptions?.find(
      option => option.value === selectedReason
    );
    return selectedReasonOption;
  };

  const getSelectedClubTypeOption = () => {
    const clubType = watch('clubType');
    const selectedClubTypeOption = props.clubTypeOptions?.find(
      option => option.value === clubType
    );
    return selectedClubTypeOption;
  };

  const getSelectedMixDoubleSkillOption = () => {
    const mixDoubleSkill = watch('mixDoubleSkill');
    const selectedMixDoubleSkillOption = props.mixDoubleSkillOptions?.find(
      option => option.value === mixDoubleSkill
    );
    return selectedMixDoubleSkillOption;
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
        // const {
        //   firstName,
        //   lastName,
        //   email,
        //   phoneNumber,
        //   phoneCountryId,
        //   contactReason,
        //   description,
        //   clubName,
        //   clubType,
        //   venuName,
        //   venuAddress,
        //   mixDoubleSkill
        // } = getValues();
        // Request contact
        // await postContact(getValues());
        router.push('/request-success');
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
    <div className="flex w-[100vw] flex-col items-center self-start pt-10 sm:pt-2">
      <div className="pb-8">
        <LogoButton />
      </div>
      <div className="box-border flex w-[512px] flex-col items-center rounded-[12px] bg-white sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
        <div className="text-center text-[30px] font-semibold leading-9 sm:text-[24px]">
          {props.title}
        </div>
        <div className="mt-3 text-center text-md font-normal leading-6 text-gray-600">
          {props.subtitle}
        </div>
        {props.alertContent && (
          <div className="mt-8">
            <AlertWrapper>{props.alertContent}</AlertWrapper>
          </div>
        )}
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
            <div className="mt-3 flex flex-col gap-3 text-left">
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
              <div className="min-w-[120px] basis-[140px] sm:basis-[30%]">
                <div className="input-label">Country</div>
                <Select
                  options={getCountryCodesOptions()}
                  className="select-basic"
                  instanceId="country-code-select"
                  placeholder=""
                  onChange={option => onSelectChange(option, 'phoneCountryId')}
                  value={
                    getSelectedCountryCodeOption() || defaultCountryCodeOption
                  }
                />
                <ErrorWrapper>{errors.phoneCountryId?.message}</ErrorWrapper>
              </div>
              <div className="max-w-[200px] flex-1">
                <InputField
                  label="Phone Number"
                  maxLength={13}
                  className="input-basic"
                  {...register('phoneNumber', phoneNumberValidatorOptions)}
                />
                <ErrorWrapper>{errors.phoneNumber?.message}</ErrorWrapper>
              </div>
            </div>
            {Number(props.contactReasonOptions?.length) > 0 && (
              <div className="mt-3 text-left">
                <div className="input-label">Reason for Contact</div>
                <Select
                  className="select-basic"
                  instanceId="reason-select"
                  placeholder=""
                  options={props.contactReasonOptions}
                  value={getSelectedReasonOption()}
                  onChange={option => onSelectChange(option, 'contactReason')}
                />
                <ErrorWrapper>{errors.contactReason?.message}</ErrorWrapper>
              </div>
            )}
            {Number(props.mixDoubleSkillOptions?.length) > 0 && (
              <div className="mt-3 text-left">
                <div className="input-label">Mix Double Skill</div>
                <Select
                  className="select-basic"
                  instanceId="mix-double-skill-select"
                  placeholder="Select a Type"
                  options={props.mixDoubleSkillOptions}
                  value={getSelectedMixDoubleSkillOption()}
                  onChange={option => onSelectChange(option, 'mixDoubleSkill')}
                />
                <ErrorWrapper>{errors.mixDoubleSkill?.message}</ErrorWrapper>
              </div>
            )}
            {props.shouldIncludeClub && (
              <>
                <div className="mt-1 text-left">
                  <InputField
                    label="Club Name"
                    className="input-basic"
                    autoFocus
                    {...register('clubName', clubNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.clubName?.message}</ErrorWrapper>
                </div>
                <div className="mt-3 text-left">
                  <div className="input-label">Club Type</div>
                  <Select
                    className="select-basic"
                    instanceId="clubtype-select"
                    placeholder="Select a Type"
                    options={props.clubTypeOptions}
                    value={getSelectedClubTypeOption()}
                    onChange={option => onSelectChange(option, 'clubType')}
                  />
                  <ErrorWrapper>{errors.clubType?.message}</ErrorWrapper>
                </div>
                <div className="mt-1 text-left">
                  <InputField
                    label="Venu Name"
                    className="input-basic"
                    autoFocus
                    {...register('venuName', venuNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.venuName?.message}</ErrorWrapper>
                </div>
                <div className="mt-3 text-left">
                  <div className="input-label">Venu Address</div>
                  <TextArea
                    className="textarea-basic resize-y"
                    {...register('venuAddress', venuAddressValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.venuAddress?.message}</ErrorWrapper>
                </div>
              </>
            )}
            <div className="mt-3 text-left">
              <div className="input-label">Description</div>
              <TextArea
                className="textarea-basic resize-y"
                {...register('description', descriptionValidatorOptions)}
              />
              <ErrorWrapper>{errors.description?.message}</ErrorWrapper>
            </div>
            {!recaptchaResult && (
              <ErrorWrapper>
                We were unable to verify that you are not a robot. Please ensure
                your browser has cookies and JavaScript enabled.
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
        <div className="my-8 sm:mb-2">
          <TermsAndPolicy />
        </div>
      </div>
    </div>
  );
}
