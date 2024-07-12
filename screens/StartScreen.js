import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

const StartScreen = ({ startGameHandler }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    // name should be longer than 2 characters and should not contain numbers
    const validateName = (text) => {
        if (text.length < 2 || /\d/.test(text)) {
            setNameError('Invalid Name');
        } else {
            setNameError('');
        }
        setName(text);
    };

    // email should be in the correct format
    const validateEmail = (text) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(text)) {
            setEmailError('Invalid Email');
        } else {
            setEmailError('');
        }
        setEmail(text);
    };

    const handleReset = () => {
        setName('');
        setEmail('');
        setIsChecked(false);
        setNameError('');
        setEmailError('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <View style={styles.card}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={validateName}
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                <Text style={styles.text}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={validateEmail}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isChecked}
                        onValueChange={setIsChecked}
                    />
                    <Text style={styles.checkboxText}>I am not a robot</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title='Reset' onPress={handleReset} />
                    <Button
                        title='Start'
                        onPress={() => {
                            startGameHandler(name, email);
                        }}
                        disabled={!isChecked || nameError || emailError || !name || !email}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    card: {
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#fff',
        width: '80%',
        alignItems: 'start',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: 'purple'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: 'purple',
        width: '100%',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        marginLeft: 8,
        color: 'purple',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default StartScreen;
