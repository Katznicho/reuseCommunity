import React, { useState } from 'react';
import {
  ScrollView,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { useShowGreeting } from '../hooks/useShowGreetings';
import { generalStyles } from './utils/generatStyles';
import CheckUserWallet from '../components/CheckUserWallet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MarketPlace from '../components/MarketPlace';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useGetUserLocation from '../hooks/useGetUserLocation';
import { usePostQuery } from '../hooks/usePostQuery';
import PopUp from '../components/Modals/PopUp';


const HomeScreen = () => {

  const { user } = useSelector((state: RootState) => state.user);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  let greetings = useShowGreeting()

  const tabBarHeight = useBottomTabBarHeight();

  const { position } = useGetUserLocation()


  const { data, error, isLoading, refetch } = usePostQuery<any>({
    endpoint: '/getStoredCommunityDetails',
    params: {
      "communityDetails": "communityDetails"
    },
    queryOptions: {
      enabled: true,
      refetchInterval: 2000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  })




  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >


        {/* App Header */}
        <HeaderBar title={`${greetings} ${user?.fname} !`} />
        {/* App Header */}

        {/* wallet */}
        <CheckUserWallet />
        {/* wallet */}

        {/* show complete dailog */}
        {
          data != null && data?.data.length == 0 && (<PopUp />)
        }
        {/* show complete dailog  */}


        {/* market place */}
        <MarketPlace />
        {/* market place */}

      </ScrollView>
    </KeyboardAwareScrollView>
  );
};



export default HomeScreen;
