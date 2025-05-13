import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SensorData, useGyroscope } from '../hooks/sensor-service';
import uuid from 'react-native-uuid';

export default function Stream() {
    const [domain, setDomain] = useState<string>('192.168.8.170');
    const [port, setPort] = useState<string>('8000');
    const [websocket, setWebsocket] = useState<WebSocket>();
    const gyroData: SensorData | null = useGyroscope();

    const handelConnect = () => {
        try {
            const url: string = `ws://${domain}:${port}/ws/gyro/${uuid.v4()}`;

            const ws = new WebSocket(url);

            ws.onopen = () => {
                Alert.alert('Connection Success', `Successfully connected to ${url}`, [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]);
            };

            ws.onerror = (e) => {
                Alert.alert('Error Occurred', `An error occurred when establishing the connection`, [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]);
            };

            ws.onclose = (e) => {
                Alert.alert('Connection Closed', `Connection to ${url} successfully closed`, [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]);
            };

            setWebsocket(ws);
        } catch (error) {
            Alert.alert("Error Occurred", "An unknown error occurred. Please try again after some time.")
        }
    };

    const handleDisconnect = () => {
        if (websocket?.readyState == WebSocket.OPEN) {
            websocket.close();
        }
    }

    useEffect(() => {
        if (websocket !== null && websocket?.readyState === WebSocket.OPEN && gyroData !== null) {
            websocket.send(JSON.stringify(gyroData));
        }
    }, [gyroData]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"Connection"}</Text>
            <TextInput
                style={styles.input}
                onChangeText={(s: string) => setDomain(s)}
                value={domain}
                placeholder="IP Address"
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                onChangeText={(s: string) => setPort(s)}
                value={port}
                placeholder="Port Number"
                placeholderTextColor="#999"
            />
            <TouchableHighlight
                onPress={handelConnect}
                underlayColor="#fff"
                activeOpacity={0.5}
                disabled={websocket?.readyState === WebSocket.CONNECTING ? true : false}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        {websocket?.readyState === WebSocket.CONNECTING ? "Connecting ... " : "Connect"}
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={handleDisconnect}
                underlayColor="#fff"
                activeOpacity={0.5}
                disabled={websocket?.readyState === WebSocket.OPEN ? false : true}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Disconnect</Text>
                </View>
            </TouchableHighlight>
        </View>
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
        marginTop: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
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
        width: "100%",
        marginTop: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
});