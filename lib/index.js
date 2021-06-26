/**
 * Main Index file for initailising
 */
require('dotenv').config();
const axios = require('axios')
const { UNAME, ACCESS_KEY, URL, BROWSER_NAVIGATE_URL } = process.env;
const { DEVICE_TYPES } = require('./config');

class Wrapper {
    constructor() {
        //Intiailize username and accesskey
        if(!UNAME || !ACCESS_KEY) throw Error('Crendentials missing')
        this.uName = UNAME;
        this.accessKey = ACCESS_KEY;
    }

    //intiailize config
    intialize(method, path, params) {
        const options = {
            method,
            url: `${URL}${path}`,
            headers: {
                Authorization: `Basic ${new Buffer(this.uName + ":" + this.accessKey).toString('base64')}`
            },
            json: true
        };
        if(params) {
            Object.assign(options, { data: params })
        }
       this.options = options;
    }

    //make request
    async requestApi() {
        try {
            const response = await axios(this.options);
            return response.data;
        } catch(error) {
            return error.message;
        }
    }

    //Get All browser lists
    async getAllBrowserList(type = null) {
        //Intiailize
        this.intialize('GET', `/browsers?flat=${!!type}`);
        const result = await this.requestApi();
        return result;
    }

    //Get OS List

    //Create a new browser worker
    async addNewWorker({
        deviceType, name, os, osVersion,  browser, browserVersion, url = BROWSER_NAVIGATE_URL, 
    }) {
        if(!deviceType || !Object.values(DEVICE_TYPES).includes(deviceType)) return 'Invalid device';
        this.intialize('POST', '/worker', { 
            name, 
            os,  
            os_version: osVersion,
            browser, 
            browser_version: browserVersion, 
            url 
        })
        return this.requestApi();
    }

    //Get Workers Status
    async getWorkerStatus(workerId) {
        workerId ? this.intialize('GET', `/worker/${workerId}`) : this.intialize('GET', `/workers`);
        return this.requestApi();
    }

    //Get Api Status
    async getApiStatus() {
        this.intialize('GET', '/status');
        return this.requestApi();
    }


    //Terminate a worker
    async terminateWorker(workerId) {
        this.intialize('DELETE', `/worker/${workerId}`);
        return this.requestApi();
    }

    //Take Worker Screenshot
    async takeWorkerScreenshot(workerId) {
        this.intialize('GET', `/worker/${workerId}/screenshot.json`);
        return this.requestApi();
    }
};

module.exports = Wrapper;