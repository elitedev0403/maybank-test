// prettier-ignore
import { Divider, Drawer as DrawerMui, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from "../actions";
import * as AddressStoreAction from '../actions/addressAction';
import * as ConfigActions from '../actions/configAction';
import { RootState } from '../reducers';

export function Drawer() {
	const classes = useStyles();
	const drawerOpen: boolean = useSelector((state: RootState) => state.drawerOpen);
	const configActions: typeof ConfigActions = useActions(ConfigActions);

	const handleDrawerToggle = () => {
		configActions.setDrawerOpen(!drawerOpen);
	};
	return (
		<>
			<Hidden mdUp>
				<DrawerMui
					variant="temporary"
					anchor={'left'}
					open={drawerOpen}
					classes={{
						paper: classes.drawerPaper,
					}}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Content />
				</DrawerMui>
			</Hidden>
			<Hidden smDown>
				<DrawerMui
					variant="permanent"
					open
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<Content />
				</DrawerMui>
			</Hidden>
		</>
	);
}

function Content() {
	const classes = useStyles();
	const addresses = useSelector((state: RootState) => state.addressStore.addresses);
	const selected = useSelector((state: RootState) => state.addressStore.selected);
	const addressStoreActions = useActions(AddressStoreAction);
	return (
		<div style={{
			height: '100%',
			display: 'flex',
			flexFlow: 'column',
		}}>
			<div className={classes.drawerHeader} />
			<Divider />
			<div style={{ height: '100%', overflowY: 'auto' }}>
				<List style={{ overflowY: 'auto' }}>
					{
						addresses.map((addr, index) => (
							<ListItem key={'addr_' + index} button onClick={() => { addressStoreActions.selectChange(index) }} selected={selected === index}>
								<ListItemIcon>
									<LocationOn />
								</ListItemIcon>
								<ListItemText primary={addr} />
							</ListItem>
						))
					}
				</List>
				<Divider />
			</div>
		</div >
	);
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			position: 'relative',
			height: '100%',
		},
	},
	addPaper: {
		padding: 10,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	addButton: {
		alignItems: 'baseline',
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 30,
		backgroundColor: '#858585',
	},
}));
