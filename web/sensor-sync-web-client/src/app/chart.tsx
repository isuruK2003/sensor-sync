import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { SensorData } from './sensor-data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    sensorData: SensorData[];
    height: number,
    width: number
}

export function LineChart({ sensorData, height, width }: LineChartProps) {

    const labels = sensorData.map(data => data.t);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'X Axis',
                data: sensorData.map(data => data.x),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
            },
            {
                label: 'Y Axis',
                data: sensorData.map(data => data.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.1
            },
            {
                label: 'Z Axis',
                data: sensorData.map(data => data.z),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        transitions: {
            active: {
                animation: {
                    duration: 0
                }
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sensor Data Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    };

    return <Line options={options} data={chartData} width={width} height={height} />;
}