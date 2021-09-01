import axios from 'axios'
export let axiosBase = null;

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export class RepositoryClass {

  defaultParam = {
    timeout:0,
    headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          withCredentials: true
        }
  }
  constructor(params) {
    let setting = {baseURL, ...this.defaultParam, ...params};
    axiosBase = axios.create(setting);
  }

  setHeader(name, value, scopes='common'){
    for (let scope of Array.isArray(scopes) ? scopes : [ scopes ]) {
      if (!value) {
        delete axios.defaults.headers[scope][name];
        return
      }
      axios.defaults.headers[scope][name] = value
    }
  }

  setToken(token, type, scopes='common'){
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  }

  onRequest;
  onError;
  onAlways;

  async get(path, params)
  {
    return this.request(path, axiosBase.get, params);
  }

  async post(path, params)
  {
    return this.request(path, axiosBase.post, params);
  }

  async put(path, params)
  {
    return this.request(path, axiosBase.put, params);
  }

  async delete(path, params)
  {
    return this.request(path, axiosBase.delete, params);
  }

  async request(path, method, params){

    // 非同期処理の場合
    if(this.onRequest || this.onError || this.onAlways )
    {
      this.onRequest = this.onRequest ? this.onRequest: ()=>{};
      this.onError = this.onError ? this.onError: ()=>{};
      this.onAlways = this.onAlways ? this.onAlways: ()=>{};

      await method(path, params)
      .then((res)=> 
      {
        this.onRequest(res);
      })
      .catch((error)=>
      {
        this.onError(error);
      }).finally(()=>{
        this.onAlways();
      })
    } else {
      return await method(path, params)
    }
  }
  
}
