import { SendBugRequestPayload, SendFeedbackRequestPayload, SupportSuccessPayload } from '../../redux/support/types';
import { ApiResponse } from '../../types/commons';
import { HTTPMethods } from '../../types/enums';
import API from './api';
import { api } from './utils';

export const sendFeedback = (payload: SendFeedbackRequestPayload['feedback']): Promise<ApiResponse<SupportSuccessPayload>> => {
  return api<SupportSuccessPayload, { feedback: SendFeedbackRequestPayload['feedback'] }>(API.SEND_FEEDBACK, HTTPMethods.POST, json => ({
    data: json,
  }))({
    feedback: payload,
  });
};

export const sendBug = (payload: SendBugRequestPayload['feedback']): Promise<ApiResponse<SupportSuccessPayload>> => {
  return api<SupportSuccessPayload, { feedback: SendBugRequestPayload['feedback'] }>(API.SEND_BUG, HTTPMethods.POST, json => ({ data: json }))({
    feedback: payload,
  });
};
