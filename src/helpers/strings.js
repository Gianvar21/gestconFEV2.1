import { isValid } from 'date-fns';
import moment from 'moment';

export function IsValidJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function getJsonOr(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

export function parseStringTime(time) {
  var matches = null;
  if (typeof time === 'string') {
    matches = time.match(
      /^(([0-1]{0,1}[0-9]( )?([AaPp][Mm]))|(([0]?[1-9]|1[0-2])(:|.)[0-5][0-9]( )?([AaPp][Mm]))|(([0]?[0-9]|1[0-9]|2[0-3])(:|.)[0-5][0-9]))$/i
    );
  }

  if (isValid(new Date(time))) {
    return time;
  } else if (matches !== null && typeof matches !== 'undefined') {
    let theTime = (matches && matches[1])
      .replace('am', ' am')
      .replace('pm', ' pm')
      .replace('.', ':');
    const parsedTime = moment(theTime, ['h:mm A']);
    const mergedTime = moment(new Date()).set({
      hours: parsedTime.get('hours'),
      minutes: parsedTime.get('minutes'),
    });
    return mergedTime;
  } else {
    return null;
  }
}

export const sanitizeStringDate = (date) => {
  if (
    date === '1900-01-01T00:00:00' ||
    date === '1/1/1900 12:00:00 AM' ||
    date === '0001-01-01T00:00:00' ||
    date === '1/1/0001 12:00:00 AM'
  ) {
    return null;
  }
  return date;
};
