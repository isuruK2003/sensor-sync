import { useEffect, useState } from "react";

import {
    Accelerometer,
    Gyroscope,
    Magnetometer
} from 'expo-sensors';
import { useSettings } from "./settings-services";

interface CoordData {
    x: number,
    y: number,
    z: number
}

interface SensorData {
    value: CoordData | number
}


export function useAccelerometer() {
    const { settings } = useSettings();
    const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {
        Accelerometer.setUpdateInterval(settings.update_interval);
        const subscription = Accelerometer.addListener((data) => {
            setData({ value: { x: data.x, y: data.y, z: data.z } });
        });

        return () => {
            subscription.remove();
        };
    }, [settings.update_interval]);

    return data;
}

export function useGyroscope() {
    const { settings } = useSettings();
    const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {
        Gyroscope.setUpdateInterval(settings.update_interval);
        const subscription = Gyroscope.addListener((data) => {
            setData({ value: { x: data.x, y: data.y, z: data.z } });
        });

        return () => {
            subscription.remove();
        };
    }, [settings.update_interval]);

    return data;
}

export function useMagnetometer() {
    const { settings } = useSettings();
    const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {
        Magnetometer.setUpdateInterval(settings.update_interval);
        const subscription = Magnetometer.addListener((data) => {
            setData({ value: { x: data.x, y: data.y, z: data.z } });
        });

        return () => {
            subscription.remove();
        };
    }, [settings.update_interval]);

    return data;
}