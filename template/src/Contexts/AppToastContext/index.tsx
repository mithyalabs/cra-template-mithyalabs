import React, { FC, useState } from 'react';
import { SnackbarProps } from '@material-ui/core';
import { ToastProps, ToastMessage } from 'mui-wrapper-utils';

interface ContextProps {
    open: boolean;
    message: string;
    variant: ToastProps['variant'];
    showToast: (message: string, options?: Partial<IToastContext>) => void;
    hideToast: () => void;
}

export const AppToastContext = React.createContext<ContextProps>({
    open: false,
    message: '',
    variant: 'success',
    showToast: (message: string, options?: Partial<IToastContext>) => { },
    hideToast: () => { },
});

export interface IToastContext extends SnackbarProps {
    message?: string;
    variant?: ToastProps['variant'];
}

export const useAppToast = (initialState: IToastContext) => {
    const [toastState, setToastState] = useState({
        open: false,
        message: '',
        ...initialState,
    });

    const showToast = (message: string, options?: Partial<IToastContext>) => {
        setToastState({
            ...toastState,
            message,
            open: true,
            ...options,
        });
    };
    const hideToast = () => {
        setToastState({
            ...toastState,
            open: false,
            message: '',
        });
    };
    return {
        showToast,
        hideToast,
        message: toastState.message || '',
        open: toastState.open,
        variant: toastState.variant || 'success',
    };
};

const AppToastProvider: FC = (props) => {
    const { showToast, hideToast, message, open, variant } = useAppToast({
        open: false,
    });
    const { children } = props;
    return (
        <AppToastContext.Provider
            value={{
                message,
                open,
                showToast,
                hideToast,
                variant,
            }}
        >
            {children}
            <ToastMessage
                ContentProps={{ style: { fontSize: 16 } }}
                autoHideDuration={6000}
                message={message}
                open={open}
                variant={variant}
                onClose={hideToast}
            />
        </AppToastContext.Provider>
    );
};

export default AppToastProvider;
