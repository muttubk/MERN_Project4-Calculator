//when used div class="result-wrapper", have to use display.innerText
//And, when using input id="result-wrapper", have to use display.value

let display=document.getElementById('result-wrapper');

function getNumber(x){
    display.value+=x;
}

let dotCount=0;
function getDot(x){
    // if entered '.' directly, print 0.
    if((display.value=='')||('+-x/'.includes(display.value.slice(-1)))){
        display.value+='0'+x;
        dotCount++;
    }
    // if no '.' used already
    else if(dotCount==0){
        display.value+=x;
        dotCount++;
    }
}

function getOperator(x){
    // if entered '-' directly at initial
    if(display.value==''){
        if(x=='-'){
            display.value=x;
        }
    }       
    else if(display.value=='-'){
        display.value='-';
    }
    else if('+-x/'.includes(display.value.slice(-1))){
        // print '-' only if previous operator is 'x' or '/'
        if(('x/'.includes(display.value.slice(-1)))&&(x=='-')){
            display.value+=x;
        }
        // if input other than '-', & previous op is 'x' or '/', change to new op
        else if('x/'.includes(display.value.slice(-2,-1))){
            display.value=display.value.slice(0,-2);
            display.value+=x;
        }
        // not repeating operators
        display.value=display.value.slice(0,-1);
        display.value+=x;
    }
    else{ 
        display.value+=x;
    }
    dotCount=0;
}

function del(){
        if(display.value.slice(-1)=='.'){
            dotCount=0;
        }
        //replaced, '+-'.includes(display.value.slice(-1)) , with display.value.slice(-1)=='-'
        else if(('x/'.includes(display.value.slice(-2,-1)))&&(display.value.slice(-1)=='-')){
            dotCount=0;
        }
        else if('+-x/'.includes(display.value.slice(-1))){
            dotCount++;
        }
        display.value=display.value.slice(0,-1);
}

function reset(){
    display.value='';
    dotCount=0;
}


function calculate(){
    let numberStr='';
    // replacing 'x' with '*', because 'x' is invalid in eval()
    if(display.value.includes('x')){
        let part=display.value;
        numberStr=part.slice(0,part.indexOf('x'))+'*'+part.slice(part.indexOf('x')+1)
    }
    else{
        numberStr=display.value;
    }
    let result=eval(numberStr);
    if(!isNaN(result)){
        display.value=result;
    }
    else{
        display.value='';
    }
    if(result.toString().includes('.')){
        dotCount=1;
    }
    else{
        dotCount=0;
    }
}
