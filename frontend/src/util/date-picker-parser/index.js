const moment = require('moment');

moment.locale('pt-BR');

const datePickerDateParser = (possible_date) => {
    if (possible_date instanceof Date && !isNaN(possible_date)) {
        return possible_date.toLocaleDateString();
    }
    return possible_date;
};

const dateTimePickerDateParser = (possible_date_time) => {
    if (possible_date_time instanceof Date && !isNaN(possible_date_time)) {
        return possible_date_time.toLocaleDateString();
    }
    return possible_date_time;
};

const ptBrDateToDateObject = (date) => {
    const format_date = moment(date, 'DD/MM/YYYY');
    return format_date.toDate();
};

export { datePickerDateParser, dateTimePickerDateParser, ptBrDateToDateObject };
