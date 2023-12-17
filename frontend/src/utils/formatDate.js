const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU',  {timeZone: "Europe/Minsk"});
};

export default formatDate;