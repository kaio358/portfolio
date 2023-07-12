function removeAviso(){
    const aviso = document.getElementById("aviso")
    aviso.remove()
}

function copiarTexto() {
    let textoCopiado = document.getElementById("email");
    textoCopiado.select();
    textoCopiado.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(textoCopiado.value)
 
    
}