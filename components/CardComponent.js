import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const CardComponent = ({ children, style }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '80%',
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
});

export default CardComponent;