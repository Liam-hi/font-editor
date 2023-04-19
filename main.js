document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak')
        event.preventDefault()
    }
})

document.getElementById('letter-spacing').value = 0;
document.getElementById('font-size').value = 82;
document.getElementById('line-height').value = 1;


var i = -1;
function toggleIcon() {
    i++;
    if (i == 0) {
        document.getElementById('edit').innerHTML = "";
        document.getElementById('edit').innerHTML = "<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 19.0312L19.0312 0.999997' stroke='var(--color)' stroke-width='2'/><path d='M1 1L19.0312 19.0312' stroke='var(--color)' stroke-width='2'/></svg>";
    }
    else if (i == 1) {
        document.getElementById('edit').innerHTML = "";
        document.getElementById('edit').innerHTML = "<svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 4H25.5' stroke='var(--color)' stroke-width='2'/><circle cx='5' cy='4' r='4' fill='var(--color)'/><circle cx='5' cy='4' r='2' fill='var(--edit)'/><path d='M0 13H25.5' stroke='var(--color)' stroke-width='2'/><circle cx='13' cy='13' r='4' fill='var(--color)'/><circle cx='13' cy='13' r='2' fill='var(--edit)'/><path d='M0 22H25.5' stroke='var(--color)' stroke-width='2'/><circle cx='20' cy='22' r='4' fill='var(--color)'/><circle cx='20' cy='22' r='2' fill='var(--edit)'/></svg>";
        i = -1;
    }
}

var tl = gsap.timeline();

tl.to("#editable", {
    height: "50%",
    ease: "Power4. easeOut",
}, "start");

tl.to("#controller", {
    top: "50vh",
    opacity: 1,
    ease: "Power4. easeOut",
}, "start");

tl.to("#edit", {
    top: "calc(50vh - 58px)",
}, "start");

tl.reverse();

function menu() {
    tl.reversed(!tl.reversed());
}

document.getElementById("edit").addEventListener("click", menu);

let letterSpacing = document.getElementById('letter-spacing');
letterSpacing.addEventListener('input', function () {
    document.getElementById('editable').style.letterSpacing = letterSpacing.value + "px";
}, false);

let lineHeight = document.getElementById('line-height');
lineHeight.addEventListener('input', function () {
    document.getElementById('editable').style.lineHeight = lineHeight.value;
}, false);

let fontSize = document.getElementById('font-size');
fontSize.addEventListener('input', function () {
    document.getElementById('editable').style.fontSize = fontSize.value + "px";
}, false);



function f() {
    const alpha = event.alpha;
    const beta = Math.abs(event.beta);

    // debugging purposes only:
    /*         document.getElementById("hej").innerHTML = Math.round(alpha); 
            document.getElementById("hej2").innerHTML =  Math.round((beta / 180) * 100);
    
            document.getElementById("hej3").innerHTML =  (180 + Math.round((alpha / 360) * 100 * 3.6 )) % 360; 
            document.getElementById("hej4").innerHTML =  (50 + Math.round((beta/ 180) * 100)) % 100;  */

    var bgHue = Math.round(alpha);
    var bgLightness = Math.round((beta / 180) * 100);
    var colorHue = (180 + Math.round((alpha / 360) * 100 * 3.6)) % 360;
    var colorLightness = (50 + Math.round((beta / 180) * 100)) % 100;
    var colorTri = (220 + Math.round((alpha / 360) * 100 * 3.6)) % 360;


    document.documentElement.style.setProperty("--color", `hsl(${colorHue}, 100%, ${colorLightness}%)`);
    document.documentElement.style.setProperty("--bg", `hsl(${bgHue}, 100%, ${bgLightness}%)`);
    document.documentElement.style.setProperty("--edit", `hsl(${bgHue}, 100%, ${bgLightness}%)`);
    document.documentElement.style.setProperty("--border-color", `hsl(${colorTri}, 100%, ${colorLightness}%)`);
    document.documentElement.style.setProperty("--slider-thumb", `hsl(${colorHue}, 100%, ${colorLightness}%)`);

}

function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('deviceorientation', f)
            }
        })
        .catch(console.error)
}

document.getElementById("req").addEventListener("click", requestOrientationPermission);

function removeHandler() {
    console.log('fire');
    window.removeEventListener('deviceorientation', f);
    document.documentElement.style.setProperty("--color", `#000`);
    document.documentElement.style.setProperty("--bg", `#cecece`);
    document.documentElement.style.setProperty("--border-color", `#000`);
    document.documentElement.style.setProperty("--slider-thumb", `#cecece`);
    document.documentElement.style.setProperty("--edit", `#c8fe84;`);

}