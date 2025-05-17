import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SensorData, SensorType, useSensor } from '../hooks/sensor-service';
import uuid from 'react-native-uuid';

export default function StreamScreen() {
    const [domain, setDomain] = useState<string>('192.168.8.170');
    const [port, setPort] = useState<string>('8000');
    const [websocket, setWebsocket] = useState<WebSocket>();
    const gyroData: SensorData | null = useSensor({ sensorType: SensorType.Gyroscope });

    const handelConnect = () => {

        if (websocket === undefined || websocket?.readyState === WebSocket.CLOSED) {
            try {
                const url: string = `ws://${domain}:${port}/ws/gyro/${uuid.v4()}`;

                const ws = new WebSocket(url);

                ws.onopen = () => Alert.alert('Connection Established', `Successfully connected to the server at ${domain}.`);
                ws.onerror = () => Alert.alert('Connection Failed', `Unable to establish a connection to the server. Please check the server address or try again later.`);
                ws.onclose = () => Alert.alert('Connection Terminated', `The WebSocket connection to ${domain} has been closed.`);

                setWebsocket(ws);

            } catch (error) {
                Alert.alert("Unexpected Error", "An unexpected error occurred. Please try again later.");
            }
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
            {websocket?.readyState === WebSocket.OPEN ?
                <TouchableHighlight
                    onPress={handleDisconnect}
                    underlayColor="#fff"
                    activeOpacity={0.5}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Disconnect
                        </Text>
                    </View>
                </TouchableHighlight>
                :
                <TouchableHighlight
                    onPress={handelConnect}
                    underlayColor="#fff"
                    activeOpacity={0.5}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            {websocket?.readyState === WebSocket.CONNECTING ? "Connecting ... " : "Connect"}
                        </Text>
                    </View>
                </TouchableHighlight>
            }
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