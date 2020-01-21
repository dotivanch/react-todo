const getToday = () => {
    return new Date(new Date().getTime());
}

const getTomorrow = () => {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
}

const formatDate = (date) => {
    return `${date.getFullYear()}-${("0"+(date.getMonth() + 1)).slice(-2)}-${("0"+date.getDate()).slice(-2)}`;
}

export { getToday, getTomorrow, formatDate };