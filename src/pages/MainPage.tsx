import { Grid } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import { Theme } from "@material-ui/core/styles";
import Delete from '@material-ui/icons/DeleteForever';
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import {
	GoogleMap,
	Marker, withGoogleMap
} from 'react-google-maps';
import {
	geocodeByAddress,
	getLatLng
} from 'react-places-autocomplete';
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as AddressStoreAction from '../actions/addressAction';
import * as SnackbarEventActions from '../actions/snackbarEventAction';
import ConfirmDialog from '../components/ConfirmDialog';
import { RootState } from "../reducers/index";
import AutoComplete from './AutoComplete';

export function MapPage() {
	const classes = useStyles();
	const selected = useSelector((state: RootState) => state.addressStore.selected);
	const addresses = useSelector((state: RootState) => state.addressStore.addresses);
	const addressStoreActions = useActions(AddressStoreAction);
	const [currentAddr, setCurrentAddr] = React.useState(selected < 0 ? '' : addresses[selected]);
	const snackbarEventActions: typeof SnackbarEventActions = useActions(SnackbarEventActions);

	const [coords, setCoords] = React.useState({ lat: 0, lng: 0 });
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		if (selected < 0) {
			if (!currentAddr || currentAddr === '')
				return;
			setCurrentAddr('');
			setCoords({ lat: 0, lng: 0 });
			return;
		}
		setCurrentAddr(addresses[selected]);
		geocodeByAddress(addresses[selected])
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				setCoords(latLng)
			})
			.catch(error => console.error('Error', error));
	}, [selected, addresses]);

	const handleChange = React.useCallback((address: string) => {
		setCurrentAddr(address);
	}, [setCurrentAddr]);

	const handleSelect = React.useCallback((address: string) => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				setCurrentAddr(address);
				addressStoreActions.handleNewPlace(addresses, address);
				snackbarEventActions.addSnackbarEvent({
					message: 'Address Has Been Shown Successfully!',
					severity: 'success',
					technicalInfo: undefined,
				});
			})
			.catch(error => {
				snackbarEventActions.addSnackbarEvent({
					message: error.toString(),
					severity: 'error',
					technicalInfo: undefined,
				});
			});
	}, [addresses, setCurrentAddr, addressStoreActions, snackbarEventActions]);

	const GoogleMapExample = withGoogleMap((props: any) => (
		<GoogleMap defaultCenter={coords} defaultZoom={13}>
			<Marker
				position={coords}
			>
			</Marker>
		</GoogleMap>
	));

	const map = React.useMemo(() => {
		return (
			<GoogleMapExample
				containerElement={<div style={{ height: '100vh', width: '100%' }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		)
	}, [coords])

	return (
		<Grid container className={classes.root}>
			<ConfirmDialog
				question={'Are you sure to delete this address?'}
				open={isOpen}
				onClose={() => setIsOpen(false)}
				onOk={() => { setIsOpen(false); addressStoreActions.deleteAddress() }}
				title={'Confirm Deleting Address'}
			/>
			<AutoComplete
				currentAddr={currentAddr}
				handleChange={handleChange}
				handleSelect={handleSelect}
			/>
			<Grid item xs={12} className={classes.mapContainer}>
				{map}
			</Grid>

			<Fab color="primary" className={classes.floatingAddButton} onClick={() => setIsOpen(true)} aria-label="delete" disabled={selected < 0}>
				<Delete />
			</Fab>
		</Grid >
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
		position: 'relative'
	},
	floatingAddButton: {
		position: 'fixed',
		bottom: 30,
		right: 30,
	},
	mapContainer: {
		marginTop: 20,
	},
}));


export default React.memo(MapPage);