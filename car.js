class Car{
    constructor(x,y,width,height,controlType,maxSpeed=3){
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;
        this.speed=0;
        this.acceleration=0.2;
        this.maxspeed=maxSpeed;
        this.friction=0.05;
        this.angle=0;
        this.damaged=false;
        
        

        this.useBrain = controlType =="AI";

        if(controlType!="dummy")
        {
        this.sensor=new Sensor(this);
        this.brain = new neuralNetwork([this.sensor.rayCount,8,10]);
        
        }
        this.controls = new Controls(controlType);
        
}
    
    update(roadBorders,traffic){
       if(!this.damaged){
        this.#move();
       this.polygon = this.#createPolygon();
       this.damaged=this.#assesDamage(roadBorders,traffic);
       }
       if(this.sensor){
       this.sensor.update(roadBorders,traffic);
        const offsets=this.sensor.readings.map(s=>s==null?0:1-s.offset
            );
            const outputs = neuralNetwork.feedForward(offsets,this.brain);
        

        if(this.useBrain){
            this.controls.forward = outputs[0];
            this.controls.left = outputs[1];
            this.controls.right = outputs[2];
            this.controls.reverse = outputs[3];
        }
       
    }
}

    #assesDamage(roadBorders,traffic){
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true;
                console.log("hello");
            }
        }
        return false;
    }

    #createPolygon(){
        const point=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        point.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        })
        point.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        })
        point.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        })
        point.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        })
        
        return point;
    }

    #move(){

        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }
        if(this.speed>this.maxspeed){
            this.speed=this.maxspeed;
        }
        if(this.speed<-this.maxspeed/2)
        {
            this.speed=-this.maxspeed/2;
        }
        if(this.speed<0)
        {
            this.speed+=this.friction;
        }
        if(this.speed>0)
        {
        this.speed-=this.friction
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }
        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03;
            }
            if(this.controls.right){
                this.angle-=0.03;
            }
        }
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    };

    draw(ctx,color,ds=false){
        if(this.damaged){
            ctx.fillStyle="grey";
        }
        else{
            ctx.fillStyle=color;
        };
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++)
        {
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y)
        };
        ctx.fill();
        if(this.sensor && ds){
        this.sensor.draw(ctx);}
        
    };
};
