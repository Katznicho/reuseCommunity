import { StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { generalStyles } from './utils/generatStyles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Wizard, WizardStepStates, } from 'react-native-ui-lib';
import Community from './Details.tsx/Community';
import ContactDetails from './Details.tsx/ContactDetails';
import CommunityImages from './Details.tsx/CommunityImages';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { COLORS } from '../theme/theme';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { UploadImage } from '../hooks/UploadImage';
import { Alert } from 'react-native';
import { COMMUNITY_STORAGE } from './utils/constants/constants';
import { ALL_COMMUNITY_CATEGORIES, STORE_COMMUNITY_DETAILS } from './utils/constants/routes';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

interface State {
    activeIndex: number;
    completedStepIndex?: number;
    allTypesIndex: number;
    toastMessage?: string;
}


const CommunityDetails = () => {

    const navigation = useNavigation<any>();
    const tabBarHeight = useBottomTabBarHeight();
    const { user, authToken } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState<boolean>(false)
    const [imagePath, setImagePath] = useState<any>(null);
    const [communityDetails, setCommunityDetails] = useState<any>({
        purpose: '',
        location: '',
        latitude: '',
        longitude: '',
        community_category_id: '',
        contact_person: '',
        contact_number: '',
        contact_person_email: '',
        contact_person_role: '',
        total_members_women: '',
        total_members_men: '',
        total_members: '',
        total_members_children: "",
        total_children: '',
        year_started: '',
        leader_name: '',
        leader_role: '',
        leader_email: '',
        leader_contact: '',
        images: '',

    })
    const [errors, setErrors] = useState({})

    const [categories, setCategories] = useState<any>([])
    useEffect(() => {

        fetch(ALL_COMMUNITY_CATEGORIES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {

            res.json().then((data) => {
                console.log(data)

                setCategories(data.data);
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })


    }, [])

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

    const onSubmit = async () => {
        try {
            setLoading(true);
            if (imagePath) {
                const { image, error } = await UploadImage(
                    user?.UID,
                    imagePath.imagePath,
                    COMMUNITY_STORAGE
                );
                if (error) {
                    Alert.alert(`Error uploading image for cover image. Please try again.`);
                }
                if (image) {

                    //push the image into the images array
                    setCommunityDetails((prev: any) => {
                        return {
                            ...prev,
                            images: image
                        }
                    })
                }
            }

            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);
            const body = new FormData();
            body.append("purpose", communityDetails.purpose);
            body.append("location", communityDetails.location);
            body.append("latitude", communityDetails.latitude);
            body.append("longitude", communityDetails.longitude);
            body.append("community_category_id", communityDetails.community_category_id);
            body.append("contact_person", communityDetails.contact_person);
            body.append("contact_number", communityDetails.contact_number);
            body.append("contact_person_email", communityDetails.contact_person_email);
            body.append("contact_person_role", communityDetails.contact_person_role);
            body.append("total_members_women", communityDetails.total_members_women);
            body.append("total_members_men", communityDetails.total_members_men);
            body.append("total_members", communityDetails.total_members);
            body.append("total_members_children", communityDetails.total_members_children);
            body.append("total_children", communityDetails.total_children);
            body.append("year_started", communityDetails.year_started);
            body.append("leader_name", communityDetails.leader_name);
            body.append("leader_role", communityDetails.leader_role);
            body.append("leader_email", communityDetails.leader_email);
            body.append("leader_contact", communityDetails.leader_contact);
            body.append("images[]", communityDetails.images);
            // body.append("images", JSON.stringify(communityDetails.images));
            // communityDetails.images.forEach((image: any) => {
            //     body.append("images[]", image);
            // })
            fetch(`${STORE_COMMUNITY_DETAILS}`, {
                method: 'POST',
                headers,
                body,
            }).then((response) => response.json())
                .then((result) => {
                    setLoading(false)
                    console.log(result)

                    if (result.success == true) {
                        showMessage({
                            message: "Success",
                            description: "Community created successfully.",
                            type: "success",
                            icon: "success",
                            duration: 3000,
                            autoHide: true
                        });
                        return navigation.goBack();

                    }
                    else {
                        return showMessage({
                            message: "Error",
                            description: "Something went wrong. Please try again.",
                            type: "danger",
                            icon: "danger",
                            duration: 3000,
                            autoHide: true
                        })

                    }


                }).catch((error) => {
                    console.log(error)
                })





        } catch (error) {
            setLoading(false);
            return showMessage({
                message: "Error",
                description: "Something went wrong. Please try again.",
                type: "danger",
                icon: "danger",
                duration: 3000,
                autoHide: true
            })

        }

    }

    useEffect(() => {
        console.log(communityDetails)
    }, [communityDetails])


    const renderCurrentStep = () => {
        switch (state.activeIndex) {
            case 0:
                return <Community
                    communityDetails={communityDetails}
                    setCommunityDetails={setCommunityDetails}
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    categories={categories}
                />
            case 1:
                return <ContactDetails
                    communityDetails={communityDetails}
                    setCommunityDetails={setCommunityDetails}
                    goBack={goBack}
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}


                />

            case 2:
                return <CommunityImages
                    goBack={goBack}
                    loading={loading}
                    communityDetails={communityDetails}
                    setCommunityDetails={setCommunityDetails}
                    errors={errors}
                    setErrors={setErrors}
                    imagePath={imagePath}
                    setImagePath={setImagePath}
                    onSubmit={onSubmit}
                />
            default:
                return null;
        }
    };

    const getStepState = (index: number) => {
        const { activeIndex, completedStepIndex } = state;
        let stepState = Wizard.States.DISABLED;

        if (completedStepIndex && completedStepIndex > index - 1) {
            stepState = Wizard.States.COMPLETED;
        } else if (activeIndex === index || completedStepIndex === index - 1) {
            stepState = Wizard.States.ENABLED;
        }

        return stepState;
    };





    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%', }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: tabBarHeight, marginHorizontal: 5 }}
            >
                {/* Wizard for your main steps */}
                <Wizard testID={'uilib.wizard'}
                    activeIndex={state.activeIndex} onActiveIndexChanged={onActiveIndexChanged}
                    containerStyle={{
                        marginHorizontal: 0,
                        marginVertical: 10,
                        borderRadius: 20,
                        backgroundColor: COLORS.primaryWhiteHex
                    }}
                    activeConfig={
                        {
                            color: COLORS.primaryWhiteHex,
                            state: WizardStepStates.ENABLED,
                            circleSize: 30,
                            circleBackgroundColor: COLORS.primaryBlackHex,
                            circleColor: COLORS.primaryBlackHex,


                        }

                    }

                >
                    <Wizard.Step
                        state={getStepState(0)}
                        label={'Community Information'}
                        enabled={true}

                    />
                    <Wizard.Step state={getStepState(1)} label={'Contact'} />
                    <Wizard.Step state={getStepState(2)} label={'Pick Up'} />
                </Wizard>

                {/* Render the current step */}
                {renderCurrentStep()}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default CommunityDetails

const styles = StyleSheet.create({})