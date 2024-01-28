const puppeteer = require('puppeteer');
const waitAndClickButton = require('./src/waitAndClickButton');
const descargarAudioMP3 = require('./src/descargarAudio');

const webDirection = 'http://www.youtube.com/playlist?list=PL82bxjpHf6Cw4v9SR-NcV6Z-wlNp7Ou45'


const downloadPlayList = async (webDirection) => {

    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(webDirection);

    //Probando a cazar elemento con esta ruta
    const fullXPathPermisos = '/html/body/c-wiz/div/div/div/div[2]/div[1]/div[3]/div[1]/form[2]/div/div/button'
    await waitAndClickButton(page, fullXPathPermisos)

    const enlaces = await page.evaluate(() => {
        const elements = document.querySelectorAll('.ytd-playlist-video-renderer #video-title')

        const enlaces = []
        for (const element of elements) {
            enlaces.push(element.href)
        }
        return enlaces
    })

    let number = 0
    for(const enlace of enlaces){
        const nameVideo = `video${number}.mp3`
        await descargarAudioMP3(enlace, nameVideo)
        number++
    }

    console.log('DESCARGA TERMINADA');
    browser.close();
}


downloadPlayList(webDirection)