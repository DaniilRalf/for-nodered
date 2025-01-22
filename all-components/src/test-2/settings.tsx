import React, {useState, useCallback, useMemo, useEffect} from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {Dropdown} from 'antd'
import {ColumnType} from "antd/es/table/interface";

const ItemType = 'MENU_ITEM'

export type ColumnCustomType = ColumnType & {title: string}

type DraggableMenuItemType = {
    item: ColumnCustomType
    index: number
    dropdownItemEvent: (fromIndex: number, toIndex: number) => void
}

const DraggableMenuItem = React.memo(({ item, index, dropdownItemEvent }: DraggableMenuItemType) => {

    console.log('----------------------')
    console.log(item)
    console.log('----------------------')

    const ref = React.useRef<HTMLDivElement>(null)

    const [, drag] = useDrag({
        type: ItemType,
        item: { index },
    })

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
                dropdownItemEvent(draggedItem.index, index)
                draggedItem.index = index
            }
        },
    })

    drag(drop(ref))

    return (
        <div
            style={{
                padding: '8px',
                border: '1px solid #ccc',
                marginBottom: '4px',
                display: 'flex',
            }}
        >
            <div
                ref={ref}
                style={{
                    marginRight: '20px',
                    cursor: 'move',
                }}
            >
                drop
            </div>
            <div>{item.title}</div>
        </div>
    )
})

const Settings = ({columns}: { columns: ColumnCustomType[] }) => {

    const [menuItems, setMenuItems] = useState(columns)

    useEffect(() => {
        setMenuItems(columns)
    }, [columns])

    const dropdownItemEvent = useCallback((fromIndex: number, toIndex: number) => {
        setMenuItems((prevItems: ColumnCustomType[]) => {
            const updatedItems = [...prevItems]
            const [movedItem] = updatedItems.splice(fromIndex, 1)
            updatedItems.splice(toIndex, 0, movedItem)
            return updatedItems
        })
    }, [])

    const dropdownList = useMemo(() => {
        return menuItems.map((item: ColumnCustomType, index: number) => {
            return {
                key: `${index}`,
                label: (
                    <DraggableMenuItem
                        key={index}
                        index={index}
                        item={item}
                        dropdownItemEvent={dropdownItemEvent}
                    />
                ),
            }
        })
    }, [menuItems])

    return (
        <>
            {
                columns?.length && <DndProvider backend={HTML5Backend}>
                    <Dropdown menu={{ items: dropdownList }} trigger={['click']}>
                        <div
                            style={{
                                width: '40px',
                                padding: '8px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                            }}
                        >
                            Click me
                        </div>
                    </Dropdown>
                </DndProvider>
            }
        </>
    )
}

export default Settings