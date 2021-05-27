// select all the elements in the dropdown box
export default class Select {
    constructor(element) {
        this.element = element
        this.options = getFormattedOptions(element.querySelectorAll("option"))
        this.customElement = document.createElement("div")
        this.labelElement = document.createElement("span")
        this.optionsCustomElement = document.createElement("ul")
        setupCustomElement(this)
        element.style.display = "none"
        element.after(this.customElement)
    }

    //return the selected option
    get selectedOption() {
        return this.options.find(option => option.selected)
    }

    get selectedoptionIndex() {
        return this.options.indexOf(this.selectedOption)
    }
    
    selectValue(value) {
        const newSelectedOption = this.option.find(option => {
            return option.value === value
        })
        const prevSelectedOption = this.selectedOption
        prevSelectedOption.selected =false
        prevSelectedOption.element.selected = false
        
        newSelectedOption.selected = true
        newSelectedOption.element.selected = true
        
        this.labelElement.innerText = newSelectedOption.label
        this.optionCustomElement
            .querySelector(`[data-value="${prevSelect.selectedOption.value}"]`)
        const newcustomelement = this.optionCustomElement
            .querySelector(`[data-value="${newSelectedOption.value}"]`)
        newcustomelement.classList.add('selected')
        newcustomelement.scrollIntoView({ block: "nearest" })
    }
}

function setupCustomElement(select) {
    select.customElement.classList.add("custom-select-container")
    select.customElement.tabIndex = 0;

    select.labelElement.classList.add("custom-select-value")
    select.labelElement.innerText = select.selectedOption.label
    select.customElement.append(select.labelElement)

    select.optionsCustomElement.classList.add("custom-select-options")
    select.options.forEach(option => {
        const optionElement = document.createElement("li")
        optionElement.classList.add("custom-select-option")
        optionElement.classList.toggle("selected", option.selected)
        optionElement.innerText = option.label
        optionElement.dataset.value = option.value
        select.optionsCustomElement.append(optionElement)
        selecct.customElement.addEventListener('click', () => {
            select.selectedOption.element.classList.remove("selected")
            select.se;ectValue(option.value)
            select.optionsCustomElement.classList.remove('show')
        })
    })
    select.customElement.append(select.optionsCustomElement)

    selecct.labelElement.addEventListener('click', () => {
        select.optionsCustomElement.classList.toggle("show")
    })

    select.customElement.addEventListener('blue', () => {
        select.optionsCustomElement.classList.remove("show")
    })

    let debounceTimeout
    let searchTerm = ""

    select.customElement.addEventListener('keydown', e => {
        switch (e.code) {
            case "Space":
                select.optionsCustomElement.classList.toggle("show")
                break
            case "ArrowUp": {
                const prevOption = select.options[select.selectedOptionIndex - 1]
                if (prevOption) {
                    select.selectValue(prevOption.value)
                }
                break
            }
            case "ArrowDown": {
                const prevOption = select.options[select.selectedOptionIndex + 1]
                if (prevOption) {
                    select.selectValue(prevOption.value)
                }
                break
            }
            case "Enter":
            case "Escape":
                select.optionCustomElement.classList.remove("show")
                break
            default:
                clearTimeout(debounceTimeout)
                debounceTimeout = setTimeout(() => {
                    searchTerm = ""
                }, 500)
            
                const searchedOption = select.options.find(option => {
                    option.label.toLowerCase().startsWith(searchTerm)
                })
                if (searchedOption) select.selectValue(searchedOption.value)
        }
    })
}

// convert option into objects
function getFormattedOptions(optionElements) {
    return [...optionElements].map(optionElement => {
        return {
            value: optionElement.value,
            label: optionElement.label,
            selected: optionElement.selected,
            element: optionElement,
        }
    })
}