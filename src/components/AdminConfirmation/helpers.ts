import { MetaWithAsyncHandlers } from '../../types/commons';

export const confirmHandlerCreator = (submit, payload) => (meta: MetaWithAsyncHandlers) => submit(payload, meta);
