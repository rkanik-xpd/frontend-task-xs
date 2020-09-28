import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/vue/frontend-task-xs/api/'
})

const endp = {
    list: 'list.php',
    reorder: 'reorder.php',
    submit: 'submit_form.php',
    form: id => id ? `get_form.php?id=${id}` : 'get_form.php',
}

const handle = async promise => {
    try { return (await promise).data }
    catch (e) {
        return e.response ? e.response.data : {
            status: 'error',
            messages: [e.message]
        }
    }
}

export default {

    getList: async () => await handle(api.get(endp.list)),
    getForm: async id => await handle(api.get(endp.form(id))),
    reorder: async data => await handle(api.post(endp.reorder, data)),
    createUser: async data => await handle(api.post(endp.submit, data)),
    updateUser: async data => await handle(api.put(endp.submit, data)),
    
}