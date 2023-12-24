import {Image} from "antd";
import * as React from "react";
import {useEffect, useState} from "react";
import useHttp from "../hooks/useHttp.js";
import Urls from "../constants/url";
import {getNameFile} from "../utils/getNameFile.js"

const ImageModal = ({filePath, visible, setVisible}) => {
    const [src, setSrc] = useState('');
    const {postRequest} = useHttp();


    useEffect(() => {
        const obj = {
            nameFile: getNameFile(filePath)
        }

        filePath && postRequest({url: `${Urls().image}`, data: obj })
            .then(response => {
                setSrc(response.data.url.replace('\\\\', '//'))
            })
    }, [filePath])


return(
    <Image
        width={200}
        style={{ display: 'none' }}
        src={src}
        preview={{
            visible,
            src: src,
            onVisibleChange: (value) => {
                setVisible(value);
            },
        }}
    />
)
}


export {ImageModal}