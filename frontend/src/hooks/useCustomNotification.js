import {notification} from "antd";
import {useCallback} from "react";

const useCustomNotification = () => {
    const [api] = notification.useNotification();

    const openNotification = useCallback((message, description)=>
            api.info({
                message: message,
                description: description,
                placement: 'topRight',
            })

    , [])

    return {openNotification};
};

export {useCustomNotification}