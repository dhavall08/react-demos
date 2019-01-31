import * as Interceptor from '../HttpInterceptor/HttpInterceptor';

const getUserList = (page) => {
  const url = `users?page=${page}`;
  return Interceptor.getUserList(url);
}

const setUserRecord = (page, firstname, job) => {
  const url = `users`;
  return Interceptor.setUserRecord(url,firstname,job);
}

const updateUserRecord = (firstname, lastname, id) => {
  const url = `users\\${id}`;
  return Interceptor.updateUserRecord(url,firstname, lastname);

};
const getSingleRecord = (id) => {
  const url = `users\\${id}`;
  return Interceptor.getSingleRecord(url);
};

const deleteSingleRecord = (id) => {
  const url = `users\\${id}`;
  return Interceptor.deleteSingleRecord(url);
};


export { getUserList, setUserRecord, updateUserRecord, getSingleRecord, deleteSingleRecord }
