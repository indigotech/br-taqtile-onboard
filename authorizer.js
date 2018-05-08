export default class Authorizer{
    constructor(token){
        this.token = token || ''
    }

    //returns a promisse already analyzed and with token extracted and 'saved', if a new token is provided it overides the
    //saved token, if not the saved token is used and updated
    authFetch(url, options){
        opt = { ...options }
        
        if(!options.headers) opt.headers ={}
        opt.headers.Authorization = (opt.headers && opt.headers.Authorization) || this.token
        console.log("options received", opt.headers)
        console.log("url passed:", url)
        console.log("here this is ", this)
        return fetch(url, opt)
                .then(data => {//let through status 2xx and 401
                    if((data.status >=200 && data.status < 300) || data.status==401) return data.json()
                    else throw new Error("server returned status " + data.status)
                })
                .then(dataJson => {
                    this.token = dataJson.token
                    return dataJson
                })
    }

    setToken(token){
        this.token = token
    }
}