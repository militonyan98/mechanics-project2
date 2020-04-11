var m1=10, m2=6, m3=3;
var friction1=0.2, friction2=0.3, friction3=0.4;
const g = 9.8;
var x1=0,x2=1,x3=3, y1=0,y2=5,y3=2;
var v1=0,v2=0,v3=0;
//we know 1 that horizontal acceleration of a1 = a3
//as the rope does not changed it's length a1 - a2 = a3
//we can calculate that for the system to work i.e. T = ((1+u2)*g+(1+u3)*((F+u2*(m1+m2)*g)/(m1-m3)))/(1/(m1-m3)-(m3+m2)/(m2*m3));




function applyForce(F, tDelta){
    T = ((1+friction2)*g+(1+friction3)*((F+friction2*(m1+m2)*g)/(m1-m3)))/(1/(m1-m3)-(m3+m2)/(m2*m3));
    acc1 = (F + T + (m1+m2)*g*friction1)/(m1-m2);
    acc2 = (T + m2*g*friction2)/m2;
    acc3 = (T-m3*g - m3*acc1*friction3)/m3;
    //computing velocity of the object using v = at
    v1+=acc1*tDelta;
    v2+=acc2*tDelta;
    v3+=acc3*tDelta;
    //computing positions, note that as the force is horizontal no vertical displacement for m1,m2
    x1+=v1*tDelta;
    x2+=v2*tDelta;
    x3+=v1*tDelta;
    y3+=v3*tDelta;
}

var timeStamps = [0,5,6,10,12];
var forces = [10,-20,5,6,30];
const intermediateTimePoints = 1000; //evaluate in 1000 points between two values
function solver(){
    for(var i=0; i<timeStamps.length-1;i++){
        applyForceLinearInterpolation(timeStamps[i],timeStamps[i+1],forces[i],forces[i+1]);
    }
}

function applyForceLinearInterpolation(t1,t2,f1,f2){
    let alpha = 0;
    let alphaStep = 1/1000;
    var lastTime = t1;
    while(alpha<=1){
        force = (f1)*(1-alpha)+(f2)*alpha;
        time = (t1)*(1-alpha)+(t2)*alpha;
        applyForce(f,time-lastTime);
        lastTime = time;
        alpha+=alphaStep;
        console.log("First object" + x1 + ',' + y1 + "\n");
        console.log("Second object" + x2 + ',' + y2 + "\n");
        console.log("Third object" + x3 + ',' + y3 + "\n");
    }
}


// Interesting cases are 
// 1) very small friction high force m3 jumps out :) 
// 2) very high friction small force system moves veeery slow
// 3) loop + - force m3 stays in place?????
// 4) small friction small force m3 goes down