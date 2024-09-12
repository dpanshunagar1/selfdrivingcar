let carNumber, carBrain, mutateValue , carNetwork;

carNumber = 1; //Define the number of cars you want to train 
carBrain="AI"; //Set the controls for the car  either "keys" to use keyboard or "AI" to use neural Network
mutateValue = 0.1; //Mutate value help to make changes to the new generation based on previos generation
carNetwork =storedBrain ; // This defines the instance of cars brain whether new or already trained brain is goind to be used



const canvas= document.getElementById("myCanvas");
canvas.width=200;



const ctx = canvas.getContext("2d");
const road= new Road(canvas.width/2,canvas.width*0.9);
const cars=generateCar(carNumber);
let bestCar=cars[0];
let mutatev= mutateValue ;

if(localStorage.getItem("bestBrain")){
        for(let i=0;i<cars.length;i++)
        {
            cars[i].brain=carNetwork;
            if(i!=0){
                neuralNetwork.mutate(cars[i].brain,mutatev);
            }
        }
    }

const traffic=[];

function generateCar(n){
    const cars=[];
    for (let i=0;i<n;i++)
    {

        cars.push(new Car(road.getLaneCenter(1),-10,30,50,carBrain,3));
    }
    return cars;
}

animate ();

let bestcb = JSON.stringify(bestCar.brain);

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));   
}
function discard(){
    localStorage.removeItem("bestBrain");
}

function animate(){
    for(let i=0; i<traffic.length;i++)
    {
        traffic[i].update(road.borders,[]);
    }
    for(i=0;i<cars.length;i++){
    cars[i].update(road.borders,traffic);
    }

    bestCar=cars.find(c=>c.y==Math.min(...cars.map(c=>c.y))
    );

    canvas.height= window.innerHeight;
    ctx.save();
    ctx.translate(0,-bestCar.y+canvas.height*0.8);

    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    
    ctx.globalAlpha=0.2;
    for(i=0;i<cars.length;i++){
    cars[i].draw(ctx,"blue");
    };
    ctx.globalAlpha=1;
    bestCar.draw(ctx,"blue",true);

    ctx.restore();    
    requestAnimationFrame(animate); 

}




scoreBoard();
generateTraffic();

function generateTraffic(){ 

    traffic.push(new Car(road.getLaneCenter(getRandomArbitrary(0,3)),bestCar.y-getRandomArbitrary(600,800),30,50,"dummy",2,getRandomColor())),
    setTimeout(generateTraffic,5000);
}

function scoreBoard(){
    document.getElementById('sc').innerHTML = Math.floor(-bestCar.y/100);
    requestIdleCallback(scoreBoard);
}



