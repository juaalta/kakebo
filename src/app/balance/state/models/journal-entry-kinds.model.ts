export const journalEntryKinds = [
  { _id: 'I', name: 'Incoming', signe: 1, isForecast: true },
  { _id: 'O', name: 'Outgoing', signe: -1, isForecast: true },
  { _id: 'E', name: 'Expense', signe: -1, isForecast: false }
];

export enum journalEntryKindsEnum {
  'Income' = 'I',
  'Outgoing' = 'O',
  'Expense' = 'E'
}
