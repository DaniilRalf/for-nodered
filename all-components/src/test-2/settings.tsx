import React, {useState, useCallback, useMemo, useEffect} from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {Checkbox, CheckboxChangeEvent, Dropdown} from 'antd'
import { ColumnCustomType, DraggableMenuItemType } from './data'

const ItemType = 'MENU_ITEM'

const DraggableMenuItem = React.memo(({ item, index, dropdownItemEvent }: DraggableMenuItemType) => {

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

    const onChangeCheckbox = (event: CheckboxChangeEvent) => {
        const newCheckboxState = event.target.checked
        dropdownItemEvent(0, 0, { ...item, hidden: !newCheckboxState })
    }

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
            <Checkbox
                checked={!item.hidden}
                onChange={onChangeCheckbox}
            />
            <div>{item.title}</div>
        </div>
    )
})

const Settings = React.memo(({columns, onChangeColumn}: { columns: ColumnCustomType[], onChangeColumn: (column: ColumnCustomType[]) => void }) => {

    const [menuItems, setMenuItems] = useState<ColumnCustomType[]>(columns)
    const [stateOfDropdown, setStateOfDropdown] = useState<boolean>(false)

    useEffect(() => {
        setMenuItems(columns)
    }, [columns])

    /**
     * Следим за изменением menuItems и обновляем состояния колонок в таблице
     * @see dropdownItemEvent
     * */
    useEffect(() => {
        onChangeColumn(menuItems)
    }, [menuItems, onChangeColumn])

    const dropdownItemEvent = useCallback((fromIndex: number, toIndex: number, itemNew?: ColumnCustomType) => {
        setMenuItems((prevItems: ColumnCustomType[]) => {
            const updatedItems = [...prevItems]
    
            if (itemNew) {
                /** Создаем новый объект для измененного элемента (изменили состояние чекбокса) */
                const updatedIndex = updatedItems.findIndex(item => item.key === itemNew.key)
                if (updatedIndex !== -1) {
                    updatedItems[updatedIndex] = { ...updatedItems[updatedIndex], hidden: itemNew.hidden }
                }
            } else {
                /** Меняем элементы местами (сделали Drag-and-drop) */
                const [movedItem] = updatedItems.splice(fromIndex, 1)
                updatedItems.splice(toIndex, 0, movedItem)
            }
    
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

    const onChangeStateOfDropDown = () => {
        setStateOfDropdown(!stateOfDropdown)
    }

    return (
        <>
            {
                columns?.length && <DndProvider backend={HTML5Backend}>
                    <Dropdown menu={{ items: dropdownList }}
                              onOpenChange={onChangeStateOfDropDown}
                              open={stateOfDropdown}
                              trigger={['contextMenu', 'click']}
                    >
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
})

export default Settings