export const ContactReasonMap = {
  REGISTRATION_CONTACT_FORM_REASON: 'Registration',
  MY_WEBSITE_ACCOUNT_CONTACT_FORM_REASON: 'My Website Account',
  OTHER_CONTACT_FORM_REASON: 'Other',
  REFEREE_CONTACT_FORM_REASON: 'Referees',
  REFUNDS_CONTACT_FORM_REASON: 'Refunds',
  REQUEST_PARTNER_CHANGE_CONTACT_FORM_REASON: 'Request Partner Change',
  SPONSOR_CONTACT_FORM_REASON: 'Sponsors',
  VENDOR_CONTACT_FORM_REASON: 'Vendors',
  VOLUNTEER_CONTACT_FORM_REASON: 'Volunteers'
} as const;

export type ContactReasonType = keyof typeof ContactReasonMap;

export const getContactReasonOptions = (reasons: ContactReasonType[]) => {
  const options = [];
  for (const key of reasons) {
    options.push({
      value: key,
      label: ContactReasonMap[key]
    });
  }
  return options;
};
