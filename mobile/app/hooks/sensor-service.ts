import { useEffect, useState } from "react";

import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import { useSettings } from "./settings-services";

export interface SensorData {
    t: number,
    x: number,
    y: number,
    z: number
}

export function useAccelerometer(): SensorData | null {
    const { settings } = useSettings();
    const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {
        Accelerometer.setUpdateInterval(settings.update_interval);
        const subscription = Accelerometer.addListener((data) => {
            setData({ t: data.timestamp, x: data.x, y: data.y, z: data.z });
        });

        return () => {
            subscription.remove();
        };
    }, [settings.update_interval]);

    return data;
}

export function useGyroscope(): SensorData | null {
    const { settings } = useSettings();
    const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {
        Gyroscope.setUpdateInterval(settings.update_interval);
        const subscription = Gyroscope.addListener((data) => {
            setData({ t: data.timestamp, x: data.x, y: data.y, z: data.z });
        });

        return () => {
            subscription.remove();
        };
    }, [settings.update_interval]);

    return data;
}

export function useMagnetometer(): SensorData | null {
    const { settings } = useSettings();
    const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {
        Magnetometer.setUpdateInterval(settings.update_interval);
        const subscription = Magnetometer.addListener((data) => {
            setData({ t: data.timestamp, x: data.x, y: data.y, z: data.z });
        });

        return () => {
            subscription.remove();
        };
    }, [settings.update_interval]);

    return data;
}