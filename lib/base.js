
/**
 * Base Helper file
 */
const Wrapper = require('./index');

//Wrapper Call
const wrapper = new Wrapper();
(async () => {
    //Fetch all broswers;
    // const browsers = await wrapper.getAllBrowserList(true);
    // const addWorker =  await wrapper.addNewWorker({
    //     os: "OS X",
    //     osVersion: "Mojave",
    //     url: "https://browserstack.com",
    //     deviceType: 'mobile',
    //     browser: 'chrome',
    //     browserVersion: "75.0",
    //     name: "my worker"
    // });
    // const getWorkerStatus = await wrapper.getWorkerStatus(add/Worker.id)
    // const getAllWorkers = await wrapper.getWorkerStatus();
    // const getApiStatus =   await wrapper.getApiStatus();
    // const termiateWorker = await wrapper.terminateWorker('113344560');
//    const screenshot = await wrapper.takeWorkerScreenshot('113344554');
    console.log({ screenshot })
})() 