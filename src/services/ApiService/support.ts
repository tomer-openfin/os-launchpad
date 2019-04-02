import { SendBugRequestPayload, SendFeedbackRequestPayload } from '../../redux/support/types';
import { HTTPMethods } from '../../types/enums';
import API from './api';
import { api } from './utils';

export const sendFeedback = api<undefined, SendFeedbackRequestPayload>(API.SEND_FEEDBACK, HTTPMethods.POST, _ => ({ data: undefined }));

export type SendFeedback = typeof sendFeedback;

export const sendBug = api<undefined, SendBugRequestPayload>(API.SEND_BUG, HTTPMethods.POST, _ => ({ data: undefined }));

export type SendBug = typeof sendBug;
