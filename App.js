import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import StartScreen from './screens/StartScreen';

export default function App() {
    const [gameState, setGameState] = useState('start');

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {gameState === 'start' && <StartScreen />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#76cff5ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

