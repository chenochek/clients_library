import {observable, action} from 'mobx'
import formatDate from "../utils/formatDate.js"

const ClientsStore = observable({
    result: [],
    initial: [],
    sortedArr: [],
    currentClient: {},
    get Result() {
        return this.result;
    },
    get Initial() {
        return this.initial
    },
    set Result(newResult) {
        this.result = newResult;
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
    set SortedArr(newArr) {
        this.sortedArr = newArr
    },
    get SortedArr() {
        return this.sortedArr;
    },
    getClientById(id) {
        return this.Result.find(el => el["id"] === id);
    },
    getClientIndexById(id) {
        return this.Result.findIndex(el => el["id"] === id);
    },
    editClientById(id, newClient) {
        const index = this.getClientIndexById(Number(id));
        this.result = [...this.result.slice(0, index), newClient, ...this.result.slice(index + 1)]
    },

    deleteById(id) {
        this.Result = this.Result.filter(el => el["id"] !== id);
    },
    addNewClient(newClient) {
        this.Result = [newClient, ...this.Result]
    },
    getLiveSearchResult(searchStr) {
        return this.initial.filter(el => `${el.fio} ${el.mobile} ${el.date_birth && formatDate(el.date_birth)}`
            .toUpperCase().includes(searchStr.toUpperCase()));
    },
    doSort(sort, order) {
        if (sort === 'fio') {
            return this.sortByFio()
        } else {
            return this.sortByDate(sort, order)
        }
    },
    sortByDate(key, order) {
        return this.result.slice().sort((a, b) => {
                const aDate = new Date(a[key]);
                const bDate = new Date(b[key])
                if (order === 'desc') {
                    return  aDate - bDate;
                } else {
                    return bDate - aDate;
                }
            }
        );
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
    },
})

export default ClientsStore