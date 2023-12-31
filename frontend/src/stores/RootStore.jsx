import{ createContext, useContext } from 'react'
import VisitStore from "./VisitsStore";
import ClientsStore from "./ClientsStore";
import BirthStore from "./BirthStore";



const RootStore = () => {

    const stores =  {VisitStore, ClientsStore, BirthStore};

    const StoreContext = createContext(stores);

    const StoreProvider = ({children}) => {
        return (<StoreContext.Provider value={stores}>{children}</StoreContext.Provider>)
    };

    const useStores =  () => {
        return useContext(StoreContext)
    };

    return {
        StoreProvider: StoreProvider,
        useStores: useStores
    }

}

export default RootStore;