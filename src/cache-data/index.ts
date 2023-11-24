interface Params  {
  namespace: string
  getData: <T>(...args:T[]) => any
}
export class CacheData {
  private namesapce: string
  private getData: <T>(...args:T[]) => any
  constructor(params:Params) {
    this.namesapce = params.namespace
    this.getData = params.getData
  }
}

export default new CacheData({
  namespace: 'test',
  getData: (...a) => {
    console.log(a)
    return '123'
  }
})