import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import ProfileStack from './ProfileStack';
import MyNotificationStack from './MyNotificationStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReuseStack from './ReuseStack';
import HomeStack from './HomeStack';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}
          />
        ),
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
            <Image
              source={require('../assets/images/logo.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: focused
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex,
              }}
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
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="history"
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
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',

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
