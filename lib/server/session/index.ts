import {
  createGetIronSession,
  createGetServerActionIronSession,
  createSealData,
  createUnsealData
} from './session-lib';

export * from './session-lib';
export const sealData = createSealData();
export const unsealData = createUnsealData();
export const getIronSession = createGetIronSession(sealData, unsealData);
export const getServerActionIronSession = createGetServerActionIronSession(
  sealData,
  unsealData
);
