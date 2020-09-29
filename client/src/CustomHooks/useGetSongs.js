import { useState, useEffect } from "react";
import { AllSongsList } from "../Music/songs";

export function useGetSongs() {
  const [songsFromGroup, setSongsFromGroup] = useState(AllSongsList);

  useEffect(() => {}, [songsFromGroup]);

  return [songsFromGroup, setSongsFromGroup];
}
