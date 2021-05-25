/*
Basically Hollywood is stupid.
    - Mitch LaFortune, 2021
*/

import { genres } from "./genres.js"

let history = []
let position_in_history = -1;

function populate() {
    let elements = Array.from(document.getElementsByTagName("h1"))

    let selection = history[position_in_history]
    elements.forEach((element, index) => {
        element.innerHTML = selection[index]
    })
}

function generate() {
    let new_genres = []
    for (let i = 0; i < 2; ++i) {
        new_genres.push(genres[genres.length * Math.random() | 0].toUpperCase())
    }

    history.push(new_genres)
    position_in_history += 1
}

document.addEventListener("click", (e) => {
    generate()
    populate()
})

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {
        generate()
    } else if (e.code === "ArrowLeft") {
        position_in_history -= 1
        if (position_in_history < 0) {
            position_in_history = 0
        }
    } else if (e.code === "ArrowRight") {
        position_in_history += 1
        if (position_in_history >= history.length) {
            position_in_history = history.length - 1
            generate()
        }
    } else {
        return
    }

    populate()
})