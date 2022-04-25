class Storage{
    constructor(name, storage='local', defaultValue=null) {
        this.name = name
        this.storage = storage
        this.set(defaultValue)
    }

    get(){
        if (this.storage === 'local'){
            return JSON.parse(localStorage.getItem(this.name))
        } else if (this.storage === 'session'){
            return JSON.parse(sessionStorage.getItem(this.name))
        } else{
            alert('Error')
        }
    }

    set(value){
        if (this.storage === 'local'){
            localStorage.setItem(this.name, JSON.stringify(value))
        } else if (this.storage === 'session'){
            sessionStorage.setItem(this.name, JSON.stringify(value))
        } else{
            alert('Error')
        }
    }

    clear(){
        this.set(null)
    }

    isEmpty(){
        return !this.get()
    }
}

const names = new Storage('names');
console.log(names.get()) //null

names.set('new value')
console.log(names.get()) //new value

names.clear()
console.log(names.get()) //null

console.log(names.isEmpty()) //true
