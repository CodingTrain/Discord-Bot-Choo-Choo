const getNumbers = require("../utils/getNumbers")
const getDatabase = require("../utils/getDatabase")
const randoms = getNumbers();


module.exports = async function (supporter) {
    let found = false;
    let position;
    collectionUsers = getDatabase()
    cursor = collectionUsers.find();
    allUsers = await cursor.filter({"supporter":supporter}).toArray();
    while(!found){
        position = Math.floor(Math.random()*randoms.length)
        found = true;
        if(supporter){
            for(entry of allUsers){
                if(position == entry["position"]){
                    found= false;
                }
            }
        }
    }
    return randoms[position]

}