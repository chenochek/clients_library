import {observable} from 'mobx'

const BirthStore = observable({
    today: [],
    tomorrow: [],
    get Today() {
        return this.today
    },
    get Tomorrow() {
        return this.tomorrow
    },
    set Today(newResult) {
        this.today = newResult;
    },
    set Tomorrow(newResult) {
        this.tomorrow = newResult;
    },
})

export default BirthStore