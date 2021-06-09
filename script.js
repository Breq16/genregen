/*
Basically Hollywood is stupid.
    - Mitch LaFortune, 2021
*/

let genres = []

const paste_url_input = document.getElementsByTagName("input").item(0)

async function get_genres(pastebin_id) {
    let pastebin_url = "https://pastebin-proxy.breq.workers.dev/?paste=" + pastebin_id

    let response
    response = await fetch(pastebin_url)

    if (response.status != 200) {
        return false
    }

    const data = await response.text()

    genres = data.split("\n")
    return true
}

async function handle_genre_change() {
    const value = paste_url_input.value

    const pastebin_url_regex = /^https:\/\/pastebin\.com\/(\w*)$/

    const match = value.match(pastebin_url_regex)

    if (match) {
        if (await get_genres(match[1])) {
            paste_url_input.classList.remove("invalid")

            localStorage.setItem("pastebin_id", match[1])
        } else {
            paste_url_input.classList.add("invalid")
        }
    } else {
        paste_url_input.classList.add("invalid")
    }
}

let pastebin_id = localStorage.getItem("pastebin_id")
if (pastebin_id === null) {
    pastebin_id = "e3XYnWhT"
}
paste_url_input.value = "https://pastebin.com/" + pastebin_id

handle_genre_change()
paste_url_input.addEventListener("input", handle_genre_change)


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
    if (e.target.tagName.toLowerCase() === "input") {
        return
    }

    generate()
    populate()
})

document.addEventListener("keydown", (e) => {
    if (e.target.tagName.toLowerCase() === "input") {
        return
    }

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