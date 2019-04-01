import { ApiResponseStatus, ApiSuccessResponse } from '../../../types/commons';
import { SendBug, SendFeedback } from '../support';

/**
 * Send feedback
 */
export const sendFeedback: SendFeedback = feedback => {
  const response: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};

/**
 * Send bug report
 */
export const sendBug: SendBug = feedback => {
  const response: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};
