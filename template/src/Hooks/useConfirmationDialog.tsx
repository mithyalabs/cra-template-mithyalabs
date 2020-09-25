import { Box, Button, CircularProgress } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppDialogContext } from '../Contexts/AppDialogContext';
import useToastMessage from "./useToastMessage";
import Typo from "../Components/Typo";


const DEFAULT_MESSAGE = 'Confirm action?'



/**
 * A hook for confirmation dialogs
 * @returns a function
 * 
 * @example 
 * const withConfirmation = useConfirmationDialog();
 * const handleDelete = async (id: string) => await withConfirmation(async () => {
 * // do your async task
 * // throw error, if there is an error
 * });
 * 
 */
export default () => {
    const { showDialog, hideDialog } = useContext(AppDialogContext);

    // const getContentComponent = (message: string = DEFAULT_MESSAGE) => {
    //     return (
    //         <Typography>{message}</Typography>
    //     )
    // }


    const getBody = (body: string | JSX.Element) => {

        return typeof body === 'string' ? (
            <Typo>{body}</Typo>
        ) : body
    }


    const withConfirmationDialog = (action: () => any, config: WithConfirmationDialogConfig = {}, toastConfig?: WithConfirmationDialogToastConfig) => {
        const { message, body } = config;
        showDialog(body ? getBody(body) : <div />, {
            headerProps: {
                isCloseButton: false
            },
            isActionCloseButton: false,
            PaperProps: {
                style: {
                    width: 400,
                    padding: 16
                },
            },
            title: message || DEFAULT_MESSAGE,

            actionsChildren: <ActionButton
                agree={action}
                hideDialog={hideDialog}
                config={config}
                toastConfig={toastConfig}
            />
        });
    }


    return withConfirmationDialog
}




const ActionButton: React.FC<ActionButtonProps> = (props) => {
    const {
        agree,
        config,
        toastConfig,
        hideDialog
    } = props;

    const withToast = useToastMessage();
    const [loading, setLoading] = useState(false);
    const isAsync = agree.constructor.name === 'AsyncFunction';

    const accept = async () => {
        if (isAsync) {
            setLoading(true)
            try {
                if (toastConfig) {
                    await withToast(agree, toastConfig)
                } else {
                    await agree();
                }
            } catch (error) {

            }
            setLoading(false)
            hideDialog();
        } else {
            if (toastConfig) {
                withToast(agree, toastConfig);
            }
            agree();
            hideDialog();
        }
    }


    return (
        <Box mr={2} display="flex" alignItems="center">
            <Box mr={1}>
                <Button disabled={loading} onClick={accept}>
                    {loading ? <CircularProgress /> : config.agreeText || 'YES'}
                </Button>
            </Box>
            <Button disabled={loading} variant="contained" color="primary" onClick={hideDialog}>{
                config.cancelText || 'CANCEL'
            }</Button>
        </Box>
    )
}



export interface WithConfirmationDialogConfig {
    message?: string
    body?: JSX.Element | string
    agreeText?: string
    cancelText?: string
}

export interface WithConfirmationDialogToastConfig {
    successToastMessage?: string
    errorToastMessage?: string
}

type ActionButtonProps = {
    agree: (() => void | Promise<void>),
    config: WithConfirmationDialogConfig,
    toastConfig?: WithConfirmationDialogToastConfig,
    hideDialog: () => void
}

