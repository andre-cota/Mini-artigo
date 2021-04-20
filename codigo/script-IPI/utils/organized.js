const fs = require('fs')

async function start() {
    let data;
    fs.readFile('repositories_1000.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        data = JSON.parse(jsonString)    
        var data2 = {
            "items": data.items.map(function(e) {
                return {
                    "name": e.full_name,
                    "stars": e.stargazers_count,
                    "hasLint": false
                };
            }),
        };

        fs.writeFile('repositories_organized_1000.json', JSON.stringify(data2), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
        
    })
    

    
}

start()