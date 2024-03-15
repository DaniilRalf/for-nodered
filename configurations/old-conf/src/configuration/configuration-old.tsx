import React, {useEffect, useState} from 'react'
import {actualData, Observable, useObservable} from "./data";
import Form from '@rjsf/material-ui';
import { Button, FormHelperText, Grid, IconButton, TextField } from '@material-ui/core';
import { Tooltip, withStyles } from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
const enabledContextLinksList$ = new Observable<[string, string][]>([])
const initNewOptionForm$ = new Observable<string>('')




const ConfigurationOld = () => {

    const currentOption: any = actualData

    const jsonSchema = JSON.parse(currentOption.attributes.find((el: any) => el.name === 'json_schema')?.value || '{}')
    const uiSchema = JSON.parse(currentOption.attributes.find((el: any) => el.name === 'ui_schema')?.value || '{}')
    const [jsonFormsData, setJsonFormsData] = useState<FormData | undefined>(parseJsonFormsData(currentOption.data));
    const [invalidFormDataAttempted, setInvalidFormDataAttempted] = useState(false);

    useEffect(()=>{
        enabledContextLinksList$.set([])
        enabledContextLinksList$.set(Array.from(currentOption?.context || []))
        setJsonFormsData(parseJsonFormsData(currentOption.data))
        setInvalidFormDataAttempted(false)
        initNewOptionForm$.set(Date.now().toString())
    }, [currentOption])

    function onClearBtnClick() {
        setJsonFormsData(undefined)
        enabledContextLinksList$.set([])
        initNewOptionForm$.set(Date.now().toString())
    }

    function onDeleteBtnClick() {
        console.log('====delete=================')
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



    return (
        <div>
            <Form
                schema={jsonSchema}
                uiSchema={uiSchema}
                formData={jsonFormsData}
                noHtml5Validate={true}
                FieldTemplate={CustomFieldTemplate}
                validate={additionalValidation}
                showErrorList={invalidFormDataAttempted}
                liveValidate={invalidFormDataAttempted}
                transformErrors={checkContextLinks}
                onChange={({formData}) => setJsonFormsData(formData)}
                onSubmit={(data: any) => {
                    console.log('=======================')
                    console.log(data)
                    console.log('=======================')
                }}
            >
                <Grid container justifyContent="space-between">
                    <Grid container wrap="nowrap" style={{width: "60%"}}>
                        <Button variant="contained" type="submit" color="primary">{"Submit"}</Button>
                        <Button variant="contained"
                                onClick={onClearBtnClick}
                                style={{marginLeft:"5px"}}
                        >{"Clear"}</Button>
                    </Grid>
                    {currentOption.mId ?
                        <Button variant="contained" color="secondary"
                                style={{justifySelf:"flex-end"}}
                                onClick={onDeleteBtnClick}
                        >{"Delete"}</Button>
                        : null}
                </Grid>
            </Form>
        </div>
    )
}
export default ConfigurationOld


function additionalValidation(formData: any, errors: any) {
    const errorCrowler = (obj: any, prefix: string) => {
        for (const property in obj){
            if(property !== 'addError'){
                if(Object.keys(obj).length === 2 ){
                } else if(property !== '__errors'){
                    errorCrowler(obj[property], prefix + '_' + property)
                }
            }
        }
    }
    errorCrowler(errors, 'root')
    return errors
}

function checkContextLinks(errors: any[]) {
    const regexForStringPath = /(?<=\[')(.*?)(?=\'])|(?<=\[)([0-9])(?=\])/g
    const enabledLinksMap = new Map(enabledContextLinksList$.get())
    return errors.reduce((acc: any[], error) => {
        const id = ['root', ...(error.property.match(regexForStringPath)?.slice() || []), error.property.split('.').pop()].join('_')
        const result = enabledLinksMap.has(id)
        return result ? acc : [...acc, error]
    }, [])
}

function CustomFieldTemplate(props: any) {
    const {id, required, classNames, label, errors, children, schema, disabled, formData, onChange} = props;
    const canUseContext = schema.type === 'string'
        || schema.type === 'boolean'
        || schema.type === 'number'
        || schema.type === 'integer'
        || Array.isArray(schema.type) && schema.type.every((item: any) => { return typeof item === "string" } );

    const enabledContextLinks = useObservable(enabledContextLinksList$);
    const clearForm = useObservable(initNewOptionForm$)

    const [useContextInput, setUseContextInput] = useState<boolean>(false);
    const [linkValue, setLinkValue] = useState<string>('')

    useEffect(()=>{
        setLinkValue('')
    }, [clearForm])

    useEffect(()=>{
        const enabledLinksMap = new Map(enabledContextLinks)
        setUseContextInput(enabledLinksMap.has(id));
        if(enabledLinksMap.has(id)){
            setLinkValue(enabledLinksMap.get(id) as string || linkValue)
        }
    }, [enabledContextLinks, clearForm]);

    useEffect(()=>{
        if(canUseContext && (formData === undefined || formData === null) && useContextInput){
            onChange(schema?.default || undefined)
        }
    }, [useContextInput])

    function onLinkFieldChanged(value: string){
        setLinkValue(value)
        const resultValue = value
        const enabledLinksMap = new Map(enabledContextLinks)
        enabledLinksMap.set(id, resultValue)
        enabledContextLinksList$.set(Array.from(enabledLinksMap));
    }

    function onUseContentBtnClick(){
        const enabledLinksMap = new Map(enabledContextLinks)
        if(!useContextInput){
            enabledLinksMap.set(id, linkValue || '')
        } else {
            enabledLinksMap.delete(id)
        }
        enabledContextLinksList$.set(Array.from(enabledLinksMap));
        setUseContextInput(!useContextInput)
    }

    return (
        <div style={{display: canUseContext ? 'flex' : 'block', alignItems: 'center', flexDirection: 'row'}} className={canUseContext ? 'MuiFormControl-root MuiFormControl-fullWidth' : classNames} key={id}>
            <div style={{flex: '1 0'}} className={canUseContext ? 'MuiFormControl-root MuiFormControl-fullWidth' : ''}>
                {useContextInput
                    ? <TextField
                        label={`(${schema.type === 'string' ? 'link+value' : 'link'})[${schema.type}] ${label}`}
                        value={linkValue}
                        variant="standard"
                        required={required}
                        onChange={e => {onLinkFieldChanged(e.target.value)}}
                        error={!!errors.props.errors && !!(errors.props.errors as Array<string>).length}/>
                    : children}
                {schema.type !== 'object'
                    ? <FormHelperText>{schema.description}</FormHelperText>
                    : null}
                {errors.props.errors
                    ? (errors.props.errors as string[]).map((e, i) => <FormHelperText error key={`${id}-error${i}`}>{e}</FormHelperText>)
                    : null}
            </div>
            {canUseContext && !disabled
                ? <CustomTooltip title={!useContextInput ? "Use context" : "Use manual"}
                                 arrow
                                 placement='bottom'>
                    <IconButton onClick={()=>onUseContentBtnClick()}>{!useContextInput ? <LinkIcon/> : <LinkOffIcon/>}</IconButton>
                </CustomTooltip>
                : <span></span>}
        </div>
    );
}

const CustomTooltip = ({container, ...props }: any) => {
    const extendedProps: any = {
        ...props,
        PopperProps: {
            container: container,
        }
    }
    const StylesTooltip = withStyles(styles)(Tooltip)
    return <StylesTooltip {...extendedProps}/>
}
const styles = {
    tooltipPlacementBottom: {
        top: "-8px",
    },
}
