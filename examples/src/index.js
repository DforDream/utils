import {CacheData} from '../../lib/index.js'


console.log(new CacheData({
    getData: () => {
        console.log(1)
        return a
    },
    namespace: '123'
}).getIndex('0'))