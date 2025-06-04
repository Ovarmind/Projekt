export const config = {
    port: process.env.PORT || 3100,
    supportedDevicesNum: 17,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://BartekDanek:haslo@iot.l6cyw99.mongodb.net/IoT?retryWrites=true&w=majority'
};