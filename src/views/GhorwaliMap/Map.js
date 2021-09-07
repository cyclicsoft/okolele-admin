import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey('AIzaSyAS6LsvW3W-FiiPy6E0WarKTNELfw7kKyc');
Geocode.enableDebug();

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }
    //Get the current address from the default map position and set those values in the state
    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components;
                this.setState({
                    address: (address) ? address : '',
                })
            },
            error => {
                console.error(error);
            }
        );
    };
    //Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        }
    }
    //This Event triggers when the marker window is closed
    onInfoWindowClose = (event) => {

    };

    /**
     * When the marker is dragged you get the lat and long using the functions available from event object.
     * Use geocode to get the address, city, area and state from the lat and lng positions.
     * And then set those values in the state.
     */
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components;

                //Pass data to parent component
                this.props.getAddress(address)
                this.props.getLatitude(newLat)
                this.props.getLongitude(newLng)

                this.setState({
                    address: (address) ? address : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    // When the user types an address in the search box

    onPlaceSelected = (place) => {
        console.log('plc', place);
        const address = place.formatted_address,
            addressArray = place.address_components,
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        //Pass data to parent component
        this.props.getAddress(address)
        this.props.getLatitude(latValue)
        this.props.getLongitude(lngValue)

        // Set these values in the state.
        this.setState({
            address: (address) ? address : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                        defaultZoom={15}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                        defaultOptions={{
                            scrollwheel: false
                        }}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '50%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '5px',
                                marginBottom: '500px'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                        />
                        {/* InfoWindow on top of marker */}
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.markerPosition.lat), lng: this.state.markerPosition.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>
                        {/*Marker*/}
                        <Marker google={this.props.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <Marker />


                    </GoogleMap>
                )
            )
        );
        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                <AsyncMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAS6LsvW3W-FiiPy6E0WarKTNELfw7kKyc&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        } else {
            map = <div style={{ height: this.props.height }} />
        }
        return (map)
    }
}
export default Map