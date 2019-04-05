export interface SendFeedbackRequestPayload {
  feedback: string;
}

export interface SendBugRequestPayload {
  feedback: string;
}

export interface SupportErrorPayload {
  status: string;
  code?: string;
  message?: string;
}
