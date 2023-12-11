import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Pressable,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFirebase } from '../../hooks/useFirebase';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { limitDescription } from '../utils/helpers/helpers';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import EmptyListAnimation from '../../components/EmptyListAnimation';


//https://wix.github.io/react-native-ui-lib/docs/components/overlays/FeatureHighlight
//tamagui

const Rejected = () => {
    const { user } = useSelector((state: RootState) => state.user);

    const { getProductsByUserIdAndStatus } = useFirebase();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<any>();




    useEffect(() => {
        setLoading(true);
        getProductsByUserIdAndStatus(user.UID, "REJECTED").then((userproducts) => {
            setProducts(userproducts)
        }).catch((error) => {
        })
        setLoading(false);
    }, [user?.UID]);



    // if(loading) return <ActivityIndicator/>
    if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
        <ActivityIndicator />
    </SafeAreaView>

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.primaryBlackHex,
            }}
        >


            {
                products.length ?
                    <FlatList
                        data={products}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => (
                            <Pressable style={styles.container} key={index}
                                onPress={() => navigation.navigate('MyProductDetails', {
                                    item
                                })}
                            >
                                <View>
                                    {/* icon */}
                                    <Image
                                        source={{
                                            uri: item?.coverImage,
                                        }}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'column',
                                        flex: 1,
                                        marginHorizontal: 10,
                                        marginTop: 10,
                                    }}
                                >

                                    <Text style={styles.date}>{item?.title}</Text>
                                    <Text style={styles.status}>{item?.estimatedPickUp}</Text>
                                    <Text style={styles.date}>{limitDescription(item?.description, 15)}</Text>


                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                    }}
                                >
                                    {/* amount details */}
                                    <View>
                                        <Text style={styles.status}>{item?.status}</Text>
                                    </View>
                                    {/* amoun details */}
                                </View>
                                <Pressable>
                                    {/* add chevron icon */}
                                    <Ionicons
                                        name="chevron-forward"
                                        size={24}
                                        color={COLORS.primaryBlackHex}
                                    />
                                    {/* icon */}
                                </Pressable>
                            </Pressable>
                        )}
                    />

                    :
                    <View style={[generalStyles.centerContent]} >
                        <EmptyListAnimation
                            title={'You dont have any rejected products'}
                        />


                    </View>

            }


        </SafeAreaView>
    );
};

export default Rejected;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: 8,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },

    date: {
        fontSize: 12,
        color: COLORS.primaryBlackHex,
        marginVertical: 2,
    },
    status: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 2,
    },
});