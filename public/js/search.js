'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
    let search = document.getElementById('search-bar').querySelector('input');
    let url = new URLSearchParams(window.location.search);
    const param = url.get('term');
    if (param) search.value = param;
});

document.getElementById('search-bar').querySelector('input').addEventListener('keypress', (e)=>{
    if (e.key !== 'Enter') return;

    const search = document.getElementById('search-bar').querySelector('input').value;
    if (search.length != 0 && search.length < 3) return;
    
    let url = new URLSearchParams(window.location.search);
    url.delete('page');

    if (search==='') url.delete('term');
    else {
        url.set('term', search);
    }
    window.location.search=url;
});
