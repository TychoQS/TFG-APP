import React, { useEffect, useRef } from 'react';
import { Drawer, Menu } from 'antd';
import type { NavigationProps } from './props';

export interface NavigationMenuProps extends NavigationProps {
    isOpen: boolean;
    currentAbstractPage: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
    isOpen,
    currentAbstractPage,
    onSwipe,
    onSwipeClose,
    onNavigate
}) => {

    // Contextual gesture recognition
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (touchStartX.current === null) return;
            const touchEndX = e.changedTouches[0].clientX;
            const distance = touchEndX - touchStartX.current;

            if (isOpen) {
                // Swipe right to left to close the drawer
                if (distance < -50) {
                    onSwipeClose();
                }
            } else {
                // Swipe left to right from edge to open the drawer
                if (touchStartX.current < 40 && distance > 50) {
                    onSwipe();
                }
            }
            touchStartX.current = null;
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isOpen, onSwipe, onSwipeClose]);

    const abstractPages = [
        {
            key: 'classification', // Top-level page abstract identifier
            label: 'Classification',
        }
        // Future top level pages go here...
    ];

    const items = abstractPages.map(page => ({
        ...page,
        onClick: () => {
            if (currentAbstractPage !== page.key) {
                onNavigate(page.key);
            }
        }
    }));

    return (
        <Drawer
            title={null}
            placement="left"
            open={isOpen}
            onClose={onSwipeClose}
        >
            <div style={{ padding: '24px 16px', fontSize: '20px', fontWeight: 'bold' }}>
                Menu
            </div>
            <Menu
                mode="inline"
                selectedKeys={[currentAbstractPage]}
                items={items}
                style={{ borderRight: 'none' }}
            />
        </Drawer>
    );
};

export default NavigationMenu;
