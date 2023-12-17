import Axios from 'axios'


export default function   useHttp  () {

    const postRequest = ({url, data = {}}) =>{
       return Axios.post(url, data)
            .catch(err => console.log(err));
    };

    const getRequest = ({url}) => {
       return Axios.get(url).catch(err => console.log(err));;
    };

    const deleteRequest = ({url}) => {
       return  Axios.delete(url).catch(err => console.log(err));;
    };

    const putRequest = ({url, data = {}}) => {
        return Axios.put(url, data).catch(err => console.log(err));;
    };

    return{
        postRequest,
        getRequest,
        deleteRequest,
        putRequest
    } ;
}