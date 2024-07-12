import React, { forwardRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';

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
        borderColor: '#000',
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default InputComponent;
