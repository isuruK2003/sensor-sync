import { View } from "react-native";
import {
    useAccelerometer,
    useGyroscope,
    useMagnetometer
} from "../hooks/sensor-service";
import { Card } from "../fragments/cards";
import { useSettings } from "../hooks/settings-services";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

type HomeStackParamList = {
    Home: undefined;
    Chart: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;


export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const { settings } = useSettings();
    const accData = useAccelerometer();
    const gyrData = useGyroscope();
    const magData = useMagnetometer();

    const formatSensorData = (data: any) => {
        return data && data ? [
            `x: ${data.x.toFixed(settings.decimal_positions)}`,
            `y: ${data.y.toFixed(settings.decimal_positions)}`,
            `z: ${data.z.toFixed(settings.decimal_positions)}`
        ] : ["Data not available"];
    };

    return (
        <View>
            <Card
                title="Accelerometer"
                content={formatSensorData(accData)}
                onPress={() => navigation.navigate('Chart')}
            />
            <Card
                title="Gyroscope"
                content={formatSensorData(gyrData)}
                onPress={() => navigation.navigate('Chart')}
            />
            <Card
                title="Magnetometer"
                content={formatSensorData(magData)}
                onPress={() => navigation.navigate('Chart')}
            />
        </View>
    );
}