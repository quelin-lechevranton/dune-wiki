const TColor = document.querySelector('.TColor');

function rotor(l, s, c) {
    const rotorDiv = document.createElement('div');
    rotorDiv.classList.add('rotor');
    rotorDiv.setAttribute('saturation',String(s));

    const circleDiv = document.createElement('div');
    circleDiv.classList.add('circle');
    circleDiv.setAttribute('number',String(c));

    circleDiv.style.backgroundColor = 'hsl(' + hue(l,s,c) + ' ' + saturation(l,s) + ' ' + lightness(l,s) + ')';
    
    rotorDiv.appendChild(circleDiv)
    
    return rotorDiv;
}

for (let l = 1; l <= 9; l++) {
    const layerDiv = document.createElement('div');
    layerDiv.classList.add('layer');
    layerDiv.setAttribute('lightness',String(l));

    if (layersWithGrey.includes(l)) {
        layerDiv.appendChild(rotor(l,0,0));
    }
    for (let s = 1; s <= saturationNumber(l); s++) {
        for (let c = 0; c < circleNumber(l,s); c++) {
            layerDiv.appendChild(rotor(l,s,c));
        }
    }
    TColor.prepend(layerDiv);
}