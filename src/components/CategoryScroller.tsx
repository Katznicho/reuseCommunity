import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Dimensions, TextInput, ToastAndroid } from 'react-native'
import React, { useMemo, useEffect, useRef, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useApi } from '../hooks/useApi';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from './CustomIcon';


const getDataList = (category: string, data: any) => {
    if (category == 'All') {
        return data;
    } else {
        let datalist = data.filter((item: any) => item.category.name == category);
        return datalist;
    }
};


const CategoryScroller = ({ dataList }: any) => {

    const navigation = useNavigation<any>()

    const { data, error, isLoading, refetch } = useApi<any>({
        endpoint: "getAllProductCategories",
        params: {
            "category": "getAllProductCategories"
        },
        queryOptions: {
            enabled: true,
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchInterval: 10000,


        },
    })

    const categoriesFromApi = data?.data || [];
    const allOption = { id: 'all', name: 'All' }; // Modify the object structure based on your actual data

    // Memoize the categories array
    const categories = useMemo(() => [allOption, ...categoriesFromApi], [categoriesFromApi])

    const [categoryIndex, setCategoryIndex] = useState<any>({
        index: 0,
        category: "All",
    })

    const [sortedData, setSortedData] = useState(getDataList(categoryIndex.category, dataList));

    const updateSortedData = () => {

        setSortedData(getDataList(categoryIndex.category, dataList));
    };

    const ListRef: any = useRef<FlatList>()

    

    useEffect(() => {

        updateSortedData();
    }, [categoryIndex]);

    const [searchText, setSearchText] = useState('');

    const searchProduct = (search: string) => {
        if (search != '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({ index: 0, category: "All" });
            setSortedData([
                ...getDataList("All", dataList).filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ])
        }
    };

    const resetSearchProduct = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({ index: 0, category: "All" });
        setSortedData([...getDataList("All", dataList)]);
        setSearchText('');
    };


    const ProductCardAddToCart = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices,
    }: any) => {
        // addToCart({
        //     id,
        //     index,
        //     name,
        //     roasted,
        //     imagelink_square,
        //     special_ingredient,
        //     type,
        //     prices,
        // });
        // calculateCartPrice();
        ToastAndroid.showWithGravity(
            `${name} is Added to Cart`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    return (
        <View>
            <View style={styles.InputContainerComponent}>
                <TouchableOpacity
                    onPress={() => {
                        searchProduct(searchText);
                    }}>
                    <CustomIcon
                        style={styles.InputIcon}
                        name="search"
                        size={FONTSIZE.size_18}
                        color={
                            searchText.length > 0
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryLightGreyHex
                        }
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="Find Your Favorite..."
                    value={searchText}
                    onChangeText={text => {
                        setSearchText(text);
                        searchProduct(text);
                    }}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    style={styles.TextInputContainer}
                />
                {searchText.length > 0 ? (
                    <TouchableOpacity
                        onPress={() => {
                            resetSearchProduct();
                        }}>
                        <CustomIcon
                            style={styles.InputIcon}
                            name="close"
                            size={FONTSIZE.size_16}
                            color={COLORS.primaryLightGreyHex}
                        />
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.CategoryScrollViewStyle}>
                {!isLoading && categories?.map((data: { name: string, id: number }, index: number) => (
                    <View
                        key={data.id}
                        style={styles.CategoryScrollViewContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.CategoryScrollViewItem}
                            onPress={() => {
                                ListRef?.current?.scrollToOffset({
                                    animated: true,
                                    offset: 0,
                                });
                                setCategoryIndex({ index: index, category: categories[index]?.name });
                            }}>
                            <Text
                                style={[
                                    styles.CategoryText,
                                    categoryIndex.index == index
                                        ? { color: COLORS.primaryOrangeHex }
                                        : {},
                                ]}>
                                {data?.name}
                            </Text>
                            {categoryIndex.index == index ? (
                                <View style={styles.ActiveCategory} />
                            ) : (
                                <></>
                            )}
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <FlatList
                ref={ListRef}
                horizontal
                ListEmptyComponent={
                    <View style={styles.EmptyListContainer}>
                        <Text style={styles.CategoryText}>No Products Available</Text>
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                data={sortedData}
                contentContainerStyle={styles.FlatListContainer}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push('Details', {
                                    index: item.index,
                                    id: item.id,
                                    type: item.type,
                                });
                            }}>
                            <ProductCard
                                id={item.id}
                                index={item?.id}
                                type={item?.category?.name}
                                roasted={item?.description}
                                imagelink_square={item?.cover_image}
                                name={item?.name}
                                special_ingredient={item?.user?.name}
                                average_rating={item?.rating}
                                price={item?.total_amount ?? 0}
                                buttonPressHandler={ProductCardAddToCart}
                            />
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    )
}

export default CategoryScroller

const styles = StyleSheet.create({
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    CategoryScrollViewItem: {
        alignItems: 'center',
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    FlatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },

    InputContainerComponent: {
        flexDirection: 'row',
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryBlackHex,
    },
})