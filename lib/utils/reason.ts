export const ContactReasonMap = {
  Registration: 'Registration',
  MyWebsiteAccount: 'My Website Account',
  Other: 'Other',
  Referees: 'Referees',
  Refunds: 'Refunds',
  RequestPartnerChange: 'Request Partner Change',
  Sponsors: 'Sponsors',
  Vendors: 'Vendors',
  Volunteers: 'Volunteers'
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
