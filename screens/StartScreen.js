// Import necessary modules and components from React and React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox'; // Import the CheckBox component from Expo
import CardComponent from '../components/CardComponent'; // Import a custom CardComponent
import colors from '../utils/colors'; // Import a utility file for color values

// Define the StartScreen component
const StartScreen = ({ startGameHandler }) => {
    const [name, setName] = useState(''); // State to store the user's name
    const [email, setEmail] = useState(''); // State to store the user's email
    const [isChecked, setIsChecked] = useState(false); // State to store the checkbox value
    const [nameError, setNameError] = useState(''); // State to store the name validation error
    const [emailError, setEmailError] = useState(''); // State to store the email validation error

    // Validate the name input
    // Name should be longer than 2 characters and should not contain numbers
    const validateName = (text) => {
        if (text.length < 2 || /\d/.test(text)) {
            setNameError('Invalid Name'); // Set error message if validation fails
        } else {
            setNameError(''); // Clear error message if validation passes
        }
        setName(text); // Update the name state
    };

    // Validate the email input
    // Email should be in the correct format
    const validateEmail = (text) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(text)) {
            setEmailError('Invalid Email'); // Set error message if validation fails
        } else {
            setEmailError(''); // Clear error message if validation passes
        }
        setEmail(text); // Update the email state
    };

    // Reset all input fields and error messages
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
            <CardComponent style={{ alignItems: 'start' }}>
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
                            startGameHandler(name, email); // Call startGameHandler with name and email
                        }}
                        disabled={!isChecked || nameError || emailError || !name || !email} // Disable button if conditions are not met
                    />
                </View>
            </CardComponent >
        </View >
    );
}

// Define styles for the StartScreen component
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
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: colors.white,
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
        borderColor: colors.border,
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
