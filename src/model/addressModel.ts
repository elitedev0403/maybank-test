export interface AddressStore {
    selected: number;
    addresses: string[];
}

export enum AddressActions {
    ADD_ADDRESS = "ADD_ADDRESS",
    DELETE_ADDRESS = "DELETE_ADDRESS",
    SELECT_CHANGE = "SELECT_ADDRESS_CHANGE",
}

interface AddressActionType<T, P> {
    type: T,
    payload: P,
}

export type AddressAction =
    | AddressActionType<typeof AddressActions.ADD_ADDRESS, string>
    | AddressActionType<typeof AddressActions.DELETE_ADDRESS, null>
    | AddressActionType<typeof AddressActions.SELECT_CHANGE, number>
    ;
