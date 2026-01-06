// Object 
// add function
// removed
// showw
// edit
// amount calculate

let umar = {
    ram: [],
    // add function
    addExpense(amount, cata) {
       umar.ram.push({amount,cata})
       console.log(`The added amount is ${amount} and category is ${cata}`)
       
    },
    // removed function
    remove(i) {

        let removed = umar.ram.splice(i,1)
        console.log(`The Removed amount is ${removed[0].amount} and category is ${removed[0].cata}`)
    },
    // showw function
    show(){
        let a = "Lists Are!!\n"
        umar.ram.map(s => {
            a+=`Amount : ${s.amount}\t category : ${s.cata}\n`
        })
        console.log(a)
    },
    // edit function
    edit(e,namount,ncata){
        let ed = umar.ram[e]
        if(ed){
            if(namount) ed.amount = namount
            if(ncata) ed.cata = ncata
            console.log("Index udated!!")
        }else{
            console.log("Index not found!!")
        }
    },
    // amount calculate function
    calculate(){
        let count = 0;
        umar.ram.map(c => {
          for (let key in c){
            if(key === "amount"){
                count+=c[key]
            }
          }
        })
        console.log(`The sum of amount is : ${count}`)
    }
}

umar.addExpense(222,"butterScotch")
umar.addExpense(333,"butterScotch")
// umar.remove(0)
umar.show()
umar.edit(1,444,"Venila")
umar.show()
umar.calculate()