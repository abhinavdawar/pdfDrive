let puppeteer = require("puppeteer");
let fs = require("fs");
let bookName = process.argv[2];
let login = "https://www.pdfdrive.com/";
let path = require("path");

(async function(){

	// starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });

    let numberofPages = await browser.pages();
    let tab = numberofPages[0];

    await tab.goto(login , {
    	waitUntil : "networkidle2"
    });

    await tab.waitForSelector("input#q");
    await tab.type("input#q" , bookName ,{delay : 1000});

    await tab.waitForSelector("#search-form > button > i");
    await tab.click("#search-form > button > i");

    await tab.waitForSelector(".files-new > ul > li:nth-child(1) > div > div > div.file-right > a");
    await tab.click(".files-new > ul > li:nth-child(1) > div > div > div.file-right > a" , {
        waitUntil : "networkidle2"
    });

    await tab.waitForSelector("#download-button");
    await tab.click("#download-button");

    await tab.waitForSelector(".btn.btn-primary.btn-user",{visible:true});
    await tab.click(".btn.btn-primary.btn-user");
    
})()

