/* eslint-disable default-case */
import {
  requestContact,
  requestContactCreate,
  requestContactPartner
} from '@lib/server/form';
import { type IContactAnyRequest } from '@lib/types/contact';

export enum ContactType {
  Pickleball,
  Club,
  ClubCreate,
  League,
  LeagueCreate,
  Tournament,
  TournamentCreate,
  TournamentPartner
}

export const getPlatformInfo = (contactType: ContactType) => {
  let result = {
    name: 'Us',
    url: process.env.NEXT_PUBLIC_PB_URI as string
  };
  switch (contactType) {
    case ContactType.Club:
    case ContactType.ClubCreate:
      result = {
        name: 'Club',
        url: String(`${process.env.NEXT_PUBLIC_PB_URI}/clubs`)
      };
      break;
    case ContactType.League:
    case ContactType.LeagueCreate:
      result = {
        name: 'League',
        url: String(`${process.env.NEXT_PUBLIC_PB_URI}/leagues`)
      };
      break;
    case ContactType.Tournament:
    case ContactType.TournamentCreate:
    case ContactType.TournamentPartner:
      result = {
        name: 'Tournament',
        url: String(process.env.NEXT_PUBLIC_PB_TOURNAMENT_URI)
      };
      break;
  }
  return result;
};

export const usePostContact = (contactType: ContactType, platform?: string) => {
  return (params: IContactAnyRequest) => {
    const body: IContactAnyRequest = { ...params };
    if (!platform) platform = 'pickleball.com';
    switch (contactType) {
      case ContactType.Pickleball:
        return requestContact(body, platform);
      case ContactType.Club:
        return requestContact(body, platform);
      case ContactType.ClubCreate:
        return requestContactCreate(body);
      case ContactType.League:
        return requestContact(body, platform);
      case ContactType.LeagueCreate:
        return requestContactCreate(body);
      case ContactType.Tournament:
        return requestContact(body, platform);
      case ContactType.TournamentCreate:
        return requestContactCreate(body);
      case ContactType.TournamentPartner:
        return requestContactPartner(body);
    }
    return requestContact(body, platform);
  };
};
