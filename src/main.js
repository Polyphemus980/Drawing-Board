const gridContainer=document.querySelector("#gridContainer");
const gridButton=document.querySelector("#sizeButton");
const gridText=document.querySelector("#sizeText");
const randomColorButton=document.querySelector("#randomColor");
const oneColorButton=document.querySelector("#oneColor");
const colorPicker=document.querySelector("#colorPicker");
const opacityButton=document.querySelector("#opacity");
const clearButton=document.querySelector("#clear");
const hoverDrawButton=document.querySelector("#hoverDraw");
const clickDrawButton=document.querySelector("#clickDraw");
const eraserButton=document.querySelector("#eraser");
const fillButton=document.querySelector("#fill");
const moveDraw=document.querySelector("#clickMoveDraw");
oneColorButton.style.backgroundColor='lightpink';
randomColorButton.style.backgroundColor='green';
randomColorButton.disabled=true;
hoverDrawButton.disabled=true;
let useRandomColor=true;
let userColor=colorPicker.value;
let opacity=false;
let isEraser=false;

function drawTarget(event){
    draw(event.target);
}
function fillGrid(rowSize){
    let borderWidth=+getComputedStyle(gridContainer).borderTopWidth.slice(0, -2);
    let width=(gridContainer.offsetWidth-2*borderWidth)/rowSize;
    for (let i=0;i<rowSize;i++){
        for (let i=0;i<rowSize;i++){
            gridContainer.appendChild(createDiv(width));
        }
    }
}
function getColor(){
    if (useRandomColor){
        const R=Math.random()*256;
        const G=Math.random()*256;
        const B=Math.random()*256;
        return `rgb(${R}, ${G}, ${B})`;
    }
    return userColor;
}
function opacityHover(targetDiv,color){
    if (!targetDiv.classList.contains("selected")){
        targetDiv.style.backgroundColor=color;
        targetDiv.classList.add("selected");
        targetDiv.style.opacity="0.1";
        return;
    }
    let prevOpacity=Number.parseFloat(targetDiv.style.opacity);
    targetDiv.style.opacity=`${prevOpacity+0.1}`;
}
function erase(targetDiv){
    targetDiv.style.backgroundColor='white';
    targetDiv.classList.remove("selected");
    targetDiv.style.opacity='1';
}
function draw(targetDiv){

    if (isEraser){
       erase(targetDiv);
        return;
    }
    const color=getColor();
    if (opacity === true){
        opacityHover(targetDiv,color);
        return;
    }
    targetDiv.classList.add("selected");
    targetDiv.style.opacity='1';
    targetDiv.style.backgroundColor=color;
}


function createDiv(sideLength){
    let div=document.createElement("div");
    div.style.boxSizing = 'border-box';
    div.style.width = sideLength+ 'px';
    div.style.height = sideLength + 'px';
    div.style.border='2px solid black'
    div.addEventListener("mouseover",drawTarget);
    return div;
}
function clearGrid(){
    while (gridContainer.firstChild)
    {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}
gridButton.addEventListener("click",()=>{
    const rowSize=Number.parseInt(gridText.value);
    gridText.value='';
    if (isNaN(rowSize)){
        alert('number of boxes must be an integer');
        return;
    }
    if (rowSize > 64 || rowSize < 1) {
        alert('row size must be greater than 0 and less than 65')
        return;
    }
    clearGrid();
    fillGrid(rowSize);
})
fillButton.addEventListener("click",(event)=>{
    let children=Array.from(gridContainer.children);
    children.forEach((child)=>{
        if (!child.classList.contains("selected"))
            draw(child);
        }
    )
})

hoverDrawButton.addEventListener("click",()=>{
    let children=Array.from(gridContainer.children);
    children.forEach((child)=>child.removeEventListener("mousedown",drawTarget));
    children.forEach((child)=>child.addEventListener("mouseover",drawTarget));
    hoverDrawButton.disabled = true;
    hoverDrawButton.style.backgroundColor='green';
    clickDrawButton.disabled=false;
    clickDrawButton.style.backgroundColor='lightpink';
})
clickDrawButton.addEventListener("click",(event)=>{
    let children=Array.from(gridContainer.children);
    children.forEach((child)=>child.removeEventListener("mouseover",drawTarget));
    children.forEach((child)=>child.addEventListener("mousedown",drawTarget));
    hoverDrawButton.disabled = false;
    hoverDrawButton.style.backgroundColor='lightpink';
    clickDrawButton.disabled=true;
    clickDrawButton.style.backgroundColor='green';
})

clearButton.addEventListener("click",()=>{
    let children=Array.from(gridContainer.children);
    children.forEach((child)=>{child.style.backgroundColor='white';child.style.opacity = '1';child.classList.remove("selected")});
});

eraserButton.addEventListener("click",(event)=>{
    isEraser = !isEraser;
    if (isEraser) {
        eraserButton.style.backgroundColor = 'green';
        eraserButton.disabled=true;
        oneColorButton.disabled=false;
        randomColorButton.disabled=false;
        oneColorButton.style.backgroundColor='lightpink';
        randomColorButton.style.backgroundColor='lightpink';
    }
    else {
        eraserButton.disabled=false;
        eraserButton.style.backgroundColor = 'lightpink';
    }
})
oneColorButton.addEventListener('click',(event)=>{
    oneColorButton.disabled=true;
    randomColorButton.disabled=false;
    oneColorButton.style.backgroundColor='green';
    randomColorButton.style.backgroundColor='lightpink';
    eraserButton.disabled=false;
    isEraser=false;
    eraserButton.style.backgroundColor='lightpink';
    useRandomColor=false;
})
randomColorButton.addEventListener('click',(event)=>{
    oneColorButton.disabled=false;
    isEraser=false;
    randomColorButton.disabled=true;
    eraserButton.disabled=false;
    eraserButton.style.backgroundColor='lightpink';
    oneColorButton.style.backgroundColor='lightpink';
    randomColorButton.style.backgroundColor='green';
    useRandomColor=true;
})


colorPicker.addEventListener("input",(event)=>{
    userColor=colorPicker.value;
})

opacityButton.addEventListener("click",(event)=>{
    opacity = !opacity;
    if (opacity)
        opacityButton.style.backgroundColor='green';
    else
        opacityButton.style.backgroundColor='lightpink';

})


