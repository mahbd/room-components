import {create, Mutate, StoreApi, UseBoundStore} from "zustand";
import {mountStoreDevtool} from 'simple-zustand-devtools';

export interface ItemModel {
    id: number,
    name: string,
    children?: number[],
    parent: number,
    isOpened?: boolean,
}

interface Store {
    maxId: number,
    items: { [key: number]: ItemModel },
    loadLocalData: () => void,
    loadFirebaseData: () => void,
    loadData: () => void,
    saveData: (data: {}) => void,
    addItem: (item: ItemModel) => void,
    removeItem: (id: number, recursive?: boolean) => void,
    updateItem: (item: ItemModel) => void,
    getItem: (id: number) => ItemModel,
    searchItems: (name: string) => ItemModel[],
    closeItem: (id: number) => void,
    closeAll: () => void,
    openItem: (id: number) => void,
    openRecursive: (id: number) => void,
}

const useItemStore: UseBoundStore<Mutate<StoreApi<Store>, []>> = create<Store>((set) => ({
    maxId: 1,
    items: {
        1: {
            id: 1,
            name: "Root",
            parent: 0,
        }
    } as { [key: number]: ItemModel },

    loadLocalData: () => {

    },

    loadFirebaseData: () => {

    },

    loadData: () => {
        let data: any = localStorage.getItem('data');
        if (data !== null) {
            data = JSON.parse(data);
            const synced = localStorage.getItem('synced');
            if (synced === null || synced !== 'TRUE') {
                set(() => ({...data}));
                return;
            }
        }
    },

    saveData: (data) => {
        const json = JSON.stringify(data);
        localStorage.setItem('data', json);
    },


    addItem: (item: ItemModel) => set((state) => {
        const changed = {
            items: {
                ...state.items,
                [state.maxId + 1]: {...item, id: state.maxId + 1},
                [item.parent]: {
                    ...state.items[item.parent],
                    children: [...(state.items[item.parent].children ?? []), state.maxId + 1]
                }
            }, maxId: state.maxId + 1
        };
        useItemStore.getState().saveData(changed);
        return changed;
    }),

    removeItem: (id: number) => set((state) => {
        if (id === 1) {
            return state;
        }
        const item = state.items[id];
        if (item.children !== undefined) {
            item.children.forEach((child) => useItemStore.getState().removeItem(child));
        }
        const parent = state.items[item.parent];
        // @ts-ignore
        parent.children = parent.children?.filter((child) => child !== id);
        delete state.items[id];
        useItemStore.getState().saveData(state);
        return {items: state.items};
    }),

    updateItem: (item: ItemModel) => set((state) => {
        const changed = {items: {...state.items, [item.id]: item}};
        useItemStore.getState().saveData(changed);
        return changed;
    }),

    getItem: (id: number) => useItemStore.getState().items[id],

    searchItems: (name: string) => {
        const items: ItemModel[] = [];
        (Object.values(useItemStore.getState().items) as ItemModel[]).forEach((item) => {
            if (item.name.toLowerCase().includes(name.toLowerCase())) {
                items.push(item);
            }
        });
        return items;
    },

    closeItem: (id: number) => set((state) => {
        const item: any = state.items[id];
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        item.isOpened = false;
        return {items: {...state.items, [item.id]: item}};
    }),

    closeAll: () => set((state) => {
        Object.values(state.items).forEach((item) => {
            item.isOpened = false;
        });
        return {items: {...state.items}};
    }),

    openItem: (id: number) => set((state) => {
        const item: any = state.items[id];
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        item.isOpened = true;
        return {items: {...state.items, [item.id]: item}};
    }),

    openRecursive: (id: number) => set((state) => {
        const item: any = state.items[id];
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        item.isOpened = true;
        const parent = state.items[item.parent];
        if (parent !== undefined) {
            useItemStore.getState().openRecursive(parent.id);
        }
        return {items: {...state.items, [item.id]: item}};
    }),
}));

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('ItemStore', useItemStore);
}


export default useItemStore;