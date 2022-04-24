"use strict";

const hslaInputs = [...document.querySelectorAll('input[data-name]')];
const hslaParagraphs = [...document.querySelectorAll('p[data-name]')];
const docElement = document.documentElement;

class HslaColor {
    constructor(hue, saturation, lightness, alpha) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        this.alpha = alpha;
    }

    setColor(name, value) {
        if (['hue', 'saturation', 'lightness', 'alpha'].includes(name)) {
            this[name] = value;
        }
    }

    updateColorCSS(key) {
        docElement.style.setProperty(`--${key}`, this.serialize());
    }

    serialize() {
        const { hue, saturation, lightness, alpha } = this;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }
}

const hslaColor = new HslaColor(60, 100, 50, 1);
const hslaColorOpposed = new HslaColor(240, 100, 50, 1);

hslaInputs.forEach(input => {
    const { name } = input.dataset;

    input.value = hslaColor[name];
    hslaColor.updateColorCSS('color');
    hslaColorOpposed.updateColorCSS('color-opposed');

    const paragraphElement = hslaParagraphs.find(({ dataset }) => dataset.name === name);
    paragraphElement.textContent = `${hslaColor[name]}`;

    input.addEventListener('input', (event) => {
        const { value } = event.target;

        hslaColor.setColor(name, value);
        hslaColorOpposed.setColor(name, name === 'hue' ? +value + 180 : value);

        hslaColor.updateColorCSS('color');
        hslaColorOpposed.updateColorCSS('color-opposed');

        paragraphElement.textContent = `${value}`;
    });
});
