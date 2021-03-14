#!/usr/bin/env node

import * as i2c from "i2c-bus"

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
const T_OVR = 0x01; // Temperature Overflow
const T_FAIL = 0x02; // Temperture Not Found
const L_OVR = 0x03; // Brightness Overlow
const L_FAIL = 0x04; // Brightness Not Found


// Sensor Data Corrections
const TEMP_COR = -2;
const LIGHT_COR = 0;
const ON_BOARD_TEMP_COR = -7;
const ON_BOARD_HUMIDITY_COR = 0;


var receiveBuffer: Array<number> = new Array();

const i2cBus = i2c.open(DEVICE_BUS, error => {
    if (error) throw error;
});


for (let registerIndex = TEMP_REG; registerIndex <= MOTION_DETECT; registerIndex++) {
    i2cBus.readByte(DEVICE_ADDR, registerIndex, (err, data) => {
        if (err) throw err;
        receiveBuffer[registerIndex] = data;
        console.log(`Data at ${registerIndex}: ${data}`);

    });
};


i2cBus.close(error => {
    if (error) throw error;
});


