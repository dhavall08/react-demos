import * as Interceptor from './../HttpInterceptor/HttpInterceptor';

const apiListRecords = (currentPage,callback) => {
    callback(Interceptor.apiListRecords(currentPage));
};

const apiAddRecord = (firstname, job) => {
    return Interceptor.apiAddRecord(firstname,job);
};

const apiEditRecord = (firstname, lastname, id) => {
    return Interceptor.apiEditRecord(firstname,lastname,id);
    
};
const apiSingleRecord = (id,callbackfun) => {
    callbackfun(Interceptor.apiSingleRecord(id));
};

const apiDeleteRecord = (id) => {
    return Interceptor.apiDeleteRecord(id);
};

const getUserList = (page) => {
 const url = `users?page=${page}`;
 return Interceptor.get(url);
}

export { apiListRecords, apiAddRecord, apiEditRecord, apiSingleRecord, apiDeleteRecord, getUserList }