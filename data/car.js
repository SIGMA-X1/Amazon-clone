class Car{
    #brand;
    #model;
    speed=0;
    constructor(brand,model){
        this.#brand=brand;
        this.#model=model;
    }
    displayinfo(){
        console.log(`brand is ${this.#brand} and model is ${this.#model}`);
    }
    gospeed(){
        this.speed+=5;
    }
    carbreak(){
        if(this.speed>=5){
            this.speed=this.speed-5;
        }else{
            console.log('not possible');
        }
    }
}
const car1=new Car('Ferrari','Corolla');
console.log(car1.displayinfo());
car1.gospeed();
car1.gospeed();
console.log(car1.speed);
car1.carbreak();
console.log(car1.speed);