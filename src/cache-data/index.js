import { isEqual } from 'lodash'
class CacheData {
  constructor(params) {
    this.getData = params.getData
    this.namespace = params.namespace
  }

  // params 参数根据传递进来的接口请求函数而定
  async getCacheData(name, params, cache = true) {
    let data = null
    const index = this.getIndex(name)
    if (index !== null) {
      data = localStorage.getItem(localStorage.key(index))
    } else {
      data = await this.getData(params)
      cache && this.setLocalStorage(name, data)
      return data
    }
    return JSON.parse(data)
  }

  async setCacheData(name, params) {
    const index = this.getIndex(name)
    if (index !== null) {
      const data = localStorage.getItem(localStorage.key(index))
      const res = await this.getData(params)
      if (!isEqual(JSON.parse(data), res)) {
        this.setLocalStorage(name, res)
      }
    }
  }

  setLocalStorage(name, data) {
    let key = null
    const index = this.getIndex(name)
    if (index !== null) {
      key = localStorage.key(index)
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      key = `${this.namespace}-${name},${new Date().getTime()}`
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  getIndex(name) {
    const key = `${this.namespace}-${name}`
    const length = localStorage.length
    let index = null
    for (let i = 0; i < length; i++) {
      const id = localStorage.key(i).split(',')[0]
      if (id === key) {
        index = i
        return index
      }
    }
    return index
  }
}

export default CacheData