import { submitAction } from './js/handleSubmit'
import './style/style.scss'
import './style/fonts.scss'

//add event listener (click on button)
document.getElementById('submit').addEventListener('click', submitAction);

console.log("index.js is connected")

export {
    submitAction
}


