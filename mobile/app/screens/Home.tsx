import { View, Text } from "react-native";
import {
    useAccelerometer,
    useGyroscope,
    useMagnetometer
} from "../hooks/sensor-service";
import { Card } from "../fragments/cards";
import { useSettings } from "../hooks/settings-services";

export default function Home() {
    const { settings } = useSettings();
    const accData = useAccelerometer();
    const gyrData = useGyroscope();
    const magData = useMagnetometer();

    const formatSensorData = (data: any) => {
        return data && data.value ? [
            `x: ${data.value.x.toFixed(settings.decimal_positions)}`,
            `y: ${data.value.y.toFixed(settings.decimal_positions)}`,
            `z: ${data.value.z.toFixed(settings.decimal_positions)}`
        ] : ["Data not available"];
    };

    return (
        <View>
            <Card
                title="Accelerometer"
                content={formatSensorData(accData)}
            />
            <Card
                title="Gyroscope"
                content={formatSensorData(gyrData)}
            />
            <Card
                title="Magnetometer"
                content={formatSensorData(magData)}
            />
        </View>
    );
}
