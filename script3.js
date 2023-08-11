//when used div class="result-wrapper", have to use display.value
//And, when using input id="result-wrapper", have to use display.value

let display=document.getElementById('result-wrapper');

display.addEventListener('focus', function(){
    display.placeholder='';
})

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
    display.placeholder='';
}

function convertToArray(a){
    // let a='-1+2/-4+33-3x-5-6+2'
    let b=Array.from(a)
    let c=[]
    let j=0;
    // console.log(b)
    for(let i=0;i<a.length;i++){
        if(i==0 && a[0]=='-'){
            c[j]='-';
        }
        else if(!('+-x/'.includes(a[i]))){
            // console.log(i)
            if(c[j]==undefined){
                c[j]='';
            }
            c[j]+=a[i];
        }else if(a[i+1]=='-'){
            j++;
            c[j]=a[i];
            j++;
            c[j]='-'
            i++;
        }else{
            j++;
            c[j]=a[i];
            j++;
        }
        // console.log(a[i])
    }
    for(let i=0;i<c.length;i+=2){
        c[i]= Number(c[i]);
    }
    console.log(c)
    return c;
}

function evaluate(expressionString){
    let expressionArray=convertToArray(expressionString);
    const operators={'+':1, '-':1, 'x':2, '/':2};
    const stack=[];
    for(const token of expressionArray){
        
        if(!isNaN(token)){
            stack.push(token)
        }else {
            while(stack.length && operators[stack[stack.length-2]]>=operators[token]){
                const op2=stack.pop();
                const oper=stack.pop();
                const op1=stack.pop();
                // console.log("Performing:", op1, oper, op2);
                if(oper==='+'){
                    stack.push(op1+op2)
                }else if(oper==='-'){
                    stack.push(op1-op2);
                }else if(oper==='x'){
                    stack.push(op1*op2);
                }else if(oper==='/'){
                    stack.push(op1/op2);
                }
            }
            stack.push(token);
        }
        // console.log(stack)
    }
    // console.log(stack)
    while(stack.length>1){
        const op2=stack.pop();
        const oper=stack.pop();
        const op1=stack.pop();
        // console.log(op1, oper, op2);
        if(oper==='+'){
            stack.push(op1+op2)
        }else if(oper==='-'){
            stack.push(op1-op2);
        }else if(oper==='x'){
            stack.push(op1*op2);
        }else if(oper==='/'){
            stack.push(op1/op2);
        }
    }
    // result=stack[0];
    return stack[0];
    
    // console.log(typeof result)
}

function calculate(){
    if(display.value.slice(-2)=='/0'){
        display.value='';
        display.placeholder='Cannot divide by 0';
    }
    else if('+-x/'.includes(display.value.slice(-1))){
        if('x/'.includes(display.value.slice(-2,-1))){
            result=evaluate(display.value.slice(0,-2))
            display.value=result;
        }else{
            result=evaluate(display.value.slice(0,-1))
        display.value=result;
        }
    }
    else{
        result=evaluate(display.value);
        display.value=result;
    }
    if(result.toString().includes('.')){
        dotCount=1;
    }
    else{
        dotCount=0;
    }
}

// 12+3x-2-5+2/-1+3
// 65+6x-3-3+12/-
// -65+6x-3-3+12/