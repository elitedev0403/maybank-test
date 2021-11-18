import * as React from 'react';
import { withScriptjs } from 'react-google-maps';
import config from './config';

// HOC

export function withMap(Component: any) {
    function WithMap(props: object) {
        const MapLoader = withScriptjs(Component);

        return (
            <MapLoader
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_API_KEY}&libraries=places`}
                loadingElement={<div style={{ height: `100%` }} />}
            />
        );
    }

    return WithMap;
}

