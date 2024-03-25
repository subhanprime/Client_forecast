interface FormValues {
  hours: string,
  totalHours: string,
  notes:string,
  project: null | number,
  people:(number)[]
}

interface FormErrors {
  hours?:string,
  project?:string,
  people?:string,
  date?:string,
}
