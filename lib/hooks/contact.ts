import { IContactRequestPayload } from "@lib/types/contact";
import axios from "axios";

export const usePostContact = () => {
  return (body: IContactRequestPayload) => {
    return axios.post('/api/proxy/v1/pub/contacts', { payload: body });
  }
};