import { SendBugRequestPayload, SendFeedbackRequestPayload } from '../../redux/support/types';
import { ApiResponse } from '../../types/commons';
import { HTTPMethods } from '../../types/enums';
import API from './api';
import { api } from './utils';

export const sendFeedback = (payload: SendFeedbackRequestPayload['feedback']): Promise<ApiResponse<undefined>> => {
  return api<undefined, { feedback: SendFeedbackRequestPayload['feedback'] }>(API.SEND_FEEDBACK, HTTPMethods.POST, _ => ({ data: undefined }))({
    feedback: payload,
  });
};
export type SendFeedback = typeof sendFeedback;

export const sendBug = (payload: SendBugRequestPayload['feedback']): Promise<ApiResponse<undefined>> => {
  return api<undefined, { feedback: SendBugRequestPayload['feedback'] }>(API.SEND_BUG, HTTPMethods.POST, _ => ({ data: undefined }))({
    feedback: payload,
  });
};
export type SendBug = typeof sendBug;
