const months = ['Jan', 'Fev', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const getToday = () => {
    return new Date(new Date().getTime());
}

const getTomorrow = () => {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
}

const isLateSec = (deadline: number) => (isLate(new Date(deadline)));
const isLate = (deadline: Date): boolean => (getToday() > deadline);

const isTodaySec = (deadline: number) => (isToday(new Date(deadline)));
const isToday = (deadline: Date): boolean => (getToday().getUTCDate() === deadline.getUTCDate());

const getFormatedDate = (seconds: number) => {
    let date = new Date();
    date.setTime(seconds);
    return `${date.getUTCDate()} ${months[date.getMonth()]}`;
}

export { getToday, getTomorrow, getFormatedDate, isLate, isLateSec, isToday, isTodaySec };