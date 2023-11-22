//closures
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
function generateShoppings(){
    let shoppings = {}

    return function (product, amount) {
        if(!(product in shoppings)){
            shoppings[product] = 0
        }
        shoppings[product]+=amount
        console.log(shoppings)
        return shoppings[product]
    }
}


let incrementAmountJohn = generateShoppings()

incrementAmountJohn('nuts', 2)//2
incrementAmountJohn('tomatoe', 2)//2
incrementAmountJohn('tomatoe', 4)//2
incrementAmountJohn('bananas', 3)//
incrementAmountJohn('bananas', 1)//
let shoppings = incrementAmountJohn('nuts',5)//7
console.log(shoppings)//7

let incrementAmountAndrew = generateShoppings() 
incrementAmountAndrew('bread', 2)//2