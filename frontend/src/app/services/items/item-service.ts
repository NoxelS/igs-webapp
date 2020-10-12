type ItemServiceResponse = void;

/**
 * @description Default methods an item service needs to implement.
 */
export interface ItemService<T> {
    get(): ItemServiceResponse;
    create(item: T): ItemServiceResponse;
    edit(item: T): ItemServiceResponse;
    remove(item: T): ItemServiceResponse;
}
