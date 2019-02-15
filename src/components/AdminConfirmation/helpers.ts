import { MetaWithCallbacks } from '../../types/commons';

export const confirmHandlerCreator = (submit, payload) => (meta: MetaWithCallbacks) => submit(payload, meta);
