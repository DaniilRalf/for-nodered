import {useEffect, useState} from "react";

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







export function useObservable<T>(observable: Observable<T>): T {
    const [val, setVal] = useState(observable.get());

    useEffect(() => {
        setVal(observable.get()); // Добавление от @mayorovp
        return observable.subscribe(setVal);
    }, [observable]);

    return val;
}


type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export class Observable<T> {
    private _listeners: Listener<T>[] = [];

    constructor(private _val: T) {}

    get(): T {
        return this._val;
    }

    set(val: T): void {
        if (this._val !== val) {
            this._val = val;
            this._listeners.forEach(l => l(val));
        }
    }

    subscribe(listener: Listener<T>): Unsubscriber {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener);
        };
    }
}



export const actualData = {
    "attributes": [
        {
            "insertedAt": "2024-03-07 07:59:50.970201Z",
            "name": "json_schema",
            "uuid": "40f05477-1966-4838-8138-1095f81969e0",
            "value": "{\"description\":\"Настройки SIP линии\",\"properties\":{\"sip.line.[X]\":{\"properties\":{\"X\":{\"default\":1,\"description\":\"Номер линии\",\"maximum\":128,\"title\":\"X\",\"type\":\"integer\"},\"auth_name\":{\"description\":\"Логин для SIP сервера\",\"title\":\"Authname\",\"type\":\"string\"},\"display_name\":{\"title\":\"Displayname\",\"type\":\"string\"},\"enable\":{\"default\":true,\"title\":\"Enable\",\"type\":\"boolean\"},\"label\":{\"description\":\"Отображаемое на экране имя\",\"title\":\"Label\",\"type\":\"string\"},\"outbound_proxy\":{\"properties\":{\"auth_name\":{\"description\":\"Логин для outbound proxy\",\"title\":\"Authname\",\"type\":\"string\"},\"password\":{\"description\":\"Пароль для outbound proxy\",\"format\":\"password\",\"title\":\"Password\",\"type\":\"string\"}},\"title\":\"Common.SIP.Line.[X].OutboundProxy\",\"type\":\"object\"},\"outbound_proxy.[Y]\":{\"items\":{\"properties\":{\"Y\":{\"default\":1,\"description\":\"Номер Proxy сервера\",\"maximum\":5,\"type\":\"integer\"},\"enable\":{\"default\":false,\"title\":\"Enable\",\"type\":\"boolean\"},\"host\":{\"description\":\"Доменное имя или IP адрес\",\"format\":\"host\",\"title\":\"Host\",\"type\":\"string\"},\"port\":{\"format\":\"port\",\"title\":\"Port\",\"type\":\"integer\"}},\"required\":[\"Y\",\"enable\",\"host\"],\"type\":\"object\"},\"title\":\"Common.SIP.Line.[X].OutboundProxy.[Y]\",\"type\":\"array\"},\"password\":{\"description\":\"Пароль для SIP сервера\",\"format\":\"password\",\"title\":\"Password\",\"type\":\"string\"},\"sipserver.[Y]\":{\"items\":{\"properties\":{\"Y\":{\"default\":1,\"description\":\"Номер SIP сервера\",\"maximum\":5,\"type\":\"integer\"},\"enable\":{\"default\":true,\"title\":\"Enable\",\"type\":\"boolean\"},\"host\":{\"description\":\"Доменное имя или IP адрес\",\"format\":\"host\",\"title\":\"Host\",\"type\":\"string\"},\"port\":{\"format\":\"port\",\"title\":\"Port\",\"type\":\"integer\"},\"register_on_enable\":{\"default\":true,\"title\":\"Register on enable\",\"type\":\"boolean\"}},\"required\":[\"Y\",\"enable\",\"host\"],\"type\":\"object\"},\"title\":\"Common.SIP.Line.[X].SipServer.[Y]\",\"type\":\"array\"},\"user_name\":{\"title\":\"Username\",\"type\":\"string\"}},\"required\":[\"X\",\"enable\",\"auth_name\",\"password\"],\"title\":\"\",\"type\":\"object\"}},\"required\":[\"sip.line.[X]\"],\"title\":\"Common.SIP.Line.[X]\",\"type\":\"object\"}"
        },
        {
            "insertedAt": "2024-03-07 07:59:50.970649Z",
            "name": "ui_schema",
            "uuid": "2dd17322-dc43-42b2-84d2-dec190396a7c",
            "value": "{\"sip.line.[X]\":{\"X\":{\"ui:widget\":\"updown\"},\"outbound_proxy.[Y]\":[{\"Y\":{\"ui:widget\":\"updown\"},\"port\":{\"ui:widget\":\"updown\"}}],\"sipserver.[Y]\":[{\"Y\":{\"ui:widget\":\"updown\"},\"port\":{\"ui:widget\":\"updown\"}}],\"ui:order\":[\"X\",\"enable\",\"label\",\"display_name\",\"user_name\",\"auth_name\",\"password\",\"sipserver.[Y]\",\"outbound_proxy\",\"outbound_proxy.[Y]\"]}}"
        }
    ],
    "contextTags": [
        "Common"
    ],
    "descriptions": [
        {
            "description": "Настройки SIP линии",
            "langCode": "ru"
        },
        {
            "description": "SIP line settings",
            "langCode": "en"
        }
    ],
    "flags": [
        "predefined"
    ],
    "insertedAt": "2024-03-07 07:59:50.969968Z",
    "name": "Common.SIP.Line.[X]",
    "searchAliases": [
        "account.X.auth_name",
        "sip.line.X.RegUser",
        "SIPX Register User",
        "P36",
        "Account1_AuthenticateID",
        "P736",
        "Account2_AuthenticateID",
        "P505",
        "Account3_AuthenticateID",
        "P605",
        "Account4_AuthenticateID",
        "P1705",
        "Account5_AuthenticateID",
        "P1805",
        "Account6_AuthenticateID",
        "VoIP.Lines.LineX.SIPAccountParameters.SIP.AuthUsername",
        "authName",
        "sip lineX auth name",
        "P271",
        "Account1_Active",
        "P401",
        "Account2_Active",
        "P501",
        "Account3_Active",
        "P601",
        "Account4_Active",
        "P20360",
        "Account5_Active",
        "P20361",
        "Account6_Active",
        "account.X.enable"
    ],
    "updatedAt": "2024-03-07 07:59:50.969968Z",
    "uuid": "803f3a15-0847-48fb-8f16-b863e06f8bee",
    "data": {
        "sip.line.[X]": {
            "X": 1,
            "enable": true,
            "outbound_proxy.[Y]": [],
            "sipserver.[Y]": [],
            "password": "11111111",
            "label": "11",
            "display_name": "1",
            "auth_name": "1",
            "user_name": "1"
        }
    },
    "mId": "803f3a15-0847-48fb-8f16-b863e06f8bee1",
    "displayName": "Common.SIP.Line.[1]"
}
