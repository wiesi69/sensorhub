#!/usr/bin/env node

const i2c = require('i2c-bus');

DEVICE_BUS = 1
DEVICE_ADDR = 0x17

TEMP_REG = 0x01
LIGHT_REG_L = 0x02
LIGHT_REG_H = 0x03
STATUS_REG = 0x04
ON_BOARD_TEMP_REG = 0x05
ON_BOARD_HUMIDITY_REG = 0x06
ON_BOARD_SENSOR_ERROR = 0x07
BMP280_TEMP_REG = 0x08
BMP280_PRESSURE_REG_L = 0x09
BMP280_PRESSURE_REG_M = 0x0A
BMP280_PRESSURE_REG_H = 0x0B
BMP280_STATUS = 0x0C
HUMAN_DETECT = 0x0D





i2c.openPromisified(DEVICE_BUS).
    then(i2c1 => i2c1.readByte(DEVICE_ADDR, TEMP_REG).
        then(data => console.log("TEMP_REG: " + data + "C.")).
        then(_ => i2c1.readByte(DEVICE_ADDR, ON_BOARD_TEMP_REG)).
        then(data => console.log("ON_BOARD_TEMP_REG: " + data + "C.")).
        then(_ => i2c1.close())
    ).catch(console.log());
