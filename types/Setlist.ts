export type Setlist = {
  created_at: string;
  id: number;
  setlist_id: number;
  songsheet_id: number;
};

export type SetlistItems = {
  [key: string]: Setlist;
};

//   // Example data
//   const setlistItems: SetlistItems = {
//     "1": {
//       created_at: "Sun, 30 Jun 2024 22:34:31 GMT",
//       id: 1,
//       setlist_id: 1,
//       songsheet_id: 1,
//     },
//     "2": {
//       created_at: "Sun, 30 Jun 2024 22:34:31 GMT",
//       id: 2,
//       setlist_id: 2,
//       songsheet_id: 2,
//     },
//     "3": {
//       created_at: "Sun, 30 Jun 2024 22:34:31 GMT",
//       id: 3,
//       setlist_id: 3,
//       songsheet_id: 3,
//     },
//   };
