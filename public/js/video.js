'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
    let selected = document.querySelector('select');
    let url = new URLSearchParams(window.location.search);
    const param = url.get('category');
    if (param) selected.value = param;
});

document.querySelector('select').addEventListener('change', (e)=>{
    const selected = document.querySelector('select').value;
    let url = new URLSearchParams(window.location.search);
    url.delete('page');
    
    if (selected==='Kaikki') url.delete('category');
    else {
        url.set('category', selected);
    }
    window.location.search=url;
});