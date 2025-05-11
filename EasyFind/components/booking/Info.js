import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StarRatingDisplay } from 'react-native-star-rating-widget';

export default function Info({title, location, members, description}) {
    return (
        <View>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title || "Unknown Title"}</Text>
            </View>
            <Text style={styles.sectionTitle}>{location || "Unknown Location"}</Text>
            <View style={styles.statsContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.sectionTitle}>Service</Text>
                    <Text style={styles.priceValue}>{members || "No Members Available"}</Text>
                </View>
                <View style={styles.ratingsContainer}>
                    <StarRatingDisplay
                        maxStars={5}
                        starSize={15}
                        rating={5}
                        fullStar="star"
                        emptyStar="star"
                        fullStarColor="#dbb16c"
                        emptyStarColor="#6a6751"
                    />
                    <Text style={styles.sectionTitle}>5 Star Reviews</Text>
                </View>
            </View>
            <Text style={styles.description}>{description || "No Description Available"}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    titleWrapper:{
        marginBottom: 5,
    },
    title:{
        fontSize: 33,
        lineHeight: 33,
        fontWeight: 'bold',
    },
    sectionTitle:{
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
    },
    statsContainer:{
        paddingTop: 15,
        paddingBottom: 5,
        flexDirection: 'row',
        marginTop: 5,
    },
    priceContainer: {
        flex: 1,
    },
    priceTitle:{
        fontSize: 17,
        fontWeight: 'bold',
    },
    priceValue:{
        fontSize: 20,
        color: '#dcb26a',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
    },
    ratingsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    description:{
        lineHeight: 22,
    },
    readMoreContainer:{
        paddingVertical: 15,
    },
    readMoreText:{
        color: '#dcb26a',
        fontSize: 16,
        fontWeight: 'bold',
    },
});