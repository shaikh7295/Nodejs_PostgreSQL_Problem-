


const parseToCsv = (csv) => {
    try {
        let sparateRecord = csv.trim().replace(/\r|/g, "").split('\n')
        let arr = []
        for (let i = 0; i < sparateRecord.length; i++) {
            let obj = {}
            let element = sparateRecord[i]
            let splitKeys = element.split(',')
            let keys = sparateRecord[0].split(',')
            if (i > 0) {
                for (let j = 0; j < splitKeys.length; j++) {
                    let key = keys[j].split('.')
                    let value = `${sparateRecord[i].split(',')[j]}`
                    if (keys[j].includes('.')) {
                        if (obj.hasOwnProperty(`${key[0]}`)) {
                            obj[`${key[0]}`][`${key[1]}`] = value
                        } else {
                            obj[`${key[0]}`] = {}
                            obj[`${key[0]}`][`${key[1]}`] = value
                        }
                    } else {
                        obj[`${key[0]}`] = value
                    }
                    if (splitKeys.length - 1 === j) {
                        let obj1 = JSON.parse(JSON.stringify(obj))
                        obj1.additional_info = obj
                        arr.push(obj1)
                        obj = {}
                    }
                }

            }



        }

        return arr
    }
    catch (error) {
        console.log(error)
        return []
    }
}


module.exports = { parseToCsv }

