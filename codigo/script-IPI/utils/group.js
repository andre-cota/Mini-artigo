const fs = require('fs')

let data;
let dataGrouped = {
    "groups": []
}

async function start() {
    
    fs.readFile('repositories_organized_and_evaluated_1000.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        data = JSON.parse(jsonString)    
        
        let count10 = 0;
        let count100 = 0;
        let count300 = 0;
        let count500 = 0;
        let count700 = 0;
        let count1000 = 0;

        for(i = 0; i < 10; i++){
            count10 += data.items[i].hasLint ? 1 : 0
        }

        dataGrouped.groups.push(
            {
                "name": "Top 10",
                "qtd": count10,
                "percent": (count10/10)*100
            }
        )

        count100 = count10

        for(i = 10; i < 100; i++){
            count100 += data.items[i].hasLint ? 1 : 0
        }

        dataGrouped.groups.push(
            {
                "name": "Top 100",
                "qtd": count100,
                "percent": (count100/100)*100
            }
        )

        count300 = count100

        for(i = 100; i < 300; i++){
            count300 += data.items[i].hasLint ? 1 : 0
        }

        dataGrouped.groups.push(
            {
                "name": "Top 300",
                "qtd": count300,
                "percent": (count300/300)*100
            }
        )

        count500 = count300

        for(i = 300; i < 500; i++){
            count500 += data.items[i].hasLint ? 1 : 0
        }

        dataGrouped.groups.push(
            {
                "name": "Top 500",
                "qtd": count500,
                "percent": (count500/500)*100
            }
        )

        count700 = count500

        for(i = 500; i < 700; i++){
            count700 += data.items[i].hasLint ? 1 : 0
        }

        dataGrouped.groups.push(
            {
                "name": "Top 700",
                "qtd": count700,
                "percent": (count700/700)*100
            }
        )

        count1000 = count700

        for(i = 700; i < 1000; i++){
            count1000 += data.items[i].hasLint ? 1 : 0
        }

        dataGrouped.groups.push(
            {
                "name": "Top 1000",
                "qtd": count1000,
                "percent": (count1000/1000)*100
            }
        )
        
        writeFile()

        console.log(count10)
        
    })    
}

async function writeFile() {
    fs.writeFile('repositories_grouped.json', JSON.stringify(dataGrouped), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    console.log("Terminou a execução");
}

start()