/* eslint-disable default-case */
import type { IContactRequest } from '@lib/types/contact';
import axios from 'axios';

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

export const usePostContact = (contactType: ContactType) => {
  return (body: IContactRequest) => {
    let apiUrl;
    switch (contactType) {
      case ContactType.Pickleball:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
      case ContactType.Club:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
      case ContactType.ClubCreate:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
      case ContactType.League:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
      case ContactType.LeagueCreate:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
      case ContactType.Tournament:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
      case ContactType.TournamentCreate:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
      case ContactType.TournamentPartner:
        apiUrl = '/api/proxy/v1/pub/contacts';
        break;
    }
    return axios.post(apiUrl, { payload: body });
  };
};
