class Controls{
    constructor(type){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse  = false;
        this.front = 500;
        
        switch (type){
            case "keys":
                this.#addKeyboardListeners();
                break;
            case "dummy":
                this.forward=true;
                break;
        }

        this.spawnTraffic();
        
    }


    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
        switch(event.key){
            case "a":
                this.left=true;
                break;
            case "d":
                this.right=true;
                break;
            case "w":
                this.forward=true;
                break;
            case "s":
                this.reverse=true;
                break;
            
        }
        
        
    };


    
    document.onkeyup=(event)=>{
        switch(event.key){
            case "a":
                this.left=false;
                break;
            case "d":
                this.right=false;
                break;
            case "w":
                this.forward=false;
                break;
            case "s":
                this.reverse=false;
                break;
        }
        
    }
    
  }


  spawnTraffic(){
    document.onkeydown=(event)=>{
        switch(event.key){

        case "d":
            this.front = prompt(); 
            break;
        case "0":
            traffic.push(new Car(road.getLaneCenter(0),bestCar.y-this.front,30,50,"dummy",2));
            break;
        case "1":
            traffic.push(new Car(road.getLaneCenter(1),bestCar.y-this.front,30,50,"dummy",2));
            break;
        case "2":
            traffic.push(new Car(road.getLaneCenter(2),bestCar.y-this.front,30,50,"dummy",2));
            break;
        }
    }
}
};