import { create, Mutate, StoreApi, UseBoundStore } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, set as fireSet } from "firebase/database";
import { app } from "./firebaseLocal";

export interface ItemModel {
  id: number;
  name: string;
  children?: number[];
  parent: number;
  isOpened?: boolean;
}

const demoData = {
  maxId: 5,
  items: {
    1: {
      id: 1,
      name: "Room",
      parent: 0,
      isOpened: true,
      children: [2, 3],
    },
    2: {
      id: 2,
      name: "Table",
      parent: 1,
      isOpened: true,
      children: [4],
    },
    3: {
      id: 3,
      name: "Rack",
      parent: 1,
      children: [5],
    },
    4: {
      id: 4,
      name: "Water Bottle",
      parent: 2,
    },
    5: {
      id: 5,
      name: "Shoes",
      parent: 3,
    },
  },
};

interface Store {
  maxId: number;
  items: { [key: number]: ItemModel };
  loadFirebaseData: (data: any) => void;
  loadData: () => void;
  saveData: (data: {}) => void;
  addItem: (item: ItemModel) => void;
  removeItem: (id: number, recursive?: boolean) => void;
  updateItem: (item: ItemModel) => void;
  getItem: (id: number) => ItemModel;
  searchItems: (name: string) => ItemModel[];
  closeItem: (id: number) => void;
  closeAll: () => void;
  openItem: (id: number) => void;
  openRecursive: (id: number) => void;
}

const useItemStore: UseBoundStore<Mutate<StoreApi<Store>, []>> = create<Store>(
  (set) => ({
    ...demoData,

    loadFirebaseData: (data) => set(() => data),

    loadData: () =>
      set((state) => {
        const database = getDatabase(app);
        const user = getAuth(app).currentUser;
        let data: any = localStorage.getItem("data");
        if (data !== null) {
          data = JSON.parse(data);
          const synced = localStorage.getItem("synced");
          if (
            synced === null ||
            synced !== "TRUE" ||
            !navigator.onLine ||
            !user
          ) {
            if (user && navigator.onLine) {
              fireSet(ref(database, `users/${user.uid}/data`), data);
              localStorage.setItem("synced", "TRUE");
            }

            return data;
          } else if (user) {
            const dataRef = ref(database, `users/${user.uid}/data`);
            onValue(dataRef, (snapshot) => {
              const data = snapshot.val();
              if (data !== null) {
                useItemStore.getState().loadFirebaseData(data);
              }
            });
          }
        } else if (user) {
          const dataRef = ref(database, `users/${user.uid}/data`);
          onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
              useItemStore.getState().loadFirebaseData(data);
            }
          });
        }
        return state;
      }),

    saveData: (data) => {
      const json = JSON.stringify(data);
      localStorage.setItem("data", json);
      if (navigator.onLine) {
        const user = getAuth(app).currentUser;
        if (user) {
          const userRef = ref(getDatabase(app), `users/${user.uid}/data`);
          fireSet(userRef, data);
          localStorage.setItem("synced", "TRUE");
        }
      } else {
        localStorage.setItem("synced", "FALSE");
      }
    },

    addItem: (item: ItemModel) =>
      set((state) => {
        const changed = {
          items: {
            ...state.items,
            [state.maxId + 1]: { ...item, id: state.maxId + 1 },
            [item.parent]: {
              ...state.items[item.parent],
              children: [
                ...(state.items[item.parent].children ?? []),
                state.maxId + 1,
              ],
            },
          },
          maxId: state.maxId + 1,
        };
        useItemStore.getState().saveData(changed);
        return changed;
      }),

    removeItem: (id: number) =>
      set((state) => {
        if (id === 1) {
          return state;
        }
        const item = state.items[id];
        if (item.children !== undefined) {
          item.children.forEach((child) =>
            useItemStore.getState().removeItem(child),
          );
        }
        const parent = state.items[item.parent];
        // @ts-ignore
        parent.children = parent.children?.filter((child) => child !== id);
        delete state.items[id];
        useItemStore
          .getState()
          .saveData({ items: state.items, maxId: state.maxId });
        return { items: state.items, maxId: state.maxId };
      }),

    updateItem: (item: ItemModel) =>
      set((state) => {
        const changed = {
          items: { ...state.items, [item.id]: item },
          maxId: state.maxId,
        };
        useItemStore.getState().saveData(changed);
        return changed;
      }),

    getItem: (id: number) => useItemStore.getState().items[id],

    searchItems: (name: string) => {
      const items: ItemModel[] = [];
      (Object.values(useItemStore.getState().items) as ItemModel[]).forEach(
        (item) => {
          if (item.name.toLowerCase().includes(name.toLowerCase())) {
            items.push(item);
          }
        },
      );
      return items;
    },

    closeItem: (id: number) =>
      set((state) => {
        const item: any = state.items[id];
        if (item === undefined) {
          throw new Error(`Item with id ${id} not found`);
        }
        item.isOpened = false;
        return { items: { ...state.items, [item.id]: item } };
      }),

    closeAll: () =>
      set((state) => {
        Object.values(state.items).forEach((item) => {
          item.isOpened = false;
        });
        return { items: { ...state.items } };
      }),

    openItem: (id: number) =>
      set((state) => {
        const item: any = state.items[id];
        if (item === undefined) {
          throw new Error(`Item with id ${id} not found`);
        }
        item.isOpened = true;
        return { items: { ...state.items, [item.id]: item } };
      }),

    openRecursive: (id: number) =>
      set((state) => {
        const item: any = state.items[id];
        if (item === undefined) {
          throw new Error(`Item with id ${id} not found`);
        }
        item.isOpened = true;
        const parent = state.items[item.parent];
        if (parent !== undefined) {
          useItemStore.getState().openRecursive(parent.id);
        }
        return { items: { ...state.items, [item.id]: item } };
      }),
  }),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("ItemStore", useItemStore);
}

export default useItemStore;
