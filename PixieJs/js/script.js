import {container, getUsers,renderUser} from './utils.js'

let users = await getUsers()
console.log(users)


let button = document.getElementById("button")
let filterButton = document.getElementById("filterButton")
let clearButton = document.getElementById("clearButton")
button.addEventListener("click", function(){
    container.innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        renderUser(user)
    }
})
filterButton.addEventListener("click", function(){
    container.innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        let userDay = user.createdAt
        let date = new Date(userDay)
        let userHours = date.getHours()
        if (userHours >= 9 && userHours <= 17) {
            let userMinutes = date.getMinutes()
            if (userMinutes <= 20) {
                renderUser(user)
            }
        }
    }
})

clearButton.addEventListener("click", function(){
    container.innerHTML = ""
})
