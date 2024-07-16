export type SetlistItem = {
  created_at: string;
  id: number;
  setlist_id: number;
  songsheet_id: number;
};

export type  Setlist = {
  author_id: number;
  created_at: string;
  description: string;
  id: number;
  name: string;
  public: boolean;
  updated_at: string;
};
// "Setlists": {
//     "1": {
//     },
//     "2": {
//       "author_id": 2,
//       "created_at": "Sun, 30 Jun 2024 22:34:31 GMT",
//       "description": "A collection of timeless rock songs",
//       "id": 2,
//       "name": "Rock Classics",
//       "public": true,
//       "updated_at": "Sun, 30 Jun 2024 22:34:31 GMT"
//     },
//     "3"
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
