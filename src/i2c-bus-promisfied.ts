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



    // SensorHub BMP280 sensors
    const BMP280_TEMP_REG = 0x08;
    const BMP280_PRESSURE_REG_L = 0x09;
    const BMP280_PRESSURE_REG_M = 0x0A;
    const BMP280_PRESSURE_REG_H = 0x0B;
    const BMP280_STATUS = 0x0C;


    const MOTION_DETECT = 0x0D;

    const REGISTER_LENGTH = 0x0D;



    // SensorHub STATUS_REG register
    const T_OVR = 0x01; // external temperature sensor overrange
    const T_FAIL = 0x02; // external temperture sensor not found
    const L_OVR = 0x03; // Brightness sensor overrange
    const L_FAIL = 0x04; // Brightness sensor failure


    // Sensor Data Corrections
    const TEMP_COR = -2;
    const LIGHT_COR = 0;
    const ON_BOARD_TEMP_COR = -7;
    const ON_BOARD_HUMIDITY_COR = 0;



    var buffer: Buffer = Buffer.alloc(REGISTER_LENGTH);

    i2c.openPromisified(DEVICE_BUS)
        .then(i2cBus => i2cBus.i2cRead(DEVICE_ADDR, REGISTER_LENGTH, buffer)
            .then(bytesRead => {
                console.log(bytesRead);
                console.log(buffer)
            })
            .then(_ => i2cBus.close())
        ).catch(console.log);





}

