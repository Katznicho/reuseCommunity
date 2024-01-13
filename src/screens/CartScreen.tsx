import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
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

const CartScreen = ({ navigation, }: any) => {

  const { cartList } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<any>()



  const calculateCartPrice = () => {
    // Use reduce to sum up the total_amount of all items in the cart
    return cartList.reduce((total, item) => total + Number(item?.total_amount), 0);
  };




  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    // navigation.push('Payment', { amount: CartPrice });
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



  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >

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
});

export default CartScreen;
