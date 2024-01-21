import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { COLORS } from '../../theme/theme'
import TextArea from '../../components/TextArea'
import UserLocation from '../../components/Modals/UserLocation'
// import { Picker } from 'react-native-ui-lib'
import { Picker } from '@react-native-picker/picker';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';




const Community = ({ communityDetails, setCommunityDetails, goToNextStep, errors, setErrors, categories }: any) => {


    const [openPicker, setOpenPicker] = useState<boolean>(false)




    const tabBarHeight = useBottomTabBarHeight();

    const isDisabled = () => {
        if (communityDetails.purpose === '' || communityDetails.location === '' || communityDetails.latitude === '' || communityDetails.longitude === '' || communityDetails.community_category_id === '') {
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
                    Provide Community Details
                </Text>
            </View>
            <View style={[styles.viewStyles]}>
                <Text style={[generalStyles.textStyle]}>
                    This will be used to identify your community and create a cutsomized plan for you
                </Text>
            </View>

            {/* purpose */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>Purpose of Community</Text>
                </View>
                <View>
                    <TextArea
                        placeholder="Tell us the purpose of your community"
                        text={communityDetails.purpose}
                        setText={(text: any) => {
                            setCommunityDetails((prev: any) => {
                                return { ...prev, purpose: text }
                            })
                        }
                        }
                    />


                </View>

                <View>
                    {errors.purpose && <Text style={generalStyles.errorText}>{errors.purpose}</Text>}
                </View>

            </View>
            {/* purpose */}

            {/* community category */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Select Community Category</Text>
                </View>
                <Picker
                    // style={[generalStyles.formInput, styles.borderStyles]}
                    placeholder=" select community category"
                    selectedValue={communityDetails.community_category_id}
                    onValueChange={(itemValue, itemIndex) => {
                        setCommunityDetails((prev: any) => {
                            return { ...prev, community_category_id: itemValue }
                        })
                    }}
                    itemStyle={{
                        color: COLORS.primaryWhiteHex,
                        backgroundColor: COLORS.primaryBlackHex,
                        borderWidth: 1
                    }}
                    selectionColor={COLORS.primaryWhiteHex}
                    accessibilityActions={[{ name: 'done', label: 'Done' }]}

                    mode="dropdown"
                    enabled
                    dropdownIconColor={COLORS.primaryWhiteHex}
                >
                    {categories.map((item: any) => {

                        return (<Picker.Item
                            color={COLORS.primaryWhiteHex}
                            style={[{
                                backgroundColor: COLORS.primaryBlackHex,
                                borderColor: COLORS.primaryWhiteHex,
                                borderRadius: 10,
                                borderWidth: 1
                            }]}
                            key={item.id}
                            value={item.id}
                            label={item.name}
                        />)
                    })}
                </Picker>
            </View>
            {/* category */}
            {/* community category */}

            <View style={[generalStyles.flexStyles]}>
                {/* total women */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Total Women</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="number-pad"
                            placeholder={'enter total women'}
                            onChangeText={text => setCommunityDetails((prev: any) => {
                                return { ...prev, total_members_women: text }
                            })}
                            value={communityDetails.total_members_women}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />


                    </View>

                    <View>
                        {errors.total_members_women && <Text style={generalStyles.errorText}>{errors.total_members_women}</Text>}
                    </View>

                </View>

                {/* total women */}

                {/* total men */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Total Men</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="number-pad"
                            placeholder={'enter total  men '}
                            onChangeText={text => setCommunityDetails((prev: any) => {
                                return { ...prev, total_members_men: text }
                            })}
                            value={communityDetails.total_members_men}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />


                    </View>

                    <View>
                        {errors.total_members_men && <Text style={generalStyles.errorText}>{errors.total_members_men}</Text>}
                    </View>

                </View>
                {/* total men */}

            </View>

            {/* totals */}
            <View style={[generalStyles.flexStyles]}>
                {/* total children */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Total Children</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="number-pad"
                            placeholder={'enter total  children'}
                            onChangeText={text => setCommunityDetails((prev: any) => {
                                return { ...prev, total_members_children: text }
                            })}
                            value={communityDetails.total_members_children}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />


                    </View>

                    <View>
                        {errors.total_members_women && <Text style={generalStyles.errorText}>{errors.total_members_women}</Text>}
                    </View>

                </View>
                {/* totat children */}
                {/* total members */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Total Members</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="number-pad"
                            placeholder={'total  members'}
                            onChangeText={text => setCommunityDetails((prev: any) => {
                                return { ...prev, total_members: text }
                            })}
                            value={communityDetails.total_members}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />


                    </View>

                    <View>
                        {errors.total_members && <Text style={generalStyles.errorText}>{errors.total_members}</Text>}
                    </View>

                </View>
                {/* total members */}

            </View>
            {/* totals */}


            {/* year started */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Year Started</Text>
                </View>
                <View>
                    <TextInput
                        style={[generalStyles.formInput, styles.borderStyles]}
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        // placeholderStyle={{ borderColor: 'red' }}
                        keyboardType="number-pad"
                        placeholder={'enter year started'}
                        onChangeText={text => setCommunityDetails((prev: any) => {
                            return { ...prev, year_started: text }
                        })}
                        value={communityDetails.year_started}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"

                    />


                </View>

                <View>
                    {errors.year_started && <Text style={generalStyles.errorText}>{errors.year_started}</Text>}
                </View>

            </View>
            {/* year started */}


            {/* location */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Location</Text>
                </View>
                <View>
                    <TextInput
                        style={[generalStyles.formInput, styles.borderStyles]}
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        // placeholderStyle={{ borderColor: 'red' }}
                        keyboardType="default"
                        placeholder={'enter current community location'}
                        onChangeText={text => setOpenPicker(true)}
                        value={communityDetails.location}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"

                    />


                </View>

                <View>
                    {errors.location && <Text style={generalStyles.errorText}>{errors.location}</Text>}
                </View>

            </View>
            {/* location */}

            {/* location */}
            <UserLocation
                openPicker={openPicker}
                setOpenPicker={setOpenPicker}
                communityDetails={communityDetails}
                setCommunityDetails={setCommunityDetails}
            />
            {/* location */}


            {/* next button */}
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer,
                    styles.buttonStyles,
                    { backgroundColor: isDisabled() ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex }
                    ]}
                    onPress={goToNextStep}
                    disabled={isDisabled()}
                >
                    <Text style={generalStyles.loginText}>{'Next'}</Text>
                </TouchableOpacity>
            </View>
            {/* next button */}


        </View>
    )
}

export default Community

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
    }

})