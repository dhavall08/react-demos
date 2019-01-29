import axios from 'axios';

const apiUrl = 'https://reqres.in/api/users/';
const baseUrl = 'https://reqres.in/api/';
const res = {
    success: true || false,
    data: null,
    error: null
};

const get = (url) =>{
    const apiUrl = `${baseUrl}${url}`
    return axios.get(apiUrl)
    .then(response => {
        return {
            success:true,
            data: response.data,
            error: null
        };
    })
    .catch(err =>{
        return {
            success: false,
            error: 'Something Went Wrong!',
            data:null
        }
    })
}

const apiListRecords = (currentPage) => {
    let url = apiUrl;

    axios.get(url, {
        params: {
            page: currentPage
        }
    }).then(response => {
        res.data = response.data;
        res.success = true;
    }).catch(error => {
        res.success = false;
        res.error = "Error occurred." + error;
        res.data = null;
    })

    return res;
};

const apiAddRecord = (firstname, job) => {
    let url = apiUrl;
    axios.post(url, {
        'name': firstname,
        'job': job
    }).then(response => {
        if (res.status === 201) {
            console.log('this.....', this);
            res.success = true;
            res.error = null;
            res.data = null;
            //alert("Data Submitted");
            // this.props.history.push('/list');

        }
    }).catch((error) => {
        res.success = true;
        res.error = error;
        res.data = null;
        res.success = false;
    });

    return res;


    // let url = apiUrl;
    // const data = {
    //     'name': firstname,
    //     'job': job
    // };

    // return postAPI(url, data).then()
};

const apiEditRecord = (firstname, lastname, id) => {
    let url = apiUrl + id;
    axios.put(url, {
        'name': firstname,
        'job': lastname
    }).then(response => {
        if (response.status === 200) {
            res.data = null;
            res.success = true;
            res.error = null;
            console.log('[Edit Record] Data Updated.', res)
        }
        else {
            res.data = null;
            res.success = false;
            res.error = "Error code" + response.status;
        }
    }).catch(error => {
        res.data = null;
        res.success = false;
        res.error = "Error Message" + error;
    })
    return res;
};
const apiSingleRecord = (id) => {
    let url = apiUrl + id;
    axios.get(url).then(response => {
        if (response.status === 200) {
            res.data = response.data.data;
            res.success = true;
            res.error = null;
        }
    })
    return res;
};

const apiDeleteRecord = (id) => {
    let url = apiUrl + id;
    axios.delete(url).then(response => {
        if (response.status === 204 || response.status === 200) {
            res.data = null;
            res.success = true;
            res.error = null;
        }
        else {
            res.data = null;
            res.success = false;
            res.error = 'Error code: ' + response.status;
        }
    }).catch(error => {
        res.data = null;
        res.success = false;
        res.error = "Error occurred.";
    });
    return res;
};

// const postAPI =(url, data) =>{  
//     let url = apiUrl;
//     return axios.post(url, data).then().catch()
// }

export { apiListRecords, apiAddRecord, apiEditRecord, apiSingleRecord, apiDeleteRecord, get }