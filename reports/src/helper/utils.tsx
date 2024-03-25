export const getScheduledHours = (originalProp:any) => {
  let scheduledHours = 0;
  originalProp.getValue()?.forEach((e:any) => {
    if (Array.isArray(e.hours)) {
      e.hours.forEach((data:any) => {
        scheduledHours += data.hours.scheduled;
      });
    }
  });
  return scheduledHours;
};

export const getBillableHours = (originalProp:any) => {
  let billableHours = 0;
  originalProp.getValue()?.forEach((e:any) => {
    if (Array.isArray(e.hours)) {
      e.hours.forEach((data:any) => {
        if (data.billable) {
          billableHours += data.hours.scheduled;
        }
      });
    }
  });
  return billableHours;
};

export const getNonBillableHours = (originalProp:any) => {
  let nonBillableHours = 0;
  originalProp.getValue()?.forEach((e:any) => {
    if (Array.isArray(e.hours)) {
      e.hours.forEach((data:any) => {
        if (!data.billable) {
          nonBillableHours += data.hours.scheduled;
        }
      });
    }
  });
  return nonBillableHours;
};

export const getBillablePercentage = (originalProp:any) => {
  const billableHours = getBillableHours(originalProp);
  const scheduledHours = getScheduledHours(originalProp);

  if (billableHours === 0 || scheduledHours === 0) {
    return 0;
  }
  const billablePercentage = (billableHours / scheduledHours) * 100;
  return billablePercentage;
};
