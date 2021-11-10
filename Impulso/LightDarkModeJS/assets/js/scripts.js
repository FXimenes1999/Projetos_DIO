function changeMode(){
    changeClasses();
    changeText();
}

function changeClasses(){
    button.classList.toggle(darkModeClass);
    h2.classList.toggle(darkModeClass);
    body.classList.toggle(darkModeClass);
    footer.classList.toggle(darkModeClass);
}


function changeText(){
    const lightMode = "Light Mode";
    const darkMode = "Dark Mode";

    if(body.classList.contains(darkModeClass)){
        button.innerHTML = lightMode;
        h2.innerHTML = darkMode + " ON";
        return;
    }

    button.innerHTML = darkMode;
    h2.innerHTML = lightMode + " ON";
}

const darkModeClass = 'dark-mode';
const button = document.getElementById('mode-selector');
const h2 = document.getElementById('pag-title');
const body = document.getElementsByTagName('body')[0];
const footer = document.getElementsByTagName('footer')[0];

button.addEventListener('click', changeMode);
