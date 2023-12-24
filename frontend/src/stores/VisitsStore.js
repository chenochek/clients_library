import {observable, action} from 'mobx'
import formatDate from "../utils/formatDate";

const VisitStore = observable({
    result: [],
    initial: [],
    get Result() {
        return this.result
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
    getById(id) {
        return this.Result.find(el => el["id"] === id);
    },
    getVisitIndexById(id) {
        return this.result.findIndex(el => el["id"] === id);
    },
    editVisitById(id, newVisit) {
        const index = this.getVisitIndexById(id);
        this.result = [...this.result.slice(0, index), newVisit, ...this.result.slice(index + 1)];

    },

    deleteById(id){
        this.Result = this.Result.filter(el => el["id"] !== id)
    },
    addNewVisit(newVisit) {
        this.result = [newVisit, ...this.result]
    },
    getLiveSearchResult(searchStr) {
        return this.initial.filter(el => `${el.duration} ${el.price} ${el.date && formatDate(el.date)} ${el.comment}`
            .toUpperCase().includes(searchStr.toUpperCase()));
    },
    sortByDateDesc() {
        return this.result.slice().sort((a, b) => {
            if (a["date"] > b["date"]) {
                return -1;
            }
            if (a["date"] < b["date"]) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
})

export default VisitStore