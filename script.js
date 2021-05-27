import Select from "./select.js"

// select all the elements in the drop down box
const selectElements = document.querySelectorAll("[data-custom]")

selectElements.forEach(selectElement => {
    new Select(selectElement)
})


