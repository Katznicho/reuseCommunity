
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import PaymentTabs from './PaymentTabs';
import PaymentDetails from './PaymentDetails';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';




const Stack = createNativeStackNavigator();

/**
 * Render and return the SupportStack component.
 *
 * @return {ReactNode} The rendered SupportStack component.
 */
function PaymentStack() {



    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator
            initialRouteName='PaymentTabs'
        >

            <Stack.Screen
                name="PaymentTabs"
                component={PaymentTabs}
                options={{
                    title: 'My Payments',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: COLORS.primaryWhiteHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginLeft: 10 }}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryWhiteHex}
                                size={28}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="PaymentDetails"
                component={PaymentDetails}
                options={{
                    title: 'Payment Details',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: COLORS.primaryWhiteHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (

                        <TouchableOpacity
                            onPress={() => navigation.navigate('ReuseTabs')}
                            style={{ marginLeft: 10 }}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryWhiteHex}
                                size={28}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

        </Stack.Navigator>

    );
}

export default PaymentStack