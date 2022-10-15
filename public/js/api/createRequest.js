/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url;
    if (options.method === 'GET' && options.data){
        url += '?';
        const urlParams = [];
        for (let key in options.data){
            urlParams.push(`${key}=${options.data[key]}`)
        }
        url += urlParams.join('&');
    }
    xhr.open(options.method, url);

    if (options.method !== 'GET'){
        const formData = new FormData();

        for (let key in options.data){
            formData.append(key, options.data[key])
        }

        xhr.send(formData);
    } else {
        xhr.send();
    }

    xhr.onload = () => {
        if (!xhr.response.error){
            options.callback(null, xhr.response)
        } else {
            options.callback(new Error(xhr.response.error))
        }
    }
};
