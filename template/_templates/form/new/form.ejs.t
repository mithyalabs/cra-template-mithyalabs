---
to: src/Forms/<%= name %>/index.tsx
---
import React from 'react';
import { Formik, FormikConfig,useFormikContext } from 'formik';
import { ReactForm, attachField,MLFormBuilder } from 'react-forms';
import { useFormConfig } from './config';
import * as Yup from 'yup';



export interface <%= name %>FormData {
    
}

export interface <%= name %>FormProps {
    onSubmit: (data: Partial<<%= name %>FormData>) => any,
    initialData: Partial<<%= name %>FormData>
    isSubmitting: boolean
    innerRef?: FormikConfig<Partial<<%= name %>FormData>>['innerRef']
}


const validationSchema = Yup.object({
   
})



const <%= name %>Form: React.FC<<%= name %>FormProps> = (props) => {
    
    return (
        <Formik<Partial<<%= name %>FormData>>
            initialValues={props.initialData}
            onSubmit={props.onSubmit}
            innerRef={props.innerRef}
            validationSchema={validationSchema}
        >
            <FormConsumer isSubmitting={props.isSubmitting}/>
        </Formik>
    )
}

const FormConsumer: React.FC<Pick<<%= name %>FormProps, 'isSubmitting'>> = (props) => {
    const { actionConfig, schema } = useFormConfig()
    const formikProps = useFormikContext();

    return (
        <MLFormBuilder
            schema={schema}
            settings={{ verticalSpacing: 20, horizontalSpacing: 48 }}
            formId='-'
            actionConfig={actionConfig}
            formikProps={formikProps}
            isInProgress={props.isSubmitting}
        />
    )
}



export default <%= name %>Form
