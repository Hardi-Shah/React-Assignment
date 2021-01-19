import axios from "axios";

const apiurl='https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0';

export function getAPIService(){
    return axios.get(`${apiurl}`)
}
