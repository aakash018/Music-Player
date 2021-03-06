function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context("../Music", false, /\.(mp3)$/));

export function FillSongs(songData) {
  function fillsongsProperty(songObject) {
    const requiredSongName = images.filter((name) => {
      return name.slice(14).split(".")[0] === songObject.name;
    });
    songObject.song = requiredSongName[0];

    return songObject;
  }
  
  const songs_tempo = [];
  songData.map((song) => {
    return songs_tempo.push(fillsongsProperty(song));
  });

  return songs_tempo;
}
