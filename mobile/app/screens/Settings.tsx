import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

export default function Settings() {
    const [connectionText, setConnectionText] = useState('');
    
    const handlePress = () => {
        console.log('Settings item pressed');
    };

    return (
        <Pressable onPress={handlePress} style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed
        ]}>
            <Text style={styles.title}>{"Connection"}</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setConnectionText(text)}
                value={connectionText}
                placeholder="Enter connection details"
                placeholderTextColor="#999"
            />
            <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Connect</Text>
                </View>
            </TouchableWithoutFeedback>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 15,

        shadowColor: "#666",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,

        margin: 8,
        marginBottom: 4,

        borderRadius: 8,
    },
    pressed: {
        opacity: 0.7,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    contentContainer: {
        paddingLeft: 10,
    },
    contentText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'flex-start',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: "100%"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    }
});