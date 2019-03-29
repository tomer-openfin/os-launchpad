export interface SendFeedbackRequestPayload {
  feedback: string;
}

export interface SendBugRequestPayload {
  feedback: string;
}

export interface SupportSuccessPayload {
  status: string;
  referenceNumber?: string | number;
}

export interface SupportErrorPayload {
  status: string;
  code?: string;
  message?: string;
}
