import { SendBugRequestPayload, SendFeedbackRequestPayload, SupportSuccessPayload } from '../../redux/Support/types';
import { ApiResponse } from '../../types/commons';
import { HTTPMethods } from '../../types/enums';
import API from './api';
import { api } from './utils';

export const sendFeedback = (payload: SendFeedbackRequestPayload): Promise<ApiResponse<SupportSuccessPayload>> => {
  return api<SupportSuccessPayload, { data: SendFeedbackRequestPayload }>(API.SEND_FEEDBACK, HTTPMethods.POST, json => ({ data: json.referenceNumber }))({
    data: payload,
  });
};

export const sendBug = (payload: SendBugRequestPayload): Promise<ApiResponse<SupportSuccessPayload>> => {
  return api<SupportSuccessPayload, { data: SendBugRequestPayload }>(API.SEND_BUG, HTTPMethods.POST, json => ({ data: json.referenceNumber }))({
    data: payload,
  });
};
