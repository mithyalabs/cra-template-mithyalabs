import { useContext } from 'react';
import { get } from 'lodash';
import { AppToastContext } from '../Contexts/AppToastContext';

const SUCCESS_TOAST_MESSAGE = 'Success';
const ERROR_TOAST_MESSAGE = 'Something went wrong';

/**
 * A hook for toast handling
 * @returns a function
 * @example
 * const withToast = useToastMessage(); // import useToastMessage first
 * const submitForm = async (formData: any) =>  await withToast(async () => {
 *      // do your async function and throw the error
 *  },
 *  {
 *      showApiErrorMsg: false, // without this flag, error message from api is displayed in toast
 *      successToastMessage: 'Form submitted successfully',
 *      errorToastMessage: 'Error submitting form',
 *  });
 */
export default () => {
    const { showToast } = useContext(AppToastContext);

    const withToast = async (
        action: () => any,
        toastConfig: WithToastConfig = {}
    ) => {
        try {
            const res = await action();
            showToast(toastConfig.successToastMessage || SUCCESS_TOAST_MESSAGE, {
                variant: 'success',
            });
            return res;
        } catch (error) {
            const msg =
                toastConfig.showApiErrorMsg === false
                    ? toastConfig.errorToastMessage || ERROR_TOAST_MESSAGE
                    : get(error, 'response.data.error.message') || error.message;
            showToast(msg, { variant: 'error' });
            throw error;
        }
    };

    return withToast;
};

export interface WithToastConfig {
    successToastMessage?: string;
    errorToastMessage?: string;
    showApiErrorMsg?: boolean;
}
