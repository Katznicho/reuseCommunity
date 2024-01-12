import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import { generalStyles } from './utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';


const { width } = Dimensions.get('window');

const DetailsScreen = ({ navigation }: any) => {

  const { item } = useRoute<any>().params;

  const [price, setPrice] = useState(item?.total_amount);
  const [fullDesc, setFullDesc] = useState(true);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    // favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    // addToCart({
    //   id,
    //   index,
    //   name,
    //   roasted,
    //   imagelink_square,
    //   special_ingredient,
    //   type,
    //   prices: [{ ...price, quantity: 1 }],
    // });
    // calculateCartPrice();
    navigation.navigate('Cart');
  };

  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={item?.cover_image}
          type={item?.category?.name}
          id={item?.id}
          favourite={item?.favourite}
          name={item?.name}
          special_ingredient={item?.user?.name}
          ingredients={item.weight}
          average_rating={item.rating}
          ratings_count={item?.total_amount}
          roasted={item?.total_amount}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={[generalStyles.flexStyles, { marginHorizontal: 10 }]}>
          {
            Array(item.rating).fill(item.rating).map((item, index) => (
              <AntDesign
                name="star"
                color={COLORS.primaryOrangeHex}
                size={15}
                key={index}
              />
            ))
          }
        </View>

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>
                {item.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {item.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>
        {/* more pictures */}
        <View>
          <Text style={styles.InfoTitle}>More Images</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item?.images.map((item: string, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.imageContainer}
                >
                  <Image
                    source={{ uri: item }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {/* more pictures */}
        <PaymentFooter
          price={item?.total_amount}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCarthandler({
              item
            });
          }}
        />
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
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  imageContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    width: width * 0.6,
    height: width * 0.6,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default DetailsScreen;
