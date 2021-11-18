import { AddressAction, AddressActions } from '../model/index';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux';
import { RootState } from '../reducers';

export function addAddress(address: string): AddressAction {
    return {
        type: AddressActions.ADD_ADDRESS,
        payload: address,
    }
}

export const handleNewPlace = (addresses: string[], address: string): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    let index = addresses.indexOf(address);
    if (index < 0) {
        dispatch({
            type: AddressActions.ADD_ADDRESS,
            payload: address
        })
        return;
    }
    dispatch({
        type: AddressActions.SELECT_CHANGE,
        payload: index
    })
}

export function selectChange(addressId: number): AddressAction {
    return {
        type: AddressActions.SELECT_CHANGE,
        payload: addressId,
    }
}

export function deleteAddress(): AddressAction {
    return {
        type: AddressActions.DELETE_ADDRESS,
        payload: null,
    }
}


