#!/usr/bin/env node

import * as i2c from 'i2c-bus'


readSensors();


setInterval(() => { readSensors() }, 5000);

function readSensors() {

    // SensorHub address
    const DEVICE_BUS = 1;
    const DEVICE_ADDR = 0x17;

    // SensorHub offboard sensor
    const TEMP_REG = 0x01;

    // SensorHub onboard sensors
    const LIGHT_REG_L = 0x02;
    const LIGHT_REG_H = 0x03;


    const STATUS_REG = 0x04;

    const ON_BOARD_TEMP_REG = 0x05;
    const ON_BOARD_HUMIDITY_REG = 0x06;
    const ON_BOARD_SENSOR_ERROR = 0x07;

    const MOTION_DETECT = 0x0D;

    // SensorHub BMP280 sensors
    const BMP280_TEMP_REG = 0x08;
    const BMP280_PRESSURE_REG_L = 0x09;
    const BMP280_PRESSURE_REG_M = 0x0A;
    const BMP280_PRESSURE_REG_H = 0x0B;
    const BMP280_STATUS = 0x0C;

    // SensorHub STATUS_REG register
    const T_OVR = 0x01; // external temperature sensor overrange
    const T_FAIL = 0x02; // external temperture sensor not found
    const L_OVR = 0x03; // Brightness sensor overrange
    const L_FAIL = 0x04; // Brightness sensor failure


    // Sensor Data Corrections
    const TEMP_COR = -3;
    const ON_BOARD_TEMP_COR = -6;
    const BMP280_TEMP_COR = -8;


    


    var receiveBuffer: Array<number> = new Array();

    const i2cBus = i2c.open(DEVICE_BUS, error => {
        if (error) throw error;
    });




    for (let registerIndex = TEMP_REG; registerIndex <= MOTION_DETECT; registerIndex++) {

        i2cBus.readByte(DEVICE_ADDR, registerIndex, (err, data) => {
            if (err) throw err;
            receiveBuffer[registerIndex] = data;
            console.log(`Data at ${registerIndex.toString(16)}: ${data}`);
        });
    };


    if (receiveBuffer[STATUS_REG] & T_OVR)
    {
        console.log('Off-chip temperature sensor overrange!');
    }
    else if (receiveBuffer[STATUS_REG] & T_FAIL)
    {
        console.log('No external temperature sensor!');
    }
    else
    {
     var offBoardTemperature: number = receiveBuffer[TEMP_REG];
        console.log(`Current external Sensor Temperature = ${offBoardTemperature} Celsius`);
    }

    if (receiveBuffer[STATUS_REG] & L_OVR)
    {
        console.log('Onboard brightness sensor overrange!');
    }
    else if (receiveBuffer[STATUS_REG] & L_FAIL)
    {
        console.log('Onboard brightness sensor failure!');
    }
    else
    {
        var brightness: number = (receiveBuffer[LIGHT_REG_H] << 8) | (receiveBuffer[LIGHT_REG_L]);
        console.log(`Current onboard sensor brightness = ${brightness} Lux`);
    }

    var onBoardTemperature: number = receiveBuffer[ON_BOARD_TEMP_REG];
    var onBoardHumiditiy: number = receiveBuffer[ON_BOARD_HUMIDITY_REG];
    console.log(`Current onboard sensor temperature = ${onBoardTemperature} Celsius`);
    console.log(`Current onboard sensor humidity = ${onBoardHumiditiy} %`);

    if (receiveBuffer[ON_BOARD_SENSOR_ERROR] != 0)
    {
        console.log('Onboard temperature and humidity sensor data may not be up to date!');
    }



    if (receiveBuffer[BMP280_STATUS] == 0)
    {
        var bmp280Temperature: number = receiveBuffer[BMP280_TEMP_REG];
        var bmp289Pressure: number = receiveBuffer[BMP280_PRESSURE_REG_L] | (receiveBuffer[BMP280_PRESSURE_REG_M] << 8) | (receiveBuffer[BMP280_PRESSURE_REG_H] << 16);
        console.log(`Current barometer temperature = ${bmp280Temperature} Celsius`);
        console.log(`Current barometer pressure = ${bmp289Pressure} Pascal`);
    }
    else
    {
        console.log('Onboard BMP280 barometer works abnormally!');
    }

    if (receiveBuffer[MOTION_DETECT] == 1)
    {
        console.log('Motion detected within 5 seconds!');
    }
    else
    {
        console.log('No motion detecte!');
    }



    i2cBus.close(error => {
        if (error) throw error;
    });
}

