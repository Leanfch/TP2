if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js').then((message)=> {
        console.log('Service Worker esta listo para usarse');
    });
} else {
    console.log('Service Worker no está disponible en el navegador');
}