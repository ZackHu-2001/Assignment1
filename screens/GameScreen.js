import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';

const GameScreen = ({ randomNumber, onGameOver }) => {
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [attempt, setAttempt] = useState(5);
    const [time, setTime] = useState(0);
    const [guessed, setGuessed] = useState(false);
    const [guessCorrect, setGuessCorrect] = useState(null);

    const useHint = () => {

    };

    const tryAgain = () => {

    };

    const endTheGame = () => {

    };

    const handleGuess = () => {
        const userGuess = parseInt(guess);
        if (userGuess > randomNumber) {
            setFeedback('Too high!');
        } else if (userGuess < randomNumber) {
            setFeedback('Too low!');
        } else {
            setFeedback('Correct!');
            onGameOver();
        }
        setGuess('');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((time) => time + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Button title="Restart" onPress={tryAgain} />
            {
                guessed ? (
                    guessCorrect ? (
                        <>
                            <Text>You guessed correct!</Text>
                            <Text>Attempts used: {attempt}</Text>
                            <Image></Image>
                            <Button title="Play Again" onPress={tryAgain} />
                        </>
                    ) : (
                        <>
                            <Text>You did not guess correct!</Text>
                            <Button title="Try Again" onPress={tryAgain} />
                            <Button title="End The Game" onPress={endTheGame} />
                        </>
                    )
                ) : <View style={styles.screen}>
                    <Text style={styles.title}>Guess A Number Between 1 & 100</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your guess"
                        keyboardType="numeric"
                        value={guess}
                        onChangeText={setGuess}
                    />

                    <Text style={styles.title}>Attempts Left: {attempt}</Text>
                    <Text style={styles.title}>Time: {time}</Text>

                    <Button title={"USE A HINT"} onPress={useHint} />
                    <Button title="Submit Guess" onPress={handleGuess} />

                    {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
                </View>
            }


        </>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '40%',
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: 'purple',
        padding: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    feedback: {
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    },
});

export default GameScreen;
