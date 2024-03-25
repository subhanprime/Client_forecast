enum BulkField {
  Client = 'Client',
  Tags = 'Tags',
  Billable = ' Billable',
  NonBillable = 'Non-billable',
  Tentative = 'Tentative',
  Budget = 'Budget',
  Hours = 'Hours',
  Total = 'Total',
  Rate = 'Rate',
  PerHour = 'Per Hour',
  Type = 'Type',

}

enum Test {
  test,
}

export enum ProjectInternalFilter {
  Archived = 'Archived',
  MyProject = 'MyProject',
  Active = 'Active',
  Separator = ',',
}

export { BulkField, Test };
