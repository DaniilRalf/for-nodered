import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Dropdown } from 'antd'

type DraggableMenuItemType = {
    item: { label: string; key: string },
    index: number,
    moveMenuItem: (fromIndex: number, toIndex: number) => void,
}

const ItemType = 'MENU_ITEM'

const DraggableMenuItem = ({ item, index, moveMenuItem }: DraggableMenuItemType) => {

    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    })

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem: {index: number}) => {
            if (draggedItem.index !== index) {
                moveMenuItem(draggedItem.index, index)
                draggedItem.index = index
            }
        },
    })

    return (
        <div style={{padding: '8px', border: '1px solid #ccc', marginBottom: '4px', display: 'flex'}}>
            <div ref={(node) => ref(drop(node))}
                 style={{marginRight: '20px', cursor: 'move'}}
            >drop</div>
            <div>
                {item.label}
            </div>
        </div>

    )
}

const Settings = () => {

    const [menuItems, setMenuItems] = useState([
        {label: '1st menu item', key: '0'},
        {label: '2nd menu item', key: '1' },
    ])

    const moveMenuItem = (fromIndex: number, toIndex: number) => {
        const updatedItems = [...menuItems]
        const [movedItem] = updatedItems.splice(fromIndex, 1)
        updatedItems.splice(toIndex, 0, movedItem)
        setMenuItems(updatedItems)
        console.log(updatedItems)
    }

    const menu = (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {menuItems.map((item, index) => (
                <DraggableMenuItem key={item.key} index={index} item={item} moveMenuItem={moveMenuItem} />
            ))}
        </ul>
    )

    return (
        <DndProvider backend={HTML5Backend}>
            <Dropdown overlay={menu} trigger={['click']}>
                <div style={{ padding: '8px', border: '1px solid #ccc', cursor: 'pointer' }}>Click me</div>
            </Dropdown>
        </DndProvider>
    )
}

export default Settings
