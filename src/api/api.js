import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost/vue/simple-crud/api/'
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

const handle = async callback => {
    try { return (await callback).data }
    catch (e) {
        return e.response ? e.response : {
            status: 'error',
            messages: [e.message]
        }
    }
}

export default {

    getList: async () => {
        try { return (await api.get(endpoints.list)).data }
        catch (error) { return error.response }
    },
    reorder: async data => await handle(api.post(endpoints.reorder, data)),

    createUser: data => new Promise(resolve => {
        api.post(endpoints.submit, data)
            .then(({ data }) => {
                if (data.status !== 'error') {
                    resolve({
                        messages: data.messages,
                        data: data.data
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
    getForm: (id) => new Promise(resolve => {
        api.get(endpoints.form(id))
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