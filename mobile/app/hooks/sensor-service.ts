import { useEffect, useState } from "react";

import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';

export interface SensorData {
    t: number,
    x: number,
    y: number,
    z: number
}

export enum SensorType {
    Accelerometer,
    Gyroscope,
    Magnetometer
}

export interface SensorConfig {
    sensorType: SensorType
    updateIntervalMillis?: number
}

const sensorTypeMap = {
    [SensorType.Accelerometer]: Accelerometer,
    [SensorType.Gyroscope]: Gyroscope,
    [SensorType.Magnetometer]: Magnetometer
}


export function useSensor({ sensorType, updateIntervalMillis }: SensorConfig): SensorData | null {
    const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {

        const sensor = sensorTypeMap[sensorType];

        if (sensor == undefined) {
            throw new Error(`${sensorType} is undefined`)
        };

        const subscription = sensor.addListener(sensorData => {
            setData({
                t: sensorData.timestamp,
                x: sensorData.x,
                y: sensorData.y,
                z: sensorData.z
            });
        });

        return () => {
            subscription.remove();
        };

    }, [sensorType, updateIntervalMillis]);

    return data;
}
