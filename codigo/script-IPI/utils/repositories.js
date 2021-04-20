const axios = require("axios")
const config = require("../config")
const fs = require('fs')

const BASE_PATH = config.baseUrl + config.searchRepositories.url;

let list = [];
let pages = 0;
let data;

async function getFirstPage(number){
    //if(number <= 99) return;

    let url = `${BASE_PATH}stars:100..${number}&sort=stars&order=desc&per_page=100&page=1`;
    try {
        let response = await axios.get(url, {
            headers: {
                Authorization: 'token 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'
              }
        });

        response.data.items.forEach(element => {
            list.push(element);    
        });
        //list.push(response.data.items);
        if(data == null){
            data = response.data;
        }

        for(i = 2; i <= 10; i++){
            await getRepositories(number, i);
            await new Promise((r) => setTimeout(r, 100));
        }

    } catch (error) {
        console.log(error);
    }
}

async function getRepositories(max, numberPage) {
    let url = `${BASE_PATH}stars:100..${max}&sort=stars&order=desc&per_page=100&page=${numberPage}`;
    try {
        let response = await axios.get(url, {
            headers: {
                Authorization: 'token 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'
              }
        });
        response.data.items.forEach(element => {
            list.push(element);    
        });

        /*if(numberPage == 10){
            await getFirstPage(response.data.items[response.data.items.length - 1].stargazers_count);
        }*/
    } catch (error) {
        console.log(error);
    }
}

async function start() {
    await getFirstPage(200000);
    data.items = list;
    fs.writeFile('repositories_1000.json', JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    console.log("Terminou a execução");
}

start();
