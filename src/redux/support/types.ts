export interface SendFeedbackRequestPayload {
  // email?: string;
  feedback: string;
}

export interface SendBugRequestPayload {
  // description: string;
  // email?: string;
  // steps: string;
  // subject: string;
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
