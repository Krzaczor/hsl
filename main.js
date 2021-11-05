"use strict";

const setGradient = (prop, value) => {
    document.documentElement.style.setProperty(`--${prop}`, value);
}

const updateValue = (element, value) => {
    if ('value' in element) {
        element.value = value;
    } else {
        element.textContent = value;
    }
}

const Hue = (init = 60) => {
    const change = ({ value, dataset }) => {
        setGradient(dataset.name, value);
    }

    return {
        name: 'hue',
        value: init,
        change
    }
}

const Saturation = (init = 100) => {
    const change = ({ value, dataset }) => {
        setGradient(dataset.name, value);
    }

    return {
        name: 'saturation',
        value: init,
        change
    }
}

const Lightness = (init = 50) => {
    const change = ({ value, dataset }) => {
        setGradient(dataset.name, value);
    }

    return {
        name: 'lightness',
        value: init,
        change
    }
}

const Alpha = (init = 1) => {
    const change = ({ value, dataset }) => {
        setGradient(dataset.name, value);
    }

    return {
        name: 'alpha',
        value: init,
        change
    }
}

const tools = [
    Hue(),
    Saturation(),
    Lightness(),
    Alpha()
];

const handleChange = (elementResult, change = () => {}) => {
    return ({ target }) => {
        change(target);
        updateValue(elementResult, target.value);
    }
}

tools.forEach(tool => {
    const element = document.querySelector(`[data-name="${tool.name}"]`);
    const elementResult = document.querySelector(`[data-name="${tool.name}-value"]`);

    element.addEventListener('input', handleChange(elementResult, tool.change), false);
    updateValue(element, tool.value);
    updateValue(elementResult, tool.value);
    setGradient(tool.name, tool.value);
})
