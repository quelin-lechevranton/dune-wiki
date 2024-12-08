const slider = TColor.querySelector('.slider input');
const layers = TColor.querySelectorAll('.layer');

function displayLayer(l) {
    layers.forEach(layer => {
        const lightness = layer.getAttribute('lightness');
        if (lightness == l) {
            layer.style.display = 'inline-block';
        } else {
            layer.style.display = 'none';
        }
    });
}


const value = 10 - Math.floor(slider.value/10);
displayLayer(value);

slider.addEventListener('input', () => {
    const value = 10 - Math.floor(slider.value/10);
    displayLayer(value);
});
