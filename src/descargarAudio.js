const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

async function descargarAudioMP3(enlace, nameVideo) {
    try {
        const rutaDescarga = path.join(__dirname, '../audios', nameVideo);
        ytdl(enlace, { filter: 'audioonly', quality: 'highestaudio' }).pipe(fs.createWriteStream(rutaDescarga));
    } catch (error) {
        console.error('Ocurrió un error al descargar el audio en formato mp3:', error);
    }
}

module.exports = descargarAudioMP3