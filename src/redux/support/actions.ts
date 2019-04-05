import { createAsyncActionCreators } from '../utils';
import { SendBugRequestPayload, SendFeedbackRequestPayload } from './types';

const SEND_FEEDBACK_REQUEST = 'SEND_FEEDBACK_REQUEST';
const SEND_FEEDBACK_SUCCESS = 'SEND_FEEDBACK_SUCCESS';
const SEND_FEEDBACK_FAILURE = 'SEND_FEEDBACK_FAILURE';

const SEND_BUG_REQUEST = 'SEND_BUG_REQUEST';
const SEND_BUG_SUCCESS = 'SEND_BUG_SUCCESS';
const SEND_BUG_FAILURE = 'SEND_BUG_FAILURE';

export const sendFeedback = createAsyncActionCreators(SEND_FEEDBACK_REQUEST, SEND_FEEDBACK_SUCCESS, SEND_FEEDBACK_FAILURE)<
  SendFeedbackRequestPayload['feedback'],
  undefined,
  Error
>();

export const sendBug = createAsyncActionCreators(SEND_BUG_REQUEST, SEND_BUG_SUCCESS, SEND_BUG_FAILURE)<SendBugRequestPayload['feedback'], undefined, Error>();
