export function getImage(img){
    if(typeof img === 'string' && (img.startsWith('/sorvete') || img.startsWith('/sabor') || img.startsWith('/recipiente') || img.startsWith('/acompanhamento'))){
        return "http://localhost:3000" + img
    }
    else if(typeof img === 'string' && img?.startsWith('/src')){
        return img
    }else if(typeof img === 'object'){
        return URL.createObjectURL(img)
    }else{
        return img
    }
}