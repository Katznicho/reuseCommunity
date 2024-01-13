import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text, Dimensions
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import { RootState } from '../redux/store/dev';
import { useDispatch, useSelector } from 'react-redux';
import { generalStyles } from './utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeFromCart } from '../redux/store/slices/CartSlice';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { useNavigation } from '@react-navigation/native';
import { PROCESSORDER } from './utils/constants/routes';
import { PAYMENT_TYPE } from './utils/constants/constants';
import { Dialog, PanningProvider } from 'react-native-ui-lib';
import { usePostQuery } from '../hooks/usePostQuery';

const { width } = Dimensions.get('window');

const CartScreen = () => {

  const navigation = useNavigation<any>();

  const { cartList } = useSelector((state: RootState) => state.cart);
  const { user, authToken } = useSelector((state: RootState) => state.user);

  const { data, error, isLoading, } = usePostQuery<any>({
    endpoint: '/auth/hasWalletAccount',
    params: {
      "account": "hasWalletAccount"
    },
    queryOptions: {
      enabled: true,
      refetchInterval: 2000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  })

  const handlePaymentMethodSelection = (method: React.SetStateAction<string>) => {
    setSelectedPaymentMethod(method);
  };

  const [redirect_url, setRedirect_url] = useState('')
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('Other');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dispatch = useDispatch<any>()

  const calculateCartPrice = () => {
    // Use reduce to sum up the total_amount of all items in the cart
    return cartList.reduce((total, item) => total + Number(item?.total_amount), 0);
  };




  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    setIsVisible(true);

  };


  const onRemoveHandler = (item: any) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: 'OK',
          onPress: () => {
            dispatch(removeFromCart(item))
            return showMessage({
              message: 'Removed from cart',
              description: 'Item removed from cart',
              type: 'success',
              icon: 'success',
              duration: 3000,
              autoHide: true

            })
          },
        },
      ],
      { cancelable: false },
    );
  }


  const onMakePayment = async () => {

    if (selectedPaymentMethod === 'Other') {
      const formData = new FormData();
      formData.append('amount', calculateCartPrice());
      formData.append('description', "Paying for product cart Items");
      formData.append('phone_number', user?.phone);
      formData.append("cart_items", JSON.stringify(cartList));
      formData.append('callback', `https://reuse.risidev.com/finishPayment`);
      formData.append('cancel_url', `https://reuse.risidev.com/cancelPayment`);
      formData.append("payment_type", PAYMENT_TYPE.Order)

      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      setLoading(true)


      fetch(`${PROCESSORDER}`, {
        method: 'POST',
        headers,
        body: formData
      }).then((response) => {

        return response.json()
      }).then((result) => {

        if (result?.response?.success) {
          setRedirect_url(result?.response?.message?.redirect_url)
          // return navigation.navigate('ReuseWebView', {
          //     url: result?.response?.message?.redirect_url
          // })
          return navigation.navigate("Donate", { screen: "MyWebView", params: { url: result?.response?.message?.redirect_url } })
        }
        else {
          setLoading(false);
          return showMessage({
            message: "Failed to Initiate Deposit",
            description: "Please try again",
            type: "info",
            icon: "info",
            duration: 3000,
            autoHide: true
          })

        }

      }).catch((error) => {
        showMessage({
          message: 'Failed to create pin',
          description: 'Please try again',
          type: 'info',
          icon: 'info',
          duration: 3000,
          autoHide: true,
        });
        return setLoading(false);

      })

    }
    else {
      return Alert.alert("wallet")
    }

  }



  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      {/* payment methods */}
      <Dialog
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
        containerStyle={{
          backgroundColor: COLORS.primaryBlackHex,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10
        }}
        height={500}>
        <View>
          <Text style={[generalStyles.textStyle]}>Select Payment Method</Text>
        </View>

        <View style={[styles.paymenthMethod]}>

          {
            data?.response == "failure" ? (<TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('CreateWallet')}
              style={[generalStyles.loginContainer, { width: "100%", marginTop: 5, borderRadius: 10 }]}
            >
              <Text style={generalStyles.loginText}>{'Add Wallet Account'}</Text>
            </TouchableOpacity>) : (<TouchableOpacity
              onPress={() => {
                handlePaymentMethodSelection('Wallet');
              }}
              style={[
                styles.choosePayment,
                {
                  backgroundColor:
                    selectedPaymentMethod === 'Wallet'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryLightGreyHex,
                },
              ]}>
              <Text style={[styles.textStyle]}>Wallet</Text>
            </TouchableOpacity>)
          }


          <TouchableOpacity
            onPress={() => {
              handlePaymentMethodSelection('Other');
            }}
            style={[
              styles.choosePayment,
              {
                backgroundColor:
                  selectedPaymentMethod === 'Other'
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryLightGreyHex,
              },
            ]}
          >
            <Text style={[styles.textStyle]}>Other</Text>
          </TouchableOpacity>

        </View>

        {/* payment buttons */}
        <View >
          <View>

            <TouchableOpacity
              style={[generalStyles.loginContainer, { backgroundColor: COLORS.primaryRedHex, width: "100%", }]}
              onPress={() => {
                setLoading(false);
                setIsVisible(false)
              }}

            >
              <Text style={generalStyles.loginText}>{'Cancel Payment'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={selectedPaymentMethod === ''}
              style={[generalStyles.loginContainer, { backgroundColor: COLORS.primaryOrangeHex, width: "100%" }]}
              onPress={() => onMakePayment()}

            >
              <Text style={generalStyles.loginText}>{'Make Payment'}</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator />}
          </View>

        </View>
        {/* payment buttons */}
      </Dialog>
      {/* payment methods */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollViewFlex, { paddingBottom: tabBarHeight }]}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight, marginTop: 10 }]}>
          <View style={styles.ItemContainer}>


            {cartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {cartList.map((data: any) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.cover_image}
                      special_ingredient={data.user.name}
                      roasted={data.total_amount}
                      onRemoveHandler={() => onRemoveHandler(data)}
                      item={data}

                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {cartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              price={calculateCartPrice()}
            />
          ) : (
            <></>
          )}
          {loading && <ActivityIndicator />}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
  paymenthMethod: {
    // backgroundColor: COLORS.primaryWhiteHex,
    // elevation: 10,
    borderRadius: 10,
  },
  choosePayment: {
    // backgroundColor: theme.colors.preference.secondaryBackground,
    // elevation: 10,
    borderRadius: 10,
    padding: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    width: width * 0.8,
  },
  textStyle: {
    color: COLORS.primaryWhiteHex
  }
});

export default CartScreen;
