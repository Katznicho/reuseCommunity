import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { generalStyles } from './utils/generatStyles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Wizard, WizardStepStates, } from 'react-native-ui-lib';
import Community from './Details.tsx/Community';
import ContactDetails from './Details.tsx/ContactDetails';
import CommunityImages from './Details.tsx/CommunityImages';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';

interface State {
    activeIndex: number;
    completedStepIndex?: number;
    allTypesIndex: number;
    toastMessage?: string;
}

const CommunityDetails = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const { user } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState<boolean>(false)
    const [communityDetails, setCommunityDetails] = useState<any>({

    })
    const [errors, setErrors] = useState({})

    const [state, setState] = useState<State>({
        activeIndex: 0,
        completedStepIndex: undefined,
        allTypesIndex: 0,

    })
    const onActiveIndexChanged = (activeIndex: number) => {
        // Update the activeIndex in the state
        setState((prevState) => ({
            ...prevState,
            activeIndex,
        }));
    };



    const goToNextStep = () => {
        const { activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex } = state;
        const reset = prevActiveIndex === 2;

        if (reset) {
        } else {
            const activeIndex = prevActiveIndex + 1;
            let completedStepIndex: number | undefined = prevCompletedStepIndex;

            if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
                completedStepIndex = prevActiveIndex;
            }

            // Check if the activeIndex or completedStepIndex needs updating
            if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
                // Update the state to move to the next step
                setState((prevState: any) => ({
                    ...prevState,
                    activeIndex,
                    completedStepIndex,
                }));
            }
        }
    };


    const goBack = () => {
        const { activeIndex: prevActiveIndex } = state;
        const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

        setState((prevState: any) => ({
            ...prevState,
            activeIndex,
        }));
    };


    const renderCurrentStep = () => {
        switch (state.activeIndex) {
            case 0:
                return <Community
                    communityDetails={communityDetails}
                    setCommunityDetails={setCommunityDetails}
                    goToNextStep={goToNextStep}
                />
            case 1:
                return <ContactDetails
                    communityDetails={communityDetails}
                    setCommunityDetails={setCommunityDetails}
                    goBack={goBack}
                    goToNextStep={goToNextStep}


                />

            case 2:
                return <CommunityImages
                    goBack={goBack}
                    loading={loading}
                    communityDetails={communityDetails}
                    setCommunityDetails={setCommunityDetails}
                />
            default:
                return null;
        }
    };


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
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                        Provide Community Details
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        This will be used to identify your community and create a cutsomized plan for you
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default CommunityDetails

const styles = StyleSheet.create({})