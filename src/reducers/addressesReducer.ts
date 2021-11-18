import { AddressStore, AddressAction, AddressActions } from '../model/index';
import createReducer from './createReducer';

var initialState: AddressStore = {
    selected: -1,
    addresses: [],
}

export const addressStore = createReducer<AddressStore>(initialState, {
    [AddressActions.ADD_ADDRESS](state: AddressStore, action: AddressAction) {
        state.addresses.push(action.payload as string);
        return {
            ...state,
            selected: state.addresses.length - 1
        }
    },
    [AddressActions.DELETE_ADDRESS](state: AddressStore, action: AddressAction) {
        return {
            ...state,
            addresses: state.addresses.filter((item, index) => index !== state.selected),
            selected: state.selected - 1,
        }
    },
    [AddressActions.SELECT_CHANGE](state: AddressStore, action: AddressAction) {
        return {
            ...state,
            selected: action.payload,
        }
    },
});
