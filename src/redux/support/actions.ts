import { createAsyncActionCreators } from '../utils';
import { SendSupportRequestPayload, SendSupportSuccessPayload } from './types';

const SEND_SUPPORT_REQUEST = 'SEND_SUPPORT_REQUEST';
const SEND_SUPPORT_SUCCESS = 'SEND_SUPPORT_SUCCESS';
const SEND_SUPPORT_FAILURE = 'SEND_SUPPORT_FAILURE';

export const sendSupport = createAsyncActionCreators(SEND_SUPPORT_REQUEST, SEND_SUPPORT_SUCCESS, SEND_SUPPORT_FAILURE)<
  SendSupportRequestPayload,
  SendSupportSuccessPayload,
  Error
>();
