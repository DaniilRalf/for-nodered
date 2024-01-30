export const schema: any = {
    description: "Интервалы обновления ПО устройств",
    properties: {
        'aup.firmware.update.interval': {
            items: {
                properties: {
                   day: {
                       enum: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
                       type: "string"
                   },
                   from: {
                       format: "time",
                       type: "string"
                   },
                   to: {
                       format: "time",
                       type: "string"
                   },
                },
                required: ['from', 'to'],
                type: "object"
            },
            title: "",
            type: "array",
        }
    },
    required: ['aup.firmware.update.interval'],
    title: "AuP.Firmware.Update.Interval",
    type: "object"
}

export const uiSchema: any = {}

export const formData: any = undefined



// "@rjsf/core": "^4.2.2",
// "@rjsf/material-ui": "^4.2.2",

// "@rjsf/core": "^5.16.1",
// "@rjsf/material-ui": "^5.16.1",
// "@rjsf/validator-ajv8": "^5.16.1",
