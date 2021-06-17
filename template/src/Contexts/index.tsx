import React from 'react';
import AppDialogProvider from './AppDialogContext';
import AppToastProvider from './AppToastContext';

const RootContextProviders: React.FC = (props) => {
    const { children } = props;
    return (
        <AppDialogProvider>
            <AppToastProvider>{children}</AppToastProvider>
        </AppDialogProvider>
    );
};

export default RootContextProviders;
