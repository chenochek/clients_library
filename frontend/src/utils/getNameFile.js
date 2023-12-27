const getNameFile = (path) => {
        const nameFileArr = path.split('/');
        return path? nameFileArr[nameFileArr.length - 1] : ''
}

export {getNameFile}