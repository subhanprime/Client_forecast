export function getInitials(name:string) {
  const nameArray = name.split(' ');
  return nameArray.map((word) => word[0]).join('').toUpperCase();
}

export function accountTypeDescription(value:Number) {
  if (value === 7) {
    return 'Manager';
  }
  if (value === 2) {
    return 'Admin';
  }
  if (value === 1) {
    return 'Account Owner';
  }
  return '---';
}
export function formatDate(inputDate:string) {
  if (!inputDate) {
    return '---';
  }
  const date = new Date(inputDate);
  const options:Intl.DateTimeFormatOptions = {
    day: 'numeric', month: 'short', year: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}
