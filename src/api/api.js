import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/vue/frontend-task-xs/api/'
})

const endpoints = {
    list: 'list.php',
    reorder: 'reorder.php',
    submit: 'submit_form.php',
    form: id => {
        let endpoint = 'get_form.php'
        return id ? endpoint + `?id=${id}` : endpoint
    },
}

export default {
    getList: () => new Promise(resolve => {
        api.get(endpoints.list)
            .then(({ data }) => {
                if (data.status !== 'error') {
                    resolve({
                        list: data.data.rows,
                        headers: data.data.headers[0]
                    })
                }
            })
            .catch(err => {
                console.log(err);
                resolve({
                    error: true,
                    message: err.message,
                    data: err.response
                })
            })
    }),
    getForm: () => new Promise(resolve => {
        api.get(endpoints.form())
            .then(({ data }) => {
                console.log('getForm', data);
                if (data.status !== 'error') {
                    resolve({
                        form: data.data.fields[0]
                    })
                }
            })
            .catch(err => {
                console.log(err);
                resolve({
                    error: true,
                    message: err.message,
                    data: err.response
                })
            })
    }),
}