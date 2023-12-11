import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useRef } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useFirebase } from '../../hooks/useFirebase'
import { BORDERRADIUS, COLORS } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { Keyboard } from 'react-native'
import { APP_USERS } from '../utils/constants/constants'
import { showMessage } from 'react-native-flash-message'
import PhoneInput from "react-native-phone-number-input";

const Register = () => {
  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { signUpWithGoogle, register } = useFirebase()
  const navigation = useNavigation<any>();
  const [communityName, setCommunityName] = React.useState<any>('');
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [confirmPassword, setConfirmPassword] = React.useState<any>('');
  const [username, setUsername] = React.useState<any>('');
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState<any>('');
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);

  const [errors, setErrors] = useState<any>({
    passwordMatch: '',
    CommunityName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTextType, setPasswordTextType] = useState("password");


  const onRegister = async () => {

    // Validate email format
    if (!validateEmail(email)) {

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;

    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: '',
      }));
    }

    // Validate password matching
    if (password !== confirmPassword) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        passwordMatch: 'Passwords do not match',
      }));
      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        passwordMatch: '',
      }));
    }

    const usernameRegex = /^@[\w]+$/;
    if (!usernameRegex.test(username)) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        username: 'Username should start with "@" followed by alphanumeric characters',
      }));
      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        username: '',
      }));
    }



    const trimmedFields = {
      communityName: communityName.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
      username: username.trim(),
    };
    setLoading(true)
    Keyboard.dismiss()

    try {
      await register(trimmedFields.email, trimmedFields.password, trimmedFields.username, "", "", APP_USERS.RECEIVER, trimmedFields.communityName, phoneNumber);

      setLoading(false);
      showMessage({
        message: "Success",
        description: "Your account has been created",
        type: "success",
        autoHide: true,
        duration: 3000,
        icon: "success"
      })
    }
    catch (error) {
      setLoading(false);
      showMessage({
        message: "Error",
        description: "An error occured while creating your account",
        type: "info",
        autoHide: true,
        duration: 3000,
        icon: "danger"
      })
    }

  }



  return (
    <View style={generalStyles.ScreenContainer}>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          width: '100%',
          paddingBottom: 60
        }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}

      >
        {/* login and register */}
        {/* <Text style={styles.title}>{'Login'}</Text> */}

        {/* login and register */}
        <View
          style={[
            generalStyles.flexStyles,
            {
              alignItems: 'center',
            },
          ]}
        >


          <View>
            <TouchableOpacity
              onPress={() => {

                navigation.navigate('Login');
              }}
            >
              <Text style={generalStyles.authTitle}>Login</Text>
            </TouchableOpacity>
          </View>

          <View

          >
            <TouchableOpacity>
              <Text style={generalStyles.authTitle}>Register</Text>
            </TouchableOpacity>
            <View style={generalStyles.bottomHairline} />

          </View>
        </View>
        {/*  register */}

        <View style={generalStyles.centerContent}>
          <Text style={{
            // fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            Community Name</Text>
        </View>

        <TextInput
          style={generalStyles.InputContainer}
          placeholder={'enter first name'}
          placeholderTextColor={COLORS.primaryWhiteHex}
          onChangeText={text => setCommunityName(text)}
          value={communityName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.communityName && <Text style={generalStyles.errorText}>{errors.communityName}</Text>}
        </View>

        <View style={generalStyles.centerContent}>
          <Text style={{
            // fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            Phone Number</Text>
        </View>

        <TextInput
          style={generalStyles.InputContainer}
          placeholder={'enter phone number with country code'}
          placeholderTextColor={COLORS.primaryWhiteHex}
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="phone-pad"
        />
        <View style={generalStyles.centerContent}>
          {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
        </View>


        <View style={generalStyles.centerContent}>
          <Text style={{
            // fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            User Name</Text>
        </View>

        <TextInput
          style={generalStyles.InputContainer}
          placeholder={'enter username'}
          placeholderTextColor={COLORS.primaryWhiteHex}
          onChangeText={text => setUsername(text)}
          value={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.username && <Text style={generalStyles.errorText}>{errors.username}</Text>}
        </View>


        <View style={generalStyles.centerContent}>
          <Text style={{
            // fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            Email</Text>
        </View>
        <TextInput
          style={generalStyles.InputContainer}
          placeholder={'enter email address'}
          keyboardType="email-address"
          placeholderTextColor={COLORS.primaryWhiteHex}
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
        </View>

        <View style={generalStyles.centerContent}>
          <Text style={{
            // fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            Password</Text>
        </View>

        <TextInput
          style={generalStyles.InputContainer}
          placeholderTextColor={COLORS.primaryWhiteHex}
          secureTextEntry
          placeholder={'enter password '}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.password && <Text style={generalStyles.errorText}>{errors.password}</Text>}
        </View>

        <View style={generalStyles.centerContent}>
          <Text style={{
            // fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            Confirm Password</Text>
        </View>

        <TextInput
          style={generalStyles.InputContainer}
          placeholderTextColor={COLORS.primaryWhiteHex}
          secureTextEntry
          placeholder={'confirm password'}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.confirmPassword && <Text style={generalStyles.errorText}>{errors.confirmPassword}</Text>}
        </View>

        {/* <View style={styles.forgotPasswordContainer}>
      <TouchableOpacity onPress={() => onForgotPassword()}>
        <Text style={styles.forgotPasswordText}>
          {'Forgot password?'}
        </Text>
      </TouchableOpacity>
    </View> */}

        <TouchableOpacity
          style={[styles.loginContainer, {
            marginTop: 5,
            marginBottom: 20
          }]}
          onPress={() => onRegister()}
        >
          <Text style={styles.loginText}>{'Register'}</Text>
        </TouchableOpacity>
        <>
          {/* <Text style={styles.orTextStyle}> {'OR'}</Text>
      <Text style={styles.facebookText}>
        {'Login With Google'}
      </Text> */}
        </>


        {/* <IMGoogleSignInButton
      containerStyle={styles.googleButtonStyle}
      onPress={onGoogleButtonPress}
    /> */}

        {/* <TouchableOpacity
      style={styles.phoneNumberContainer}
      onPress={() => navigation.navigate('Sms', { isSigningUp: false })}>
      <Text style={styles.phoneNumber}>
        Login with phone number
      </Text>
    </TouchableOpacity> */}

        {loading && <ActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  orTextStyle: {
    color: COLORS.primaryWhiteHex,
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },

  loginContainer: {
    width: '70%',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffff',
  },
  placeholder: {
    color: 'red',
  },
})