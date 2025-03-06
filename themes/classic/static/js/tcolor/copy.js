const rgbTag = TColor.querySelector('.rgb .tag');
const hslTag = TColor.querySelector('.hsl .tag');
const hexTag = TColor.querySelector('.hex .tag');

const interface = TColor.querySelector('.interface');

interface.addEventListener('click', (e) => {
    if (e.target.matches('.rgb .tag')) {
        navigator.clipboard.writeText(`${rgbCurrent[0]},${rgbCurrent[1]},${rgbCurrent[2]}`);
    } else if (e.target.matches('.hsl .tag')) {
        navigator.clipboard.writeText(`${hslCurrent[0]},${hslCurrent[1]},${hslCurrent[2]}`);
    } else if (e.target.matches('.hex .tag')) {
        navigator.clipboard.writeText(hexCurrent);
    } else if (e.target.matches('.screen')) {
        navigator.clipboard.writeText(textCurrent);
    }
});
