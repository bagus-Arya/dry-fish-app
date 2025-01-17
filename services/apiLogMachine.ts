import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '@/services/baseUrl'; 

export type DeviceLogs = {
    id: number;
    machine_ID: string; 
    temp: string;
    humid: string;
    weight: string;
    light: string;
    created_at: string;
    updated_at: string;
};

export type DeviceData = DeviceLogs[]; 


export type DeviceResponse = {
    status: string;
    message: string;
    data: DeviceData; 
};

export const fetchDeviceList = async (): Promise<DeviceResponse> => {
    const token = await AsyncStorage.getItem('token'); 

    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    try {
        const response: AxiosResponse<DeviceResponse> = await client.get<DeviceResponse>('/api/dft/showal', config);
        
        if (response.data.status === "true") {
            // console.log('Fetched device response:', response.data);
            return response.data; 
        } else {
            // console.error('Error fetching devices:', response.data.message);
            throw new Error(response.data.message); 
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error('Axios error:', err.message);
            if (err.response) {
                console.error('Response status:', err.response.status);
                console.error('Response data:', err.response.data);
            } else {
                console.error('Network Error:', err.message);
            }
        } else {
            console.error('Unexpected error:', err);
        }
        throw err; 
    }
};