import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Charts from './components/Charts';

import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';

const DEVICE_COUNT = 17;

type DeviceData = {
  temperature: string;
  pressure: string;
  humidity: string;
};

type Device = {
  id: number;
  data: DeviceData | null;
};

const App = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3100/api/data/latest')
      .then((res) => res.json())
      .then((data) => {
        const formatted: Device[] = Array.from({ length: DEVICE_COUNT }, (_, id) => {
          const deviceData = data.find((d: any) => d.deviceId === id);
          return {
            id,
            data: deviceData?.temperature != null
              ? {
                  temperature: deviceData.temperature.toString(),
                  pressure: deviceData.pressure.toString(),
                  humidity: deviceData.humidity.toString(),
                }
              : null,
          };
        });
        setDevices(formatted);
      })
      .catch((err) => {
        console.error('Błąd podczas pobierania danych:', err);
      });
  }, []);

  const selectedDevice = devices.find((d) => d.id === selectedDeviceId);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card
              sx={{
                backgroundColor: '#00bcd4',
                color: 'white',
                height: '100%',
              }}
            >
              <CardContent>
                <Typography variant="h6">Device No. {selectedDeviceId}</Typography>
                {selectedDevice?.data ? (
                  <>
                    <Typography variant="body1">
                      <DeviceThermostatIcon /> {selectedDevice.data.temperature} °C
                    </Typography>
                    <Typography variant="body1">
                      <CloudUploadIcon /> {selectedDevice.data.pressure} hPa
                    </Typography>
                    <Typography variant="body1">
                      <OpacityIcon /> {selectedDevice.data.humidity}%
                    </Typography>
                  </>
                ) : (
                  <Typography>No data</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={9.6}>
            <Paper sx={{ backgroundColor: '#111', p: 2 }}>
              <Typography variant="h6" color="white" gutterBottom>
                Device No. {selectedDeviceId}
              </Typography>
              <Box mt={2}>
                <Charts data={selectedDevice?.data ?? null} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box
          mt={3}
          sx={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            pb: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              minHeight: 200,
              pr: 2,
            }}
          >
            {devices.map((device) => (
              <Card
                key={device.id}
                sx={{
                  backgroundColor:
                    device.id === selectedDeviceId ? '#00bcd4' : '#1e1e1e',
                  color: 'white',
                  width: 230,
                  flex: '0 0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedDeviceId(device.id)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">Device No. {device.id}</Typography>
                    {device.data ? (
                      <>
                        <Typography variant="body1">
                          <DeviceThermostatIcon /> {device.data.temperature} °C
                        </Typography>
                        <Typography variant="body1">
                          <CloudUploadIcon /> {device.data.pressure} hPa
                        </Typography>
                        <Typography variant="body1">
                          <OpacityIcon /> {device.data.humidity}%
                        </Typography>
                      </>
                    ) : (
                      <Typography>No data</Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
