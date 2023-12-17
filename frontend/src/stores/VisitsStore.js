import {observable, action} from 'mobx'

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
        this.result[index] = newVisit;

    },

    deleteById(id){
        this.Result = this.Result.filter(el => el["id"] !== id)
    },
    addNewVisit(newVisit) {
        this.result = [newVisit, ...this.result]
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