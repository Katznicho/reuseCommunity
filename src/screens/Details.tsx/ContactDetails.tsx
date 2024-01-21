import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import PhoneInput from "react-native-phone-number-input";



const ContactDetails = ({ communityDetails, setCommunityDetails, goToNextStep, goBack, errors, setErrors, }: any) => {

  const tabBarHeight = useBottomTabBarHeight();
  const phoneInput = useRef<PhoneInput>(null);
  const phoneInputLeader = useRef<PhoneInput>(null);
  //phone number details


  const isDisabled = () => {
    if (communityDetails.contact_person === '' || communityDetails.contact_number === '' || communityDetails.contact_person_leader === '' || communityDetails.contact_number_leader === '') {
      return true
    }
    else {
      return false
    }

  }


  return (
    <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
      <View style={[styles.viewStyles]}>
        <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
          Provide Community Contact Details
        </Text>
      </View>
      <View style={[styles.viewStyles]}>
        <Text style={[generalStyles.textStyle]}>
          This will be used to contact you for any further questions and inquiries
        </Text>
      </View>

      {/* contact person */}
      <View style={styles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Community  Contact Person</Text>
        </View>
        <View>
          <TextInput
            style={[generalStyles.formInput, styles.borderStyles, styles.extraMargingRight]}
            placeholderTextColor={COLORS.primaryWhiteHex}
            // placeholderStyle={{ borderColor: 'red' }}
            keyboardType="default"
            placeholder={'enter contact person'}
            onChangeText={text => setCommunityDetails((prev: any) => {
              return { ...prev, contact_person: text }
            })}
            value={communityDetails.contact_person}
            underlineColorAndroid="transparent"
            autoCapitalize="none"

          />


        </View>

        <View>
          {errors.contact_person && <Text style={generalStyles.errorText}>{errors.contact_person}</Text>}
        </View>

      </View>
      {/* contact person */}

      {/* contact person phone number */}
      <View style={generalStyles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Contact Phone Number </Text>
        </View>
        <PhoneInput
          ref={phoneInput}
          defaultValue={communityDetails.contact_number}
          defaultCode="UG"
          layout="second"
          onChangeFormattedText={(text) => {
            // setPhoneNumber(text);
            setCommunityDetails((prev: any) => {
              return { ...prev, contact_number: text }
            })
          }}
          placeholder={'enter phone number'}
          containerStyle={[generalStyles.formInput, styles.borderStyles, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
          textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
          textInputProps={{
            placeholderTextColor: COLORS.primaryWhiteHex
          }}
        />
        <View>
          {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
        </View>

      </View>
      {/* contact person phone number */}

      {/* contact person email */}
      <View style={styles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Contact Person Email</Text>
        </View>
        <View>
          <TextInput
            style={[generalStyles.formInput, styles.borderStyles, styles.extraMargingRight]}
            placeholderTextColor={COLORS.primaryWhiteHex}
            // placeholderStyle={{ borderColor: 'red' }}
            keyboardType="email-address"
            placeholder={'enter contact email'}
            onChangeText={text => setCommunityDetails((prev: any) => {
              return { ...prev, contact_person_email: text }
            })}
            value={communityDetails.contact_person_email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"

          />


        </View>

        <View>
          {errors.contact_person_email && <Text style={generalStyles.errorText}>{errors.contact_person_email}</Text>}
        </View>

      </View>

      {/* contact person email */}

      {/* contact person role */}
      <View style={styles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Contact Person Role</Text>
        </View>
        <View>
          <TextInput
            style={[generalStyles.formInput, styles.borderStyles, styles.extraMargingRight]}
            placeholderTextColor={COLORS.primaryWhiteHex}
            // placeholderStyle={{ borderColor: 'red' }}
            keyboardType="default"
            placeholder={'enter contact person role'}
            onChangeText={text => setCommunityDetails((prev: any) => {
              return { ...prev, contact_person_role: text }
            })}
            value={communityDetails.contact_person_role}
            underlineColorAndroid="transparent"
            autoCapitalize="none"

          />


        </View>

        <View>
          {errors.contact_person_email && <Text style={generalStyles.errorText}>{errors.contact_person_email}</Text>}
        </View>

      </View>

      {/* contact pers on role */}

      {/* leader details */}
      <View style={styles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Community  Leader</Text>
        </View>
        <View>
          <TextInput
            style={[generalStyles.formInput, styles.borderStyles, styles.extraMargingRight]}
            placeholderTextColor={COLORS.primaryWhiteHex}
            // placeholderStyle={{ borderColor: 'red' }}
            keyboardType="default"
            placeholder={'enter community leader name'}
            onChangeText={text => setCommunityDetails((prev: any) => {
              return { ...prev, leader_name: text }
            })}
            value={communityDetails.leader_name}
            underlineColorAndroid="transparent"
            autoCapitalize="none"

          />


        </View>

        <View>
          {errors.leader_name && <Text style={generalStyles.errorText}>{errors.leader_name}</Text>}
        </View>

      </View>

      <View style={styles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Community  Email</Text>
        </View>
        <View>
          <TextInput
            style={[generalStyles.formInput, styles.borderStyles, styles.extraMargingRight]}
            placeholderTextColor={COLORS.primaryWhiteHex}
            // placeholderStyle={{ borderColor: 'red' }}
            keyboardType="email-address"
            placeholder={'enter community leader email'}
            onChangeText={text => setCommunityDetails((prev: any) => {
              return { ...prev, leader_email: text }
            })}
            value={communityDetails.leader_email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"

          />


        </View>

        <View>
          {errors.leader_email && <Text style={generalStyles.errorText}>{errors.leader_email}</Text>}
        </View>

      </View>

      <View style={generalStyles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Leader Phone Number </Text>
        </View>
        <PhoneInput
          ref={phoneInputLeader}
          defaultValue={communityDetails.contact_number}
          defaultCode="UG"
          layout="second"
          onChangeFormattedText={(text) => {
            // setPhoneNumber(text);
            setCommunityDetails((prev: any) => {
              return { ...prev, leader_contact: text }
            })
          }}
          placeholder={'enter leader phone number'}
          containerStyle={[generalStyles.formInput, styles.borderStyles, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
          textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
          textInputProps={{
            placeholderTextColor: COLORS.primaryWhiteHex
          }}
        />
        <View>
          {errors.leader_contact && <Text style={generalStyles.errorText}>{errors.leader_contact}</Text>}
        </View>

      </View>

      <View style={styles.formContainer}>
        <View>
          <Text style={generalStyles.formInputTextStyle}>
            Community  Leader Role</Text>
        </View>
        <View>
          <TextInput
            style={[generalStyles.formInput, styles.borderStyles, styles.extraMargingRight]}
            placeholderTextColor={COLORS.primaryWhiteHex}
            // placeholderStyle={{ borderColor: 'red' }}
            keyboardType="default"
            placeholder={'enter community leader role'}
            onChangeText={text => setCommunityDetails((prev: any) => {
              return { ...prev, leader_role: text }
            })}
            value={communityDetails.leader_role}
            underlineColorAndroid="transparent"
            autoCapitalize="none"

          />


        </View>

        <View>
          {errors.leader_role && <Text style={generalStyles.errorText}>{errors.leader_role}</Text>}
        </View>

      </View>
      {/* leader details */}

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
          { backgroundColor: isDisabled() ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex }
          ]}
          onPress={goToNextStep}
          disabled={isDisabled()}
        // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
        >
          <Text style={generalStyles.loginText}>{'Next'}</Text>
        </TouchableOpacity>

      </View>
      {/* button section */}
    </View>
  )
}

export default ContactDetails

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
  extraMargingRight: {
    marginRight: 30
  }

})