let canvas = document.createElement('canvas');
canvas.id = 'GameCanvas',
canvas.width = 800,
canvas.height = 600,
canvas.style.border = "1px solid";
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');
let img = new Image();

img.onload = function(){
    startTest1();
}

img.src = "https://www.wired.com/wp-content/uploads/2015/09/google-logo-1200x630.jpg";



function startTest1(){
    console.log("Started 1!");
    let started = Date.now();
    for(let i = 0; i < 100; i++){
        ctx.drawImage(img, 0, 0);
    }
    let finished = Date.now();
    console.log('Draw from image test. Elapsed: ' + (finished-started));

    startTest2();
}

function startTest2(){
    let buffer = document.createElement('canvas');
    buffer.width = img.width;
    buffer.height = img.height;
    let ctx2 = buffer.getContext('2d');
    ctx2.drawImage(img,0,0);

    console.log("Started 2!");
    let started = Date.now();
    for(let i = 0; i < 100; i++){
        ctx.drawImage(buffer, 0, 0);
    }
    let finished = Date.now();
    console.log('Draw from canvas test. Elapsed: ' + (finished-started));
}