import * as React from 'react';

import ErrorMessage from '../components/ErrorMessage';

export const renderError = (error: string | undefined, touched?: boolean) => (error && touched ? () => <ErrorMessage>{error}</ErrorMessage> : undefined);
