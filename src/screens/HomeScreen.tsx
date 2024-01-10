import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { useShowGreeting } from '../hooks/useShowGreetings';
import { generalStyles } from './utils/generatStyles';
import CheckUserWallet from '../components/CheckUserWallet';


const HomeScreen = ({ navigation }: any) => {

  const [position, setPosition] = useState<any>(null);
  const { user, authToken } = useSelector((state: RootState) => state.user);
  let greetings = useShowGreeting()

  // const getCurrentPosition = () => {
  //   Geolocation.getCurrentPosition(
  //     (pos: any) => {

  //       const { latitude, longitude } = pos.coords;
  //       setPosition({ latitude, longitude });
  //     },
  //     (error: any) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
  //     { enableHighAccuracy: true, }
  //   );
  // };

  // useEffect(() => {
  //   getCurrentPosition();
  // }, []);



  return (
    <View style={generalStyles.ScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar title={`${greetings} ${user?.fname} !`} />
        {/* App Header */}

        {/* header */}
        {/* wallet */}
        <CheckUserWallet />
        {/* wallet */}
        {/* totals */}
        {/* <Totals /> */}
        {/* totals */}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  cardStyles: {
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: COLORS.primaryOrangeHex,
    width: 150,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: "center",
    elevation: 5,
    color: COLORS.primaryWhiteHex

  },
  textStyles: {
    fontWeight: "bold",
    color: COLORS.primaryWhiteHex
    // fontSize: 18
  },
  iconStyles: {
    marginBottom: 10
  }
});

export default HomeScreen;
