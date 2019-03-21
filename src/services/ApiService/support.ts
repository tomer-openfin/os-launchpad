import { SendSupportRequestPayload, SendSupportSuccessPayload } from '../../redux/support/types';
import { ApiResponse } from '../../types/commons';
import { HTTPMethods } from '../../types/enums';
import API from './api';
import { api } from './utils';

/**
 * Send support form
 */
export const sendSupport = (payload: SendSupportRequestPayload): Promise<ApiResponse<SendSupportSuccessPayload>> => {
  return api<SendSupportSuccessPayload, { data: SendSupportRequestPayload }>(API.SEND_SUPPORT, HTTPMethods.POST, json => ({ data: json.referenceNumber }))({
    data: payload,
  });
};
