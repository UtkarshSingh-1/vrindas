import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { menuItems as defaultMenuItems } from '@/data/menuData';
import type { MenuItem } from '@/types';
import type { MenuOverride } from '@/lib/api';

interface MenuState {
    items: MenuItem[];
    overrides: MenuOverride[];
    loading: boolean;
}

const initialState: MenuState = {
    items: defaultMenuItems,
    overrides: [],
    loading: false,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuOverrides: (state, action: PayloadAction<MenuOverride[]>) => {
            state.overrides = action.payload;
            // Merge overrides with default menu items
            state.items = defaultMenuItems.map(item => {
                const override = action.payload.find(o => o.item_id === item.id);
                if (override) {
                    return {
                        ...item,
                        name: override.name || item.name,
                        description: override.description || item.description,
                        price: override.price || item.price,
                        category: override.category || item.category,
                        image: override.image || item.image,
                        isAvailable: override.is_available ?? item.isAvailable,
                        isVeg: override.is_veg ?? item.isVeg,
                    };
                }
                return item;
            });
        },
        updateLocalMenuItem: (state, action: PayloadAction<MenuItem>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            } else {
                state.items.unshift(action.payload);
            }
        },
        removeLocalMenuItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    },
});

export const { setMenuOverrides, updateLocalMenuItem, removeLocalMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
