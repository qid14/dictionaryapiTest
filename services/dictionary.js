import axios from 'axios';
import DictionaryNotFoundError from '../errors/dictNotFound';
import UnauthrizedError from '../errors/unAuthrized';
import BadRequestError from '../errors/badRequest';

var base_url = 'https://private-f0fc3-dictionaryapi.apiary-mock.com/dictionary/';

var Dictionary = {
    getDictionary: async (id, basicAuth) => {
        var test_url = base_url + id + '/keys';
        var axiosInstance = axios.create({
            validateStatus: function (status) {
                return status >= 200 && status <= 503;
            },
        });

        const response = await axiosInstance.get(test_url, {
            headers: { 'Authorization': basicAuth }
        });
        const status = response.status;
        if (status === 200) {
            return response.data;
        } else if (status === 401) {
            throw new UnauthrizedError('Unauthrized');
        }
        else if (status === 404) {
            throw new DictionaryNotFoundError('Dictionary Not Found');
        } else {
            throw new Error('Unexpected status code received.');
        }
    },
    getKeyValue: async (id, key, basicAuth) => {
        var test_url = base_url + id;
        if (key != null) {
            test_url = test_url + '/keys/' + key;
        };
        var axiosInstance = axios.create({
            validateStatus: function (status) {
                return status >= 200 && status <= 503;
            },
        });
        const response = await axiosInstance.get(test_url, {
            headers: { 'Authorization': basicAuth }
        });
        const status = response.status;
        if (status === 200) {
            return response.data;
        } else if (status === 401) {
            throw new UnauthrizedError('Unauthrized');
        }
        else if (status === 404) {
            throw new DictionaryNotFoundError('key is not defined');
        } else {
            throw new Error('Unexpected status code received.');
        }
    },

    createDictionary: async (basicAuth) => {
        var test_url = base_url;

        var axiosInstance = axios.create({
            validateStatus: function (status) {
                return status >= 200 && status <= 503;
            },
        });
        const response = await axiosInstance.post(test_url, {
            headers: { 'Authorization': basicAuth }
        });
        const status = response.status;
        if (status === 201) {
            return response.data;
        } else if (status === 401) {
            throw new UnauthrizedError('Unauthrized');
        } else if (status === 404) {
            throw new DictionaryNotFoundError('Dictionary or Key Not Found');
        }
        else {
            throw new Error('Unexpected status code received.');
        }
    },
    createModifyKeyinDictionary: async (id, key, body, basicAuth) => {
        var test_url = base_url + id;
        if (key != null) {
            test_url = test_url + '/keys/' + key;
        };
        var axiosInstance = axios.create({
            validateStatus: function (status) {
                return status >= 200 && status <= 503;
            },
        });
        const response = await axiosInstance.post(test_url, {
            headers: { 'Authorization': basicAuth },
            body: body
        });
        const status = response.status;
        if (status === 201) {
            return status;
        } else if (status === 400) {
            throw new BadRequestError('Bad Request');
        }
        else if (status === 401) {
            throw new UnauthrizedError('Unauthrized');
        } else if (status === 404) {
            throw new DictionaryNotFoundError('Dictionary or Key Not Found');
        }
        else {
            throw new Error('Unexpected status code received.');
        }
    },
    deleteDictionary: async (id, key, basicAuth) => {
        var test_url = base_url + id;
        if (key != null) {
            test_url = test_url + '/keys/' + key;
        };
        var axiosInstance = axios.create({
            validateStatus: function (status) {
                return status >= 200 && status <= 503;
            },
        });
        const response = await axiosInstance.delete(test_url, {
            headers: { 'Authorization': basicAuth }
        });
        const status = response.status;
        if (status === 200) {
            return status;
        } else if (status === 401) {
            throw new UnauthrizedError('Unauthrized');
        }
        else if (status === 404) {
            throw new DictionaryNotFoundError('Dictionary or Key Not Found');
        }
        else {
            throw new Error('Unexpected status code received.');
        }
    },
}

export { Dictionary };