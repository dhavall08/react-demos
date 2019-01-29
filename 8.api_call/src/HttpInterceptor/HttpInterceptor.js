import axios from 'axios';

const baseUrl = 'https://reqres.in/api/';

const getUserList = (url) => {
  const apiUrl = `${baseUrl}${url}`
  return axios.get(apiUrl)
    .then(response => {
      return {
        success: true,
        data: response.data,
        error: null
      };
    })
    .catch(error => {
      return {
        success: false,
        error: 'Something Went Wrong!' + error,
        data: null
      }
    })
}

const setUserRecord = (url, firstname, job) => {
  const apiUrl = `${baseUrl}${url}`
  return axios.post(apiUrl, {
    'name': firstname,
    'job': job
  }).then(response => {
    if (response.status === 201) {
      return {
        success: true,
        error: null,
        data: null,
      }
    }
  }).catch((error) => {
    return {
      success: false,
      error: 'Something Went Wrong!' + error,
      data: null
    }
  });
};

const updateUserRecord = (url, firstname, lastname) => {
  let apiUrl = `${baseUrl}${url}`;
  return axios.put(apiUrl, {
    'name': firstname,
    'job': lastname
  }).then(response => {
    if (response.status === 200) {
      console.log('[HttpInterceptor][Edit Record] Data Updated.');
      return {
        data: null,
        success: true,
        error: null,
      }
    }
    else {
      return {
        data: null,
        success: false,
        error: "Error code" + response.status,
      }
    }
  }).catch(error => {
    return {
      data: null,
      success: false,
      error: "Error Message" + error,
    }
  })
};

const getSingleRecord = (url) => {
  let apiUrl = baseUrl + url;
  return axios.get(apiUrl).then(response => {
    if (response.status === 200) {
      return {
        data: response.data.data,
        success: true,
        error: null
      }
    }
    else {
      return {
        data: null,
        success: false,
        error: "Error Code" + response.status,
      }
    }
  }).catch(error => {
    return {
      data: null,
      success: false,
      error: "Error Message" + error,
    }
  })
};

const deleteSingleRecord = (url) => {
  let apiUrl = baseUrl + url;
  axios.delete(apiUrl).then(response => {
    if (response.status === 204 || response.status === 200) {
      return {
        data: null,
        success: true,
        error: null
      }
    }
    else {
      return {
        data: null,
        success: false,
        error: 'Error code: ' + response.status
      }
    }
  }).catch(error => {
    return {
      data: null,
      success: false,
      error: 'Error code: ' + error
    }
  });
};

export { setUserRecord, updateUserRecord, getSingleRecord, deleteSingleRecord, getUserList }