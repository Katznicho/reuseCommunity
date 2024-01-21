import { Alert, StyleSheet } from 'react-native'
import React from 'react';
import Geolocation from '@react-native-community/geolocation';



const useGetUserLocation = () => {

    // Geolocation.setRNConfiguration(
    //     config: {
    //       skipPermissionRequests: boolean;
    //       authorizationLevel?: 'always' | 'whenInUse' | 'auto';
    //       enableBackgroundLocationUpdates?: boolean;
    //       locationProvider?: 'playServices' | 'android' | 'auto';
    //     }
    //   ) => void

    const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 })

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos: { coords: { latitude: any; longitude: any; }; }) => {

                const { latitude, longitude } = pos.coords;
                setPosition({ latitude, longitude });
            },
            (error: any) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true, }
        );
    };

    React.useEffect(() => {
        getCurrentPosition();
    }, [])

    return {
        position
    }
}

export default useGetUserLocation

const styles = StyleSheet.create({})