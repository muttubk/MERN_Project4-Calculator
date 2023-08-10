let display=document.getElementById('result-wrapper');
let numbers=[];
let operators=[];
let i=0;

function getNumber(x){
    //!new start
    if(display.value=='' || display.value=='-'){
        i=0;
    }
    else if(('x/'.includes(display.value.slice(-2,-1)))&&(display.value.slice(-1)=='-')){
        numbers[i+1]='-';
        i++;
    }
    else if('+-x/'.includes(display.value.slice(-1))){
        i++;
    }
    //!new end
    display.value+=x;
    //!new start
    if(numbers[i]==undefined){
        numbers[i]=''+x;
    }else{
        numbers[i]+=x;
    }
    console.log(numbers, operators)
    //!new end
}

let dotCount=0;
function getDot(x){
    if((display.value=='')||('+-x/'.includes(display.value.slice(-1)))){
        display.value+='0'+x;
        dotCount++;
        // !new
        numbers[i]='0'+x;
        // !end
    }else if(display.value.slice(-1)=='.'){
        display.value=display.value;
        
    } else if(dotCount==0){
        display.value+=x;
        dotCount++;
        // !new
        numbers[i]+=x;
        // !end
    }
    console.log(numbers, operators)
}

function getOperator(x){
    if(display.value==''){
        if(x=='-'){
            display.value=x;
        }else{
            display.value='';
        }
    }else if(display.value=='-'){
        display.value='-';
    }
    else if('+-x/'.includes(display.value.slice(-1))){
        if(('x/'.includes(display.value.slice(-1)))&&(x=='-')){
            display.value+=x;
        }else if('x/'.includes(display.value.slice(-2,-1))){
            // del();
            // del() instead used below
            display.value=display.value.slice(0,-2);
            display.value+=x;
        }
        // del(); instead used below
        display.value=display.value.slice(0,-1);
        display.value+=x;
    }
    else{ 
        display.value+=x;
    }
    dotCount=0;
    //!new start
    if(operators[i]==undefined){
        operators[i]=x;
    }else if('x/'.includes(display.value.slice(-2,-1))){
        //do nothing
    }else{
        operators[i]=x;
    }
    console.log(numbers, operators)
    //!new end
}

function del(){
    if(display.value.slice(-1)=='.'){
        dotCount=0;
        // !new start
        numbers[i]=numbers[i].slice(0,-1);
        // !new end
    }
    
    //replaced, '+-'.includes(display.value.slice(-1)) , with display.value.slice(-1)=='-'
    else if(('x/'.includes(display.value.slice(-2,-1)))&&(display.value.slice(-1)=='-')){
        //!new start
        numbers[i]=numbers[i].slice(0,-1)
        //!new end
        dotCount=0;
    }
    else if('+-x/'.includes(display.value.slice(-1))){
        //!new start
        operators.splice(-1)
        numbers.splice(-1)
        i--;
        //!new end
        dotCount++;
    }
    //!new start
    else{
        numbers[i]=numbers[i].slice(0,-1)
    }
    // console.log('hey', numbers)
    // console.log('hi', operators)
    //!new end
    display.value=display.value.slice(0,-1);
    console.log(numbers, operators)
}

function reset(){
    display.value='';
    dotCount=0;
    //!new start
    numbers=[]
    operators=[]
    //!new end
}


function calculate(){
    
}


// function calculate(){
//     let numberStr='';
//     if(display.value.includes('x')){
//         let part=display.value;
//         numberStr=part.slice(0,part.indexOf('x'))+'*'+part.slice(part.indexOf('x')+1)
//     }else{
//         numberStr=display.value;
//     }
//     let result=eval(numberStr);
//     if(!isNaN(result)){
//         display.value=result;
//     }else{
//         display.value='';
//     }
//     if(result.toString().includes('.')){
//         dotCount=1;
//     }else{
//         dotCount=0;
//     }
// }
