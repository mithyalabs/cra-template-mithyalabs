import { DialogProps, AppDialog } from 'mui-wrapper-utils';
import React, { FC, useState } from 'react';

interface ContextProps {
    open: boolean;
    title: string;
    content: React.ReactNode;
    showDialog: (content: React.ReactNode, options?: Partial<IAppDialog>) => void;
    hideDialog: () => void;
}

export const AppDialogContext = React.createContext<ContextProps>({
    open: false,
    title: '',
    content: null,
    showDialog: (content: React.ReactNode, options?: Partial<IAppDialog>) => { },
    hideDialog: () => { },
});

export interface IAppDialog extends DialogProps {
    content?: React.ReactNode;
}

export const useAppDialog = (initialState: IAppDialog) => {
    const [dialogState, setDialogState] = useState(initialState);

    const showDialog = (
        content: React.ReactNode,
        options?: Partial<IAppDialog>
    ) => {
        setDialogState({
            ...dialogState,
            open: true,
            content,
            ...options,
        });
    };
    const hideDialog = () => {
        setDialogState({
            ...dialogState,
            open: false,
        });
    };
    return { ...dialogState, showDialog, hideDialog };
};

export const AppDialogProvider: FC = (props) => {
    const {
        content,
        title = '',
        showDialog,
        hideDialog,
        open,
        ...appDialogProps
    } = useAppDialog({
        handleClose: () => { },
        title: '',
        open: false,
    });
    const { children } = props;
    return (
        <AppDialogContext.Provider
            value={{
                title,
                content,
                showDialog,
                hideDialog,
                open,
            }}
        >
            {children}
            <AppDialog
                {...appDialogProps}
                open={open}
                title={title}
                handleClose={hideDialog}
            >
                {content}
            </AppDialog>
        </AppDialogContext.Provider>
    );
};
export default AppDialogProvider;
