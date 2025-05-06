const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

require ('dbconfig.php')

// Cards
fetch("project1data.php")
.then(res => res.json())
.then(data => {
    users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const body = card.querySelector("[data-body]")
        body.textContent = `Age Data: ${user.age}, Gender Data: ${user.gender}, PHP Version Data: ${user.version}, Favorite thing about PHP: ${user.favorite}, Salty Spitoon Data: ${user.salty}`
        userCardContainer.append(card)
        return { age: user.age, gender: user.gender, version: user.version, favorite: user.favorite, salty: user.salty, element: card }
    })
})
  
// Search functionality
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
      const isVisible =
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
      user.element.classList.toggle("hide", !isVisible)
    })
})
