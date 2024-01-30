import React, {Fragment, useState} from 'react'
import {formData, schema, uiSchema} from "./data";

import {Form} from "@rjsf/material-ui";
import validator from '@rjsf/validator-ajv8';
import { Button, FormHelperText, Grid, IconButton, TextField, FormLabel, Slider } from '@material-ui/core';



const ConfigurationNew = () => {

    const [invalidFormDataAttempted, setInvalidFormDataAttempted] = useState(false);
    const [jsonFormsData, setJsonFormsData] = useState<FormData | undefined>(parseJsonFormsData(undefined));

    return (
        <div>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                noHtml5Validate={true}
                validator={validator}

                showErrorList={'top'}
                liveValidate={invalidFormDataAttempted}

                // widgets={widgets}
                // transformErrors={checkContextLinks}
                // onChange={({formData}) => setJsonFormsData(formData)}

                // onSubmit={({formData, schema}) => {
                //     const formName = (schema.required as string[])[0]
                //     setInvalidFormDataAttempted(false)
                //     onFormSubmit(formData, currentOption, formName, contextChangedByForm);
                // }}
                onError={() => {
                    setInvalidFormDataAttempted(true)
                }}
            >
                <Grid container justifyContent="space-between">
                    <Grid container wrap="nowrap" style={{width: "60%"}}>
                        <Button variant="contained" type="submit"
                                color="primary">Submit</Button>
                        <Button variant="contained"
                                style={{marginLeft: "5px"}}
                        >clear</Button>
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}

export default ConfigurationNew


const widgets = {
    range: CustomRangeWidget,
}
function CustomRangeWidget({value, readonly, disabled, onBlur, onFocus, schema, onChange, required, label, id}: any): JSX.Element {
    const sliderProps = {value, label, id, ...rangeSpec(schema)}
    const _onChange = (_: any, value?: number | number[]) => onChange && onChange(value)
    const _onBlur = () => onBlur && onBlur(id, value)
    const _onFocus = () => onFocus && onFocus(id, value)

    return (
        <Fragment>
            <FormLabel required={required} id={id}>
                {label}
            </FormLabel>
            <Slider
                disabled={disabled || readonly}
                onChange={_onChange}
                onBlur={_onBlur}
                onFocus={_onFocus}
                valueLabelDisplay="auto"
                {...sliderProps}
            />
        </Fragment>
    )
}
function rangeSpec(schema: any) {
    const spec: any = {};
    if (schema.multipleOf) {
        spec.step = schema.multipleOf;
    }
    if (schema.minimum || schema.minimum === 0) {
        spec.min = schema.minimum;
    }
    if (schema.maximum || schema.maximum === 0) {
        spec.max = schema.maximum;
    }
    return spec;
}



function checkContextLinks(errors: any[]) {
    const regexForStringPath = /(?<=\[')(.*?)(?=\'])|(?<=\[)([0-9])(?=\])/g
    const enabledLinksMap = new Map([])
    return errors.reduce((acc: any[], error) => {
        const id = ['root', ...(error.property.match(regexForStringPath)?.slice() || []), error.property.split('.').pop()].join('_')
        const result = enabledLinksMap.has(id)
        return result ? acc : [...acc, error]
    }, [])
}


function parseJsonFormsData(data: any) {
    const dataCrowler = (obj: any) => {
        for (const property in obj){
            if(obj[property] === null){
                obj[property] = undefined
            }else if(typeof obj[property] === 'object' || Array.isArray(obj[property])){
                dataCrowler(obj[property])
            }
        }
    }
    if(data !== undefined){
        dataCrowler(data)
    }
    return data
}
