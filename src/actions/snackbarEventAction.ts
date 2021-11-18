import {
	SnackbarEvent,
	SnackbarEventAction,
	SnackbarEventActions,
} from "../model/snackbarEventModel";

export function addSnackbarEvent(event: SnackbarEvent): SnackbarEventAction {
	return {
		type: SnackbarEventActions.ADD_SNACKBAR_EVENT,
		payload: event,
	};
}

export function deleteSnackbarEvent(event: SnackbarEvent): SnackbarEventAction {
	return {
		type: SnackbarEventActions.DELETE_SNACKBAR_EVENT,
		payload: event,
	};
}
