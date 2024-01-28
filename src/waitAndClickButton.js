
const waitAndClickButton = async(page, xpath) => {
    const fullXPathPermisos = xpath

    try{
        await page.waitForXPath(fullXPathPermisos)
    }catch(err){
        console.log(`error debido a waitForXPath`);
    }
    
    const botonPermisos = await page.$x(fullXPathPermisos);
    
    if(botonPermisos.length > 0){
        await botonPermisos[0].click();
    }else{
        console.error('Boton aparecio pero no pudimos fijarlo');
    }

    await page.waitForTimeout(1500)

}

module.exports = waitAndClickButton
