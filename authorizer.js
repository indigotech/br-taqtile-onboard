import {AsyncStorage} from 'react-native'

//returns a promisse already analyzed and with token extracted and 'saved', if a new token is provided it overides the
//saved token, if not the saved token is used and updated
export default async function authFetch(url, options) {
    opt = { ...options }
    
    if (!options.headers) {
        opt.headers = {}
    }

    const token = await AsyncStorage.getItem("token").catch(console.log);

    opt.headers.Authorization = (opt.headers && opt.headers.Authorization) || token

    const rawResponse = await fetch(url, opt);

    let response;

    console.log(rawResponse.status)

    if ((rawResponse.status >=200 && rawResponse.status < 300) || rawResponse.status==401) {
        response = await rawResponse.json();
    } else {
        throw new Error("server returned status " + rawResponse.status);
    }

    if (rawResponse.status != 401 && response.data.token) { 
        await AsyncStorage.setItem("token", response.data.token);
    }

    return response;
}