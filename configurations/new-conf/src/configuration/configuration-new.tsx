import React, {createContext, Fragment, useContext, useEffect, useState} from 'react'
import {Form} from "@rjsf/material-ui";
import validator from '@rjsf/validator-ajv8';
import { Button, FormHelperText, Grid, IconButton, TextField, FormLabel, Slider } from '@material-ui/core';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import CustomTooltip from "./custom-tooltip";
import {actualData, Observable, useObservable} from "./data";
import {FieldTemplateProps} from "@rjsf/utils";

const enabledContextLinksList$: Observable<[string, string][]> = new Observable<[string, string][]>([])
const initNewOptionForm$: Observable<string> = new Observable<string>('')
export const EditorContext = createContext<HTMLElement>(document.body)




const ConfigurationNew = () => {

    const currentOption: any = actualData

    const jsonSchema = JSON.parse(currentOption.attributes.find((el: { name: string }) => el.name === 'json_schema')?.value || '{}')
    const uiSchema = JSON.parse(currentOption.attributes.find((el: { name: string }) => el.name === 'ui_schema')?.value || '{}')

    const [jsonFormsData, setJsonFormsData] = useState<Object | undefined>(parseJsonFormsData(currentOption.data || {}))

    const [invalidFormDataAttempted, setInvalidFormDataAttempted] = useState<boolean>(false)
    const contextChangedByForm = useObservable(enabledContextLinksList$)

    function parseJsonFormsData(data: any): any {
        const dataCrowler = (obj: any): void => {
            for (const property in obj) {
                if (obj[property] === null) {
                    obj[property] = undefined
                } else if (typeof obj[property] === 'object' || Array.isArray(obj[property])) {
                    dataCrowler(obj[property])
                }
            }
        }
        if (data !== undefined) {
            dataCrowler(data)
        }
        return data
    }

    useEffect((): void => {
        enabledContextLinksList$.set([])
        enabledContextLinksList$.set(Array.from(currentOption?.context || []))
        setJsonFormsData(parseJsonFormsData(currentOption.data || {}))
        setInvalidFormDataAttempted(false)
        initNewOptionForm$.set(Date.now().toString())
    }, [currentOption])

    function onClearBtnClick(): void {
        setJsonFormsData(undefined)
        enabledContextLinksList$.set([])
        initNewOptionForm$.set(Date.now().toString())
    }

    function onDeleteBtnClick(): void {
        console.log('----delete-------------------')
    }

    return (
        <Form
            templates={{ FieldTemplate: CustomFieldTemplate }}
            schema={jsonSchema}
            uiSchema={uiSchema}
            formData={jsonFormsData}
            noHtml5Validate={true}
            validator={validator}
            showErrorList={'top'}
            liveValidate={invalidFormDataAttempted}
            onChange={({formData}) => setJsonFormsData(formData)}
            onSubmit={({formData, schema}) => {
                const formName = (schema.required as string[])[0]
                setInvalidFormDataAttempted(false)
                console.log('=================================')
                console.log(schema)
                console.log(formData)
                console.log('=================================')
            }}
            onError={() => {
                setInvalidFormDataAttempted(true)
            }}
        >
            <Grid container justifyContent="space-between">
                <Grid container wrap="nowrap" style={{width: '60%'}}>
                    <Button variant="contained"
                            type="submit"
                            color="primary"
                    >{'Submit'}</Button>
                    <Button variant="contained"
                            style={{marginLeft: '5px'}}
                            onClick={onClearBtnClick}
                    >{'Clear'}</Button>
                </Grid>
                {currentOption.mId &&
                    <Button variant="contained"
                            color="secondary"
                            style={{justifySelf: 'flex-end'}}
                            onClick={onDeleteBtnClick}
                    >{'Delete'}</Button>}
            </Grid>
        </Form>
    )

}
export default ConfigurationNew













function CustomFieldTemplate(props: FieldTemplateProps): JSX.Element {
    const editorContainerRef = useContext(EditorContext)
    const {id, required, classNames, label, errors, children, schema, disabled, formData, onChange} = props;
    const canUseContext = schema.type === 'string'
                          || schema.type === 'boolean'
                          || schema.type === 'number'
                          || schema.type === 'integer'
                          || Array.isArray(schema.type)
        && schema.type.every((item: ReturnType<any>) => { return typeof item === "string" } )

    const enabledContextLinks = useObservable(enabledContextLinksList$)
    const clearForm = useObservable(initNewOptionForm$)

    const [useContextInput, setUseContextInput] = useState<boolean>(false)
    const [linkValue, setLinkValue] = useState<string>('')

    useEffect((): void => {
        setLinkValue('')
    }, [clearForm])

    useEffect((): void => {
        const enabledLinksMap = new Map(enabledContextLinks)
        setUseContextInput(enabledLinksMap.has(id))
        if(enabledLinksMap.has(id)){
            setLinkValue(enabledLinksMap.get(id) as string || linkValue)
        }
    }, [enabledContextLinks, clearForm])

    useEffect((): void => {
        if(canUseContext && (formData === undefined || formData === null) && useContextInput){
            onChange(schema?.default || undefined)
        }
    }, [useContextInput])

    function onLinkFieldChanged(value: string): void{
        setLinkValue(value)
        const resultValue = value
        const enabledLinksMap = new Map(enabledContextLinks)
        enabledLinksMap.set(id, resultValue)
        enabledContextLinksList$.set(Array.from(enabledLinksMap));
    }

    function onUseContentBtnClick(): void{
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
                        error={!!errors?.props.errors && !!(errors?.props.errors as Array<string>).length}/>
                    : children}
                {schema.type !== 'object' && <FormHelperText>{schema.description}</FormHelperText>}
                {errors?.props.errors && (errors?.props.errors as string[])
                    .map((e, i) => <FormHelperText error key={`${id}-error${i}`}>{e}</FormHelperText>)}
            </div>
            {canUseContext && !disabled
                ? <CustomTooltip title={!useContextInput ? "Use context" : "Use manual"}
                                 arrow
                                 container={editorContainerRef}
                                 placement='bottom'>
                    <IconButton onClick={()=>onUseContentBtnClick()}>{!useContextInput ? <LinkIcon/> : <LinkOffIcon/>}</IconButton>
                </CustomTooltip>
                : <span></span>
            }
        </div>
    )
}
