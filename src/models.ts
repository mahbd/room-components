interface ItemModel {
    name: string,
    children: ItemModel[] | undefined,
}

export type {ItemModel};