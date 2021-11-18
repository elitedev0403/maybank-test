import { History } from "history";
import { combineReducers } from "redux";
import * as configReducer from './configReducer';
import * as snackbarReducer from './snackbarEventReducer';
import * as addressReducer from './addressesReducer';
import { SnackbarEvent } from "../model";
import { AddressStore } from "../model";

export interface RootState {
	drawerOpen: boolean;
	snackbarEvents: SnackbarEvent[];
	addressStore: AddressStore;
}

export default (history: History) =>
	combineReducers({
		...configReducer,
		...snackbarReducer,
		...addressReducer,
	});
