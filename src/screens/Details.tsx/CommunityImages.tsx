import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../theme/theme'
import { generalStyles } from '../utils/generatStyles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import UploadComponent from '../../components/UploadComponent';

const CommunityImages = ({ communityDetails, setCommunityDetails, goToNextStep, loading, goBack, imagePath, setImagePath, onSubmit }: any) => {

  const tabBarHeight = useBottomTabBarHeight();
  const [showModal, setShowModal] = useState<boolean>(false);


  return (
    <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
      <View style={[styles.viewStyles]}>
        <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
          Provide Community Images
        </Text>
      </View>
      <View style={[styles.viewStyles]}>
        <Text style={[generalStyles.textStyle]}>
          This will be used to identify your community and create a cutsomized plan for you
        </Text>
      </View>
      {/* image section */}
      {
        imagePath ? (<View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {

              setShowModal(!showModal);

            }}
            style={[generalStyles.centerContent]}>
            <Image
              source={{ uri: imagePath.imagePath }}
              style={[styles.coverStyles, generalStyles.centerContent]}
            />

          </TouchableOpacity>



        </View>) : (<TouchableOpacity
          activeOpacity={1}
          onPress={() => {

            setShowModal(!showModal);


          }}
          style={[styles.coverStyles, generalStyles.centerContent]}>

          <AntDesign
            name={'plus'}
            color={COLORS.primaryWhiteHex}
            size={20}
            style={{
              borderRadius: 10,
              padding: 10,
              borderStyle: "dotted",
            }}
          />
          <View>
            <Text>Add community photo</Text>
          </View>

        </TouchableOpacity>)
      }
      {/* image section */}

      {/* modal section */}
      {showModal && (
        <UploadComponent
          image={imagePath}
          setImage={setImagePath}
          setModal={setShowModal}
          showModal={showModal}
          selectDocument={false}
        />
      )}

      {/* modal section */}

      {/* button section */}
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.loginContainer,
          styles.buttonStyles
          ]}
          onPress={goBack}
        // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
        >
          <Text style={generalStyles.loginText}>{'Back'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[generalStyles.loginContainer,
          styles.buttonStyles,
          { backgroundColor: !imagePath || loading ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex }
          ]}
          onPress={onSubmit}
          disabled={loading || !imagePath}
        // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}

        >
          <Text style={generalStyles.loginText}>{'Finish'}</Text>
        </TouchableOpacity>

      </View>
      {/* button section */}
    </View>
  )
}

export default CommunityImages

const styles = StyleSheet.create({
  viewStyles: {
    marginHorizontal: 10, marginVertical: 5
  },
  borderStyles: {
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    height: 45,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  formContainer: {
    marginVertical: 10,
    marginHorizontal: 15
  },
  inlineTextInputStyles: {
    width: "100%"
  },
  buttonStyles: {
    width: "80%",
    marginTop: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10
  },
  coverStyles: {
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
    width: "95%",
    marginHorizontal: 10,
    marginVertical: 10,
    height: 150,
    // borderStyle: "dotted",
    borderRadius: 10
  },

})