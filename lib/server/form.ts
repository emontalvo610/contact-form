import type {
  IContactCreateRequest,
  IContactPartnerRequest,
  IContactRequest
} from '@lib/types/contact';
import axios from 'axios';

export const requestContact = (body: IContactRequest, platform: string) => {
  const apiUrl = `/api/contact/v2/contact_forms?platform=${platform}`;
  return axios.post(apiUrl, body);
};

export const requestContactCreate = (body: IContactCreateRequest) => {
  const apiUrl = '/api/contact/v2/contact_forms_create_module';
  return axios.post(apiUrl, body);
};

export const requestContactPartner = (body: IContactPartnerRequest) => {
  const apiUrl = '/api/contact/v2/contact_forms_request_partner';
  return axios.post(apiUrl, body);
};
