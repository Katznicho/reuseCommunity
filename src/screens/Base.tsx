import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../navigators/AuthStack';
import { AppDispatch, RootState } from '../redux/store/dev';
import { useDispatch, useSelector } from 'react-redux';
import DrawerNavigator from '../navigators/DrawerNavigator';



const Stack = createNativeStackNavigator();

const Base = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);



    useEffect(() => {
    }, [isLoggedIn])



    return (
        <NavigationContainer>
            {
                isLoggedIn ?
                    <DrawerNavigator />
                    : <AuthStack />
            }


        </NavigationContainer>
    )
}

export default Base

