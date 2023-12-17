import {observable, action} from 'mobx'

const ClientsStore = observable({
    result: [],
    initial: [],
    currentClient: {},
    sort: 'fio',
    get Result() {
        if(this.sort === 'fio') {
            return this.sortByFio()
        } else {
            return this.sortByDate(this.sort)
        }
    },
    get Initial() {
        return this.initial
    },
    set Result(newResult) {
        this.result = newResult;
        this.initial = newResult;
    },
    set Initial(newResult) {
        this.initial = newResult;
    },
    get CurrentClient() {
        return this.currentClient;
    },
    set CurrentClient(client) {
        this.currentClient = client;
    },
    getClientById(id) {
        return this.Result.find(el => el["id"] === id);
    },
    getClientIndexById(id) {
        return this.Result.findIndex(el => el["id"] === id);
    },
    editClientById(id, newClient) {
        const index = this.getClientIndexById(id);
        this.Result[index] = newClient;
    },

    deleteById(id) {
        this.Result = this.Result.filter(el => el["id"] !== id);
    },
    addNewClient(newClient) {
        this.Result = [newClient, ...this.Result]
    },
    getLiveSearchResult(searchStr) {
        return this.initial.filter(el => el["total"].toUpperCase().includes(searchStr.toUpperCase()));
    },
    sortByDate(key) {
        return this.result.slice().sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    },
    sortByFio() {
        return this.result.slice().sort((a, b) => {
            if (a.fio < b.fio) {
                return -1;
            }
            if (a.fio > b.fio) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
})

export default ClientsStore