// ButtonComponent.js
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const ButtonComponent = ({ title, onPress, disabled }) => {
    return (
        <View style={styles.buttonContainer}>
            <Button title={title} onPress={onPress} disabled={disabled} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 5,
    },
});

export default ButtonComponent;
