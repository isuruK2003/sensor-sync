import { useState } from "react";
import SavedAppSettings from '../app-settings.json'

export interface AppSettings {
    network: {
        socket_url: string
    },
    update_interval:number,
    decimal_positions:number,
}

export const defaultSettings: AppSettings = {
    network: {
        socket_url: "http://0.0.0.0:5000"
    },
    update_interval: 400,
    decimal_positions: 6,
}

export function useSettings() {
    const currentSettings: AppSettings = {
        ...defaultSettings,
        ...SavedAppSettings as AppSettings
    };
    const [settings, setSettings] = useState<AppSettings>(currentSettings);
    return {settings, setSettings};
}