//when used div class="result-wrapper", have to use display.innerText
//And, when using input id="result-wrapper", have to use display.value

let display=document.getElementById('result-wrapper');
let dotCount=0; //to maintain valid '.' repeataions

display.addEventListener('focus', function(){
    display.value="";
})

function getNumber(x){
    if(display.value=='0'){
        display.value="";
    }
    //appending the input to result container
    display.value+=x;
}

function getDot(x){
    if(dotCount==0){
        display.value+=x;
        dotCount=1;
        console.log(display.value)
    }
}

function getOperator(x){
    let newValue=display.value;
    if((newValue==0)&&(x=='-')){
        display.value=x;
    } else if(newValue=='-'){
        display.value='-';
    }
    else if(newValue!='0'){
        // ! new added
        if('x/'.includes(newValue.slice(-1))){
            if(x=='-'){
                display.value+=x;
            }
        }
        //restrict repeatition of the operator
        if('+-x/'.includes(newValue.slice(-1))){
            //!new added
            if('x/'.includes(newValue.slice(-2,-1))){
                if(x=='-'){
                    display.innerText+=x;
                }
                else{
                    del();
                }
            }
            //!till here
            del();
            display.value+=x;
        }
        //if there is no operator already, append it
        else{
        display.value+=x;
        }
        dotCount=0;
    }
}

function del(){
    let newValue=display.value;
    //removing last element from result container
    display.value=newValue.slice(0,-1);
    //if the result container becomes empty, set default 0
    if(display.value==''){
        display.value=0;
    }

    if((newValue.slice(-1))=='.'){
        dotCount=0;
    }
}

function reset(){
    //remove complete content and set default 0 to result container
    display.value=0;
    dotCount=0;
}

function calculate(){
    let str=display.value;
    let number='';
    //since 'x' is not valid for 'eval()', replacing 'x' with '*'
    if(str.includes('x')){
        number=str.slice(0,str.indexOf('x'))+'*'+str.slice(str.indexOf('x')+1);
    }else{
        number=str;
    }
    //final calculation
    let result=eval(number)
    if(isNaN(result)){
        display.value='';
    }else{
        display.value=result;
    }
    operatorCount=0;
    if((result.toString()).includes('.')){
        dotCount=1;
        // console.log('hello')
    }
}