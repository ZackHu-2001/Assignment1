import React, { forwardRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors
 from '../utils/colors';
const InputComponent = forwardRef(({ value, onChangeText }, ref) => {
    return (
        <TextInput
            ref={ref}
            style={styles.input}
            placeholder="Enter your guess"
            keyboardType="numeric"
            value={value}
            onChangeText={onChangeText}
        />
    );
});

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colors.black,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default InputComponent;
