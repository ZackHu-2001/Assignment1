import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const ConfirmScreen = ({ name, email, visible, handleModalConfirm, handleModalCancel }) => {


    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Hello {name}</Text>
                    <Text style={styles.modalText}>Here is the email that you entered: {email}</Text>
                    <Text style={styles.modalText}>If it is not correct, please go back and enter again.</Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.goBackButton} onPress={handleModalCancel}>
                            <Text style={styles.buttonText}>GO BACK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.continueButton} onPress={handleModalConfirm}>
                            <Text style={styles.buttonText}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A9A9A9',
        padding: 20,
    },
    label: {
        color: 'purple',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'transparent',
        borderBottomWidth: 0,
        color: 'black',
    },
    underline: {
        height: 2,
        backgroundColor: 'purple',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // transparent gradient background
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'start',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    goBackButton: {
        flex: 1,
        backgroundColor: 'red',
        padding: 10,
        marginRight: 5,
        borderRadius: 5,
    },
    continueButton: {
        flex: 1,
        backgroundColor: 'blue',
        padding: 10,
        marginLeft: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ConfirmScreen;
