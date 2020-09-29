import axios from 'axios'
import { folderName, server } from '../../build.config.json'

const baseURL = process.env.NODE_ENV === 'production'
    ? `${server.baseUrl}${server.folderPath}${folderName}/api/`
    : `http://localhost/vue/frontend-task-xs/api/`

const api = axios.create({ baseURL })

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