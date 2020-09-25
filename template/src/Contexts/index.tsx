import React from 'react';
import AppDialogProvider from "./AppDialogContext"
import AppToastProvider from './AppToastContext';


const RootContextProviders: React.FC = (props) => {

    return (
        <AppDialogProvider>
            <AppToastProvider>
                {props.children}
            </AppToastProvider>
        </AppDialogProvider>
    )
}

export default RootContextProviders