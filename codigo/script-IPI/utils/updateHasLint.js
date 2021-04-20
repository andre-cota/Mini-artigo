const axios = require("axios")
const config = require("../config")
const fs = require('fs')

const BASE_PATH = config.baseUrl + config.searchInCode.url;
let data;

async function start() {
    fs.readFile('repositories_organized_and_evaluated_1000.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        data = JSON.parse(jsonString)   

        // for(i = 0; i < 30; i++){
        //     if(data.items[i] != null){
        //         data.items[i].hasLint = await evaluateRepo(data.items[i].name);
        //         console.log(data.items[i].name + " index[" + i + "]")
        //         await new Promise((r) => setTimeout(r, 100));
        //     }
        // }


        var total = 680;
        var item = 0;
        var range = 30;

        while(item < total){
            for(i = item; i < item+range; i++){
                if(i >= data.items.length) break;

                if(data.items[i] != null){
                    console.log(data.items[i].name + " index[" + i + "]")
                    data.items[i].hasLint = await evaluateRepo(data.items[i].name);
                    await new Promise((r) => setTimeout(r, 2000));
                }
            }
            await new Promise((r) => setTimeout(r, 60000))
            item = item+range;
        }
        
        writeOnFile();
        
    })
}

async function evaluateRepo(repo){
    let url = `${BASE_PATH}repo:${repo}&per_page=1`;
    try {
        let response = await axios.get(url, {
            headers: {
                Authorization: 'token ' //colocar token github
            }
        });
        if(response == null) return false;

        if(response.data.total_count > 0){
            console.log("encontrou lint")
            return true
        } 

        return false;
    } catch (error) {
        console.log(error);
        console.log("terminou no " + repo)
        writeOnFile();
        await new Promise((r) => setTimeout(r, 60000))
        process.exit(22)
    }
    return false;
}

async function writeOnFile(){
    fs.writeFile('repositories_organized_and_evaluated_1000.json', JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}

start()