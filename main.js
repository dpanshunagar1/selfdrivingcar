
const canvas= document.getElementById("myCanvas");
canvas.width=200;


const ctx = canvas.getContext("2d");
const road= new Road(canvas.width/2,canvas.width*0.9);
const cars=generateCar(1);
let bestCar=cars[0];
let mutatev= 0.1;

if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++)
    {
        cars[i].brain=JSON.parse(localStorage.getItem("bestBrain"));
        if(i!=0){
            neuralNetwork.mutate(cars[i].brain,mutatev);
        }
    }
};

const traffic=[
    (new Car(road.getLaneCenter(1),-200,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(2),-420,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(1),-400,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(1),-600,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(0),-620,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(2),-800,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(1),-800,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(0),-1000,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(1),-1000,30,50,"dummy",2)),
    (new Car(road.getLaneCenter(1),-1200,30,50,"dummy",2)),
];


function generateCar(n){
    const cars=[];
    for (let i=0;i<n;i++)
    {
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI",3));
    }
    return cars;
}

animate ();



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
