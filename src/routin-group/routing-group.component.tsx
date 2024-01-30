import React, {useEffect, useState} from "react"
import {Button, Select} from "antd"
import {PlusOutlined, TagOutlined} from "@ant-design/icons"
import {customStyleMaterial} from "./assets/styles"
import {CloseOutlined} from "@material-ui/icons"
import {serverDataModels, serverDataProps, serverDataVendors} from "./server_data"
import _ from 'lodash'


// TODO: перенести енам в основной файл с типами
// TODO: соответствует RoutingGroupPropertyList
interface RoutingGroupInterface {
    index: number,
    valueList: string[]
}
interface ModelListInterface { value: string, label: string, }
enum AllPropertyEnum {Model = 'model', Vendor = 'vendor'}

const RoutingGroupComponent = (_props: any): JSX.Element =>  {


    /** All types for this node */
    const allProperty: ModelListInterface[] = [
        {value: AllPropertyEnum.Model, label: AllPropertyEnum.Model},
        {value: AllPropertyEnum.Vendor, label: AllPropertyEnum.Vendor},
    ]

    /** Active type this node */
    const [activeProperty, setActiveProperty] = useState<AllPropertyEnum>()

    /** data for select */
    const [dataForSelect, setDataForSelect] = useState<ModelListInterface[]>([])
    const [dataForSelectView, setDataForSelectView] = useState<ModelListInterface[]>([])

    /** Active outputs groups */
    const [groupsOutputsList, setGroupsOutputsList] = useState<RoutingGroupInterface[]>([])



    // TODO: на этом месте подставить данные из пропса, или пустой массив
    useEffect((): void => {

        const data1 = serverDataProps
        if (data1?.propertyList && data1?.propertyType) {
            setActiveProperty(data1?.propertyType)
        }

    }, [])

    // TODO: на этом месте отслеживаем активное Properties и запрашиваем каждый раз данные
    useEffect((): void => {
        switch (activeProperty) {
            case AllPropertyEnum.Vendor:
                getDataForSelect(AllPropertyEnum.Vendor).then()
                break
            case AllPropertyEnum.Model:
                getDataForSelect(AllPropertyEnum.Model).then()
                break
        }
    }, [activeProperty])

    /** формируем лист свойств для формирования выходов*/
    useEffect((): void => {
        if (activeProperty && groupsOutputsList) {
            let newGroupsOutputsList = groupsOutputsList.filter((groupOutputs) => !!groupOutputs.valueList.length)
        }
    }, [groupsOutputsList, activeProperty])

    // TODO: получание данных с бека
    const getDataForSelect = async (property: AllPropertyEnum): Promise<void> => {
        // let res: Promise<string[]>
        // let data: string[] = []
        // if (property === AllPropertyEnum.Vendor) {
        //     res = await props.getAllVendors()
        //     data = res?.data['equipmentVendorsGetAll'] || []
        // } else if (property === AllPropertyEnum.Model) {
        //     res = await props.getAllModels()
        //     data = res?.data['equipmentModelsGetAll'] || []
        // }
        // const list: ModelListInterface[] = data.map((item: string): ModelListInterface => ({value: item, label: item}))
        // setForSelectList(list)
        // setDataForSelectView(list)
        let data: any = []
        if (property === AllPropertyEnum.Vendor) {
            const promise1: Promise<any> = new Promise((resolve, reject) => {
                setTimeout(() => {resolve(serverDataVendors)}, 500)
            })
            await promise1.then((dataProm): void => {data = dataProm})
        } else if (property === AllPropertyEnum.Model) {
            const promise1: Promise<any> = new Promise((resolve, reject) => {
                setTimeout(() => {resolve(serverDataModels)}, 500)
            })
            await promise1.then((dataProm): void => {data = dataProm})
        }
        const list: ModelListInterface[] = data
            .filter((el: string) => !!el)
            .map((item: string): ModelListInterface => ({value: item, label: item}))
        setDataForSelect(list)
        setDataForSelectView(list)

        // TODO: из пропсов дергаем данные и исопльзуем 1 раз для удаления активных тегов из доступного списка
        let data1 = serverDataProps
        if (data1?.propertyList) {
            setGroupsOutputsList(data1?.propertyList)
            changeItemsForSelect(data1?.propertyList, list)
            data1.propertyList = null
        }
    }

    /** Properties */
    const changeActiveProperty = (value: AllPropertyEnum, _option: ModelListInterface | ModelListInterface[]): void => {
        setActiveProperty(value)
        setGroupsOutputsList([])
    }

    /** Groups */
    const addNewOutputsGroup = (): void => {
        const newGroupsOutputsList: RoutingGroupInterface[] = [...groupsOutputsList, {index: Date.parse(new Date().toISOString()), valueList: []}]
        setGroupsOutputsList(newGroupsOutputsList)
    }

    const removeOutputsGroup = (indexGroup: number): void => {
        // const newGroupsOutputsList: RoutingGroupInterface[] = JSON.parse(JSON.stringify(groupsOutputsList))
        const newGroupsOutputsList: RoutingGroupInterface[] = _.cloneDeep(groupsOutputsList)
        newGroupsOutputsList.splice(indexGroup, 1)
        setGroupsOutputsList(newGroupsOutputsList)
        changeItemsForSelect(newGroupsOutputsList, dataForSelect)
    }

    /** items of group (item in Select)*/
    const changeItemsOfGroup = (itemIndex: number, itemData: string[]): void => {
        /** изменение списка чипсов в переменной группы */
        // const newGroupsOutputsList = JSON.parse(JSON.stringify(groupsOutputsList))
        const newGroupsOutputsList: RoutingGroupInterface[] = _.cloneDeep(groupsOutputsList)
        newGroupsOutputsList.forEach((group: RoutingGroupInterface): void => {
            if (itemIndex === group.index) {
                group.valueList = [...itemData]
            }
        })
        setGroupsOutputsList(newGroupsOutputsList)
        changeItemsForSelect(newGroupsOutputsList, dataForSelect)
    }

    const changeItemsForSelect = (newGroupsOutputsList: RoutingGroupInterface[], dataForSelectArray: ModelListInterface[] ): void => {
        /** изменение списка чипсов в переменной для выбора */
        let activeTags: string[] = []
        newGroupsOutputsList.forEach((itemGroup: RoutingGroupInterface): void => {
            activeTags = [...activeTags, ...itemGroup.valueList]
        })
        // let newDataForSelectView = JSON.parse(JSON.stringify(dataForSelectArray))
        let newDataForSelectView: ModelListInterface[] = _.cloneDeep(dataForSelectArray)
        newDataForSelectView = newDataForSelectView.filter((item: ModelListInterface) => !activeTags.includes(item.value))
        setDataForSelectView(newDataForSelectView)
    }




    const constructOutputGroupItemsList = (item: string[], itemIndex?: number): JSX.Element => {
        return (
            <div className="outputs-item" >
                <Select className="select"
                        mode="multiple"
                        showSearch
                    // TODO: translate
                        placeholder={'Выберите ' + activeProperty}
                        optionFilterProp="children"
                        options={dataForSelectView}
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        value={item}
                        onChange={(value, option) => changeItemsOfGroup(itemIndex!, value)}
                />
            </div>
        )
    }

    const constructOutputsGroupsList: JSX.Element[] = groupsOutputsList.map((element: RoutingGroupInterface, index: number) => {
        return (
            <div className="main-outputs-item" key={index}>
                <div className="line">
                    <div className="number">выход №{index + 1}</div>
                    <hr/>
                    <CloseOutlined className="close"
                                   onClick={() => removeOutputsGroup(index)}
                    />
                </div>
                <div className="outputs">
                    {constructOutputGroupItemsList(element.valueList || [], element.index)}
                </div>
            </div>
        )
    })

    return (
        <div className="main">

            {/** Select-input======================================== */}
            <div className="main-select">
                <div className="main-select-desc">
                    <TagOutlined className="icon" rev="true" />
                    {/*TODO: translate*/}
                    <div className="text">Тип</div>
                </div>
                <Select
                    className="main-select-input"
                    showSearch optionFilterProp="children"
                    // TODO: translate
                    placeholder="Выберите свойства для роутинга"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={allProperty}
                    value={activeProperty}
                    onChange={(value, option) => changeActiveProperty(value, option)}
                />
            </div>

            {/** Outputs-block ====================================== */}
            <div className="main-outputs">
                {constructOutputsGroupsList}
            </div>

            {/** Add-outputs-btn ==================================== */}
            <div className="main-add">
                <div className="main-add-output">
                    <Button icon={<PlusOutlined rev="true"/>}
                            disabled={!activeProperty || !dataForSelectView.length}
                            type="primary" shape="round" size={'large'}
                            onClick={addNewOutputsGroup}
                        // TODO: translate
                    >Добавить выход</Button>
                </div>
            </div>

            <style>{customStyleMaterial}</style>
        </div>
    )
}

export default RoutingGroupComponent
