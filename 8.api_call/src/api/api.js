import axios from 'axios';

const apiUrl='https://reqres.in/api/users/';

const apiListRecords = (currentPage) => {
    let url = apiUrl;
    return axios.get(url, {
        params: {
            page: currentPage
        }
    })
};

const apiAddRecord = (firstname, job) => {
    let url = apiUrl;
    return axios.post(url, {
        'name': firstname,
        'job': job
    })

    // let url = apiUrl;
    // const data = {
    //     'name': firstname,
    //     'job': job
    // };

    // return postAPI(url, data).then()
};

const apiEditRecord = (firstname, lastname, id) => {
    let url = apiUrl + id;
    return axios.put(url, {
        'name': firstname,
        'job': lastname
    })
};
const apiSingleRecord = (id) => {
    let url = apiUrl + id;
    return axios.get(url)
};

const apiDeleteRecord = (id) => {
    let url = apiUrl + id;
    return axios.delete(url)
};

// const postAPI =(url, data) =>{  
//     let url = apiUrl;
//     return axios.post(url, data).then().catch()
// }

export { apiListRecords, apiAddRecord, apiEditRecord, apiSingleRecord, apiDeleteRecord }