const img = document.getElementById("img");
const card = document.getElementById("card");

const startBtn = document.getElementById("startBtn");
const music = document.getElementById("music");

const textBox = document.getElementById("textBox");
const tapHint = document.getElementById("tapHint");

const kitabWrapper = document.getElementById("kitabWrapper");



/* =====================
   YAZILAR
===================== */


const texts=[

  "🎉 Əziz Xəyalə Xala, doğum gününüz mübarək olsun! 🎂✨",
  "Adınız kimi həyatınız da gözəl xəyallar, xoş arzular və unudulmaz anlarla dolu olsun 🌸",
  "Qəlbinizdəki sevinc heç vaxt azalmasın, üzünüzdən təbəssüm, həyatınızdan bərəkət əskik olmasın 💖",
  "Siz ailəmizə istilik və sevgi bəxş edən, dəyəri sözlərlə ifadə olunmayan gözəl bir insansınız 🌹",
  "Yeni yaşınız sizə sağlamlıq, uzun ömür, huzur və saysız-hesabsız xoşbəxt günlər gətirsin ✨",
  "İndi telefonu yüngülcə silkələyin 😄🎁",
  "Pastanı gördünüzsə, yenə silkələyin... çünki sizi daha gözəl bir sürpriz gözləyir 🎂🎀",
  "Ürəyinizə toxunun və arzularınızın gerçəkləşməsini diləyin ❤️",
  "Happy Birthday, Xəyalə Xala! 🎉💐",
 "🎁 İndi isə ən xüsusi an gəldi... hədiyyənizi görmək üçün ona toxunun ✨"


];


let textIndex=0;



function showText(){


if(textIndex>=texts.length)
return;


textBox.style.opacity=0;


setTimeout(()=>{


textBox.innerText=texts[textIndex];


textBox.style.opacity=1;


textIndex++;


setTimeout(showText,4000);


},500);


}






/* =====================
   AVATAR DƏYİŞMƏ
===================== */


const avatars=[

"ftpxs.png",

"ftpxs1.png",

"ftpxs2.png"

];


let avatarIndex=0;



function confettiEffect(){


if(typeof confetti==="function"){

confetti({

particleCount:120,

spread:100,

origin:{
y:.5
}

});

}

}







/* =====================
   SENSOR
===================== */


let lastX;
let lastY;
let lastZ;

let lastShake=0;



function startSensors(){


startBtn.style.display="none";


showText();




window.addEventListener(
"deviceorientation",
(e)=>{


if(e.beta===null)
return;


card.style.transform=`

rotateX(${e.beta/5}deg)

rotateY(${e.gamma/5}deg)

`;


});







window.addEventListener(
"devicemotion",
(e)=>{


let a=e.accelerationIncludingGravity;


if(!a)
return;



if(lastX===undefined){

lastX=a.x;
lastY=a.y;
lastZ=a.z;

return;

}



let power=

Math.abs(a.x-lastX)+

Math.abs(a.y-lastY)+

Math.abs(a.z-lastZ);



if(power>18 && Date.now()-lastShake>1500){


lastShake=Date.now();


confettiEffect();



avatarIndex++;


if(avatarIndex>=avatars.length)

avatarIndex=0;



img.src=avatars[avatarIndex];



if(img.src.includes("ftpxs2.png")){


tapHint.style.opacity="1";


}else{


tapHint.style.opacity="0";


}



}




lastX=a.x;
lastY=a.y;
lastZ=a.z;



});


}






/* =====================
 START BUTTON
===================== */


startBtn.addEventListener(
"click",
async()=>{


try{

await music.play();

}catch(e){}



try{


if(
typeof DeviceMotionEvent.requestPermission==="function"
){

await DeviceMotionEvent.requestPermission();

}



if(
typeof DeviceOrientationEvent.requestPermission==="function"
){

await DeviceOrientationEvent.requestPermission();

}


}catch(e){}



startSensors();


});







/* =====================
 KITAB AÇILMASI
===================== */


img.addEventListener(
"click",
()=>{


if(img.src.includes("ftpxs2.png")){


kitabWrapper.style.display="flex";


card.style.zIndex="-1";


}

});







/* =====================
   KITAB VƏRƏQLƏRİ
===================== */


const book=document.getElementById("myBook");


const pages=[

document.getElementById("p1"),

document.getElementById("p2"),

document.getElementById("p3"),

document.getElementById("p4")

];



let current=1;



function openBook(){

book.style.transform="translateX(50%)";

}



function closeBook(){

book.style.transform="translateX(0%)";

}





function nextPage(){


if(current>4)
return;



switch(current){


case 1:

openBook();

pages[0].classList.add("flipped");

pages[0].style.zIndex=1;

break;



case 2:

pages[1].classList.add("flipped");

pages[1].style.zIndex=2;

break;



case 3:

pages[2].classList.add("flipped");

pages[2].style.zIndex=3;

break;



case 4:

pages[3].classList.add("flipped");

pages[3].style.zIndex=4;

break;


}



current++;


}





function prevPage(){


if(current<=1)
return;



current--;



switch(current){


case 1:

pages[0].classList.remove("flipped");

break;



case 2:

pages[1].classList.remove("flipped");

break;



case 3:

pages[2].classList.remove("flipped");

break;



case 4:

pages[3].classList.remove("flipped");

break;


}


}




/* =====================
   KİTAB KLİK
===================== */


let isSwiping=false;


book.addEventListener(
"click",
()=>{


if(!isSwiping){

nextPage();

}


});






/* =====================
   MOBİL SWIPE
===================== */


let touchStartX=0;

let touchEndX=0;



kitabWrapper.addEventListener(
"touchstart",
(e)=>{


touchStartX=e.changedTouches[0].screenX;


isSwiping=false;


},
{passive:true}

);





kitabWrapper.addEventListener(
"touchmove",
(e)=>{


let moveX=e.changedTouches[0].screenX;



if(Math.abs(moveX-touchStartX)>20){

isSwiping=true;

}


},
{passive:true}

);






kitabWrapper.addEventListener(
"touchend",
(e)=>{


touchEndX=e.changedTouches[0].screenX;



let distance=touchEndX-touchStartX;



// sola sürüşdür

if(distance < -50){

nextPage();

}



// sağa sürüşdür

if(distance > 50){

prevPage();

}


});
