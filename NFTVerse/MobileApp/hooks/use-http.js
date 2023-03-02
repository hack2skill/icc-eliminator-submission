import { useCallback } from 'react';
import axios from 'axios';

const useHttp = () => {
    return useCallback(
        (requestOptions, successCallback, errorCallback, completeCallback) =>
            axios({
                method: requestOptions.method ? requestOptions.method.toLowerCase() : 'get',
                url: requestOptions.url,
                data: requestOptions.data ? requestOptions.data : null,
                headers: requestOptions.headers ? requestOptions.headers : undefined,
            })
                .then((response) => {
                    return Promise.resolve().then(() => successCallback && successCallback(response.data));
                })
                .catch(error => {
                    return Promise.reject().then(() => errorCallback && errorCallback(error));
                })
                .finally(() => {
                    completeCallback && completeCallback();
                }),
        [],
    );
};

export default useHttp;
