import { MetaWithCallbacks } from '../types/commons';

export const payloadIdentityCreator = <T>(payload: T): T => payload;

export const metaWithCallbacksCreator = <T extends MetaWithCallbacks>(_, meta: T): T => meta;
