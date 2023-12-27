export const ClubTypeMap = {
  "Association": "Association",
  "Club": "Club",
  "Company": "Company",
  "Digital": "Digital",
  "Facility": "Facility",
  "Federation": "Federation",
  "GovernmentDept": "Government Dept.",
  "NotForProfit": "Not For Profit",
  "ParkRecreation": "Park & Recreation",
  "PickleballTour": "Pickleball Tour",
  "Resort": "Resort"
} as const;

export type ClubType = keyof typeof ClubTypeMap;

export const allClubTypes: ClubType[] = Object.keys(ClubTypeMap) as ClubType[];

export const getClubTypeOptions = (clubTypes: ClubType[]) => {
  const options = [];
  for (const key of clubTypes) {
    options.push({
      value: key,
      label: ClubTypeMap[key]
    })
  }
  return options;
};