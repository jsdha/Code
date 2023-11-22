
export let container = document.querySelector("#container") 

//function to render data on a page, data to UI connector
export function renderUser(user) {
    let item = document.createElement("div")
    item.innerHTML = `
        <div>${user.name}</div>
        <div>${user.score}</div>
        <div>${user.createdAt}</div>
    `
    container.append(item)
}

//function to get users, database to app connector
export async function getUsers() {
    let url = 'https://65429ad7ad8044116ed3a8ca.mockapi.io/score'
    let respond = await fetch(url);
    let users = await respond.json()
    return users
}