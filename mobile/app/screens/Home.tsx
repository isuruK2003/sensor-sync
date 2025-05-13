import { Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import {
    useAccelerometer,
    useGyroscope,
    useMagnetometer
} from "../hooks/sensor-service";
import { useSettings } from "../hooks/settings-services";

export default function HomeScreen() {
    const { settings } = useSettings();

    const formatSensorData = (data: any) => {
        return data && data ? [
            `X : ${data.x.toFixed(settings.decimal_positions)}`,
            `Y : ${data.y.toFixed(settings.decimal_positions)}`,
            `Z : ${data.z.toFixed(settings.decimal_positions)}`
        ] : ["Data not available"];
    };

    const cards = [
        {
            title: "Accelerometer",
            data: useAccelerometer()
        },
        {
            title: "Gyroscope",
            data: useGyroscope()
        },
        {
            title: "Magnetometer",
            data: useMagnetometer()
        }
    ];

    return (
        <View>
            {cards.map((card, index) => (
                <TouchableHighlight
                    key={index}
                    onPress={() => { }}
                    style={styles.container}
                    underlayColor="#f0f0f0"
                >
                    <View>
                        <Text style={styles.title}>{card.title}</Text>
                        <View style={styles.contentContainer}>
                            {formatSensorData(card.data).map((text, i) => (
                                <Text key={i} style={styles.contentText}>{text}</Text>
                            ))}
                        </View>
                    </View>
                </TouchableHighlight>
            ))}
        </View>
    );
}

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
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
    }
});