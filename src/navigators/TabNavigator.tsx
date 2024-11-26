/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
// import { BlurView } from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import ProfileStack from './ProfileStack';
import MyNotificationStack from './MyNotificationStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReuseStack from './ReuseStack';
import HomeStack from './HomeStack';
import CartScreen from '../screens/CartScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.user,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primaryOrangeHex,
        tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
        // tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="Reuse"
        component={ReuseStack}
        options={{
          title: 'Reuse',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="recycle"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Notification"
        component={MyNotificationStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="bell"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>

      {/* history */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="shoppingcart"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      {/* history */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="user"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>


    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackHex,
    borderTopWidth: 1,
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,


  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
