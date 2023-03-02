import { useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { REACT_APP_X_APP_TOKEN } from 'denv';

const useAuthorizedHttp = () => {
    const authToken = useSelector((state) => state.app.user.authToken);

    return useCallback(
        (requestOptions, successCallback, errorCallback, completeCallback) =>
            axios({
                method: requestOptions.method ? requestOptions.method.toLowerCase() : 'get',
                url: requestOptions.url,
                data: requestOptions.data ? requestOptions.data : null,
                headers: {
                    ...requestOptions.headers,
                    'X-Auth-Token': authToken,
                    'X-App-Token': REACT_APP_X_APP_TOKEN
                },
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

export default useAuthorizedHttp;
