import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useApi } from '../hooks/useApi';
import CategoryScroller from './CategoryScroller';
import ProductType from './ProductType';






const MarketPlace = () => {

    //get the data from the api
    const { data, error, isLoading, refetch } = useApi<any>({
        endpoint: "getAVailableProductsByPage",
        params: {
            "products": "getAllProducts",
        },
        queryOptions: {
            enabled: true,
            cacheTime: Infinity,
            staleTime: Infinity,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
            // refetchInterval: 10000,

        },
    })


    return (
        <View>
            <Text style={styles.ScreenTitle}>
                Find the best{'\n'}product for you
            </Text>
            {/* Category Scroller */}
            {
                !isLoading && data?.data?.data && (
                    <CategoryScroller
                        dataList={data?.data?.data}

                    />
                )
            }

            {/* Category Scroller */}

            {/*  */}
            {
                !isLoading && data?.data?.data && (
                    <ProductType
                        dataList={data?.data?.data}
                        type="Near By"
                    />
                )
            }

            {
                !isLoading && data?.data?.data && (
                    <ProductType
                        dataList={data?.data?.data}
                        type="Most Popular"
                    />
                )
            }
            {/*  */}

        </View>
    )
}

export default MarketPlace

const styles = StyleSheet.create({
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
});