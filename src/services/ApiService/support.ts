import { SendBugRequestPayload, SendFeedbackRequestPayload, SupportSuccessPayload } from '../../redux/support/types';
import { ApiResponse } from '../../types/commons';
import { HTTPMethods } from '../../types/enums';
import API from './api';
import { api } from './utils';

export const sendFeedback = (payload: SendFeedbackRequestPayload['feedback']): Promise<ApiResponse<SupportSuccessPayload>> => {
  return api<SupportSuccessPayload, { data: SendFeedbackRequestPayload['feedback'] }>(API.SEND_FEEDBACK, HTTPMethods.POST, json => ({
    data: json,
  }))({
    data: payload,
  });
};

export const sendBug = (payload: SendBugRequestPayload['feedback']): Promise<ApiResponse<SupportSuccessPayload>> => {
  return api<SupportSuccessPayload, { data: SendBugRequestPayload['feedback'] }>(API.SEND_BUG, HTTPMethods.POST, json => ({ data: json }))({
    data: payload,
  });
};
