const circles = TColor.querySelectorAll('.circle');
const screen = TColor.querySelector('.screen');
const rgbValue = TColor.querySelector('.rgb .value');
const hslValue = TColor.querySelector('.hsl .value');
const hexValue = TColor.querySelector('.hex .value');

let fontColorCurrent = screen.style.color;
let textCurrent = screen.innerText;
let rgbCurrent = [255, 255, 255];
let hslCurrent = [0, 0, 100];
let hexCurrent = '#ffffff';

rgbValue.innerText = rgbCurrent.map(x => x.toString().padStart(3,' ')).join(',');
hslValue.innerText = hslCurrent.map(x => x.toString().padStart(3,' ')).join(',');
hexValue.innerText = hexCurrent;

function fontColor(rgb) {
    const luma = (0.212 * rgb[0] + 0.701 * rgb[1] + 0.087 * rgb[2]) / 255;
    return luma > 0.6 ? 'black' : 'white';
}

circles.forEach(circle => {
    const l = circle.parentElement.parentElement.getAttribute('lightness');
    const s = circle.parentElement.getAttribute('saturation');
    const c = circle.getAttribute('number');

    const rgb = circle.style.backgroundColor.match(/\d+/g).map(Number);
    const hsl = [hue(l,s,c), saturation(l,s), lightness(l,s)];
    const hex = '#' + rgb.map(x => x.toString(16).padStart(2,'0')).join('');

    circle.addEventListener('mouseenter', () => {
        screen.style.backgroundColor = circle.style.backgroundColor;
        screen.style.color = fontColor(rgb);
        screen.innerText = colorName(l,s,c);
        rgbValue.innerText = rgb.map(x => x.toString().padStart(3,' ')).join(',');
        hslValue.innerText = hsl.map(x => x.toString().padStart(3,' ')).join(',');
        hexValue.innerText = hex;
    });
    circle.addEventListener('mouseleave', () => {
        screen.style.backgroundColor = 'rgb(' + rgbCurrent.join(',') + ')';
        screen.style.color = fontColorCurrent;
        screen.innerText = textCurrent;
        rgbValue.innerText = rgbCurrent.map(x => x.toString().padStart(3,' ')).join(',');
        hslValue.innerText = hslCurrent.map(x => x.toString().padStart(3,' ')).join(',');
        hexValue.innerText = hexCurrent;
    });
});

layers.forEach(layer => {
    layer.addEventListener('click', (e) => {
        if (e.target.matches('.circle')) {
            const l = e.target.parentElement.parentElement.getAttribute('lightness');
            const s = e.target.parentElement.getAttribute('saturation');
            const c = e.target.getAttribute('number');
            const rgb = e.target.style.backgroundColor.match(/\d+/g).map(Number);
            const hsl = [hue(l,s,c), saturation(l,s), lightness(l,s)];

            backgroundCurrent = 'rgb(' + rgb.join(',') + ')';
            fontColorCurrent = fontColor(rgb);
            textCurrent = colorName(l,s,c);
            rgbCurrent = rgb;
            hslCurrent = hsl;
            hexCurrent = '#' + rgb.map(x => x.toString(16).padStart(2,'0')).join('');

            navigator.clipboard.writeText(textCurrent);
            document.documentElement.style.setProperty("--accent", "rgb(" + rgb.join(',') + ")");
        }
    });
});