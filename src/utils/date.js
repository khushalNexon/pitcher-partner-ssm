export const getTodayDate = ({ type = 'dd/mm/yyy' }) => {
  // Get the current date
  let today = new Date();

  // Get the day of the month
  let dd = today.getDate();

  // Get the month (adding 1 because months are zero-based)
  let mm = today.getMonth() + 1;

  // Get the year
  const yyyy = today.getFullYear();

  // Add leading zero if the day is less than 10
  if (dd < 10) {
    dd = `0${dd}`;
  }

  // Add leading zero if the month is less than 10
  if (mm < 10) {
    mm = `0${mm}`;
  }

  // Format the date as mm-dd-yyyy and log it
  if (type === 'dd-mm-yyy') {
    today = `${mm}-${dd}-${yyyy}`;
  }

  // Format the date as mm/dd/yyyy and log it
  if (type === 'mm/dd/yyyy') {
    today = `${mm}/${dd}/${yyyy}`;
  }

  // Format the date as dd-mm-yyyy and log it
  if (type === 'dd-mm-yyyy') {
    today = `${dd}-${mm}-${yyyy}`;
  }

  // Format the date as dd/mm/yyyy and log it
  if (type === 'dd/mm/yyyy') {
    today = `${dd}/${mm}/${yyyy}`;
  }
  
  return today;
};
