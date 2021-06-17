---
to: src/Forms/<%= name %>/config.tsx
---
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormConfig, IFormActionProps } from 'react-forms';





export const useFormConfig = () => {
    const classes = useStyles();
   
    const actionConfig: IFormActionProps = {
        submitButtonText: 'NEXT',
        displayActions: false,
        submitButtonLayout: 'fullWidth',
        submitButtonProps: {
            size: 'large'
        },
        containerClassNames: classes.buttonContainer
    };
    const schema: Array<Array<FormConfig> | FormConfig> = [
        
    ];
    return { actionConfig, schema }
}




const useStyles = makeStyles((theme: Theme) => createStyles({
    buttonContainer: {

    },
     textField: {
        margin: '16px 0px',
    }
}))