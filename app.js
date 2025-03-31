const requestURL = 'https://1xbetua.com/LiveFeed/Get1x2_VZip?sports=10&count=50&gr=29&mode=4&country=2&partner=65&getEmpty=true';
let DATA = [];
let result = [];

const rootElement = document.querySelector('#root');

// document.location.reload(); - ПЕРЕЗАГРУЗКА СТОРІНКИ

function sendRequest(url) {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }
        xhr.send();
    })
}

sendRequest(requestURL).then( data => {DATA = data.Value} )

function dataHundler() {
    
    let c = [];
    for(let i = DATA.length - 1; i>= 0; i--){
        if(DATA[i].LE == 'Masters. Russia') {
            result.push(DATA[i]);
        }
    }

    for(let i = 0; i< result.length; i++){
        if(result[i].E[0] && result[i].E[1]) {
            let b = {};
            b.E = [result[i].E[0].C,result[i].E[1].C];
            b.I = result[i].I;
            b.O1 = result[i].O1;
            b.O2 = result[i].O2;
            b.SC = result[i].SC;
            c.push(b);
        }        
    }

    result = c;
    console.log(result);
}

function showGames() {
    rootElement.innerHTML = '';
    for (let i = 0; i < result.length; i++) {
        let str = '';
        let elem = document.createElement('div');
        elem.classList.add('game-elem');
        str += `${result[i].I} <br> ${result[i].O1} - ${result[i].O2} <br> ${(result[i].E[0] < result[i].E[1]) ? "П1" : "П2"} <br> 1-я партия <br><br> ${result[i].E[0]} - ${result[i].E[1]}  ||  ${result[i].SC.CPS}`;
        elem.innerHTML = str;
        rootElement.append(elem);
    }
}

setTimeout(() => {
    dataHundler();
    showGames()
}, 2000);
