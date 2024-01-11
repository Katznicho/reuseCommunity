import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useStore } from '../store/store';
import { GET_ALL_CATEGORIES } from '../screens/utils/constants/routes';


// const getCategoriesFromData = (data: any) => {
//     let temp: any = {};
//     for (let i = 0; i < data.length; i++) {
//         if (temp[data[i].name] == undefined) {
//             temp[data[i].name] = 1;
//         } else {
//             temp[data[i].name]++;
//         }
//     }
//     let categories = Object.keys(temp);
//     categories.unshift('All');
//     return categories;
// };

const getCoffeeList = (category: string, data: any) => {
    if (category == 'All') {
        return data;
    } else {
        let coffeelist = data.filter((item: any) => item.name == category);
        return coffeelist;
    }
};

const CategoryScroller = () => {

    const ListRef: any = useRef<FlatList>();
    const CoffeeList = useStore((state: any) => state.CoffeeList);

    const [categories, setCategories] = useState<any>([]);

    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });

    const [sortedCoffee, setSortedCoffee] = useState(
        getCoffeeList(categoryIndex.category, CoffeeList),
    );

    useEffect(() => {
        fetch(GET_ALL_CATEGORIES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {

            res.json().then((data) => {

                //unhift categories and add all to the beginning
                data.data.unshift({
                    name: "All",
                    id: "All"
                })
                setCategories(data.data);
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.CategoryScrollViewStyle}>
                {categories.map((data: { name: any }, index: number) => (
                    <View
                        key={index.toString()}
                        style={styles.CategoryScrollViewContainer}>
                        <TouchableOpacity
                            style={styles.CategoryScrollViewItem}
                            onPress={() => {
                                ListRef?.current?.scrollToOffset({
                                    animated: true,
                                    offset: 0,
                                });
                                setCategoryIndex({ index: index, category: categories[index] });
                                setSortedCoffee([
                                    ...getCoffeeList(categories[index], CoffeeList),
                                ]);
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
})