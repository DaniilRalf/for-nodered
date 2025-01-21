import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

const ItemType = 'MENU_ITEM';

type DraggableMenuItemType = {
    item: { label: string; key?: string };
    index: number;
    moveMenuItem: (fromIndex: number, toIndex: number) => void;
};

const DraggableMenuItem = React.memo(({ item, index, moveMenuItem }: DraggableMenuItemType) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [, drag] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
                moveMenuItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{
                padding: '8px',
                border: '1px solid #ccc',
                marginBottom: '4px',
                display: 'flex',
            }}
        >
            <div
                style={{
                    marginRight: '20px',
                    cursor: 'move',
                }}
            >
                drop
            </div>
            <div>{item.label}</div>
        </div>
    );
});

const Settings = () => {
    const [menuItems, setMenuItems] = useState([
        { label: '1st menu item' },
        { label: '2nd menu item' },
    ]);

    const moveMenuItem = useCallback((fromIndex: number, toIndex: number) => {
        setMenuItems((prevItems) => {
            const updatedItems = [...prevItems];
            const [movedItem] = updatedItems.splice(fromIndex, 1);
            updatedItems.splice(toIndex, 0, movedItem);
            return updatedItems;
        });
    }, []);

    const items: MenuProps['items'] = menuItems.map((item, index) => ({
        key: `${index}`,
        label: (
            <DraggableMenuItem
                key={index}
                index={index}
                item={item}
                moveMenuItem={moveMenuItem}
            />
        ),
    }));

    return (
        <DndProvider backend={HTML5Backend}>
            <Dropdown menu={{ items }} trigger={['click']}>
                <div
                    style={{
                        padding: '8px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                >
                    Click me
                </div>
            </Dropdown>
        </DndProvider>
    );
};

export default Settings;