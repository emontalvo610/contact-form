export const MixDoubleSkillMap = {
  '2.0': '2.0',
  '2.5': '2.5',
  '3.0': '3.0',
  '3.5': '3.5',
  '4.0': '4.0',
  '4.5': '4.5',
  '5.0': '5.0',
  '5.5': '5.5',
  '6.0': '6.0',
  '6.5': '6.5',
  '7.0': '7.0',
  '7.5': '7.5',
  '8.0': '8.0'
} as const;

export type MixDoubleSkillType = keyof typeof MixDoubleSkillMap;

export const allMixDoubleSkills: MixDoubleSkillType[] = Object.keys(
  MixDoubleSkillMap
) as MixDoubleSkillType[];

export const getAllMixDoubleSkillOptions = () => {
  const options = [];
  for (const key of allMixDoubleSkills) {
    options.push({
      value: key,
      label: MixDoubleSkillMap[key]
    });
  }
  return options;
};
