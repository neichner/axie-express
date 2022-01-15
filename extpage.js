function filterLink() {
  var checkedItems = document.getElementsByClassName('part-checkbox');
  var classCheckbox = document.getElementsByClassName('class-checkbox')[0];
  var customCheckbox = document.getElementsByClassName('custom-checkbox');
  let link = 'https://marketplace.axieinfinity.com/axie/?';
  let parts = [];
  for(let i = 0; i < checkedItems.length; i++) {
    let checkedItem = checkedItems[i];
    if(!checkedItem.checked)
      continue;
    let partName = checkedItem.id.toLowerCase();
    let type = getPartType(i);
    parts.push('part=' + type + '-' + partName);
  }
  for(let i = 0; i < customCheckbox.length; i++) {
    let checkedItem = customCheckbox[i];
    if(!checkedItem.checked)
      continue;
    let sp = checkedItem.id.split('-');
    parts.push(sp[0] + '=' + sp[1] + '&' + sp[0] + '=61');
  }

  if(classCheckbox.checked)
    link += 'class=' + classCheckbox.id + '&';
  link += parts.join('&');
  if(parts.length > 0)
    link += '&';
  link += 'auctionTypes=Sale';
  window.location.href = link;
}

function getPartType(i) {
  switch(i) {
    case 0:
    return "eyes";
    case 1:
    return "back";
    case 2:
    return "horn";
    case 3:
    return "ears";
    case 4:
    return "mouth";
    case 5:
    return "tail";
  }
}

function createCheckbox(id, className, title) {
  const div = document.createElement('div');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  div.style.display = 'inline-block';
  div.style.marginLeft = '10px';
  span.style.marginLeft = '10px';
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.className = className;
  span.innerText = title;
  div.appendChild(checkbox);
  div.appendChild(span);
  return div;
}

function faFilterShowWindow() {
  let bodyParts = [];
  const leftRowBodyParts = document.getElementsByClassName('flex-shrink-0 w-1/2 flex items-center mr-4');
  const rightRowBodyParts = document.getElementsByClassName('flex-shrink-0 w-1/2 flex items-center ml-4');
  const axieClass = document.getElementsByClassName('ml-4 capitalize')[0].innerText;
  const axieHealth = document.getElementsByClassName('ml-8 text-20 leading-24')[0].innerText;
  const axieSpeed = document.getElementsByClassName('ml-8 text-20 leading-24')[1].innerText;
  const axieSkill = document.getElementsByClassName('ml-8 text-20 leading-24')[2].innerText;
  const axieMorale = document.getElementsByClassName('ml-8 text-20 leading-24')[3].innerText;
  bodyParts = [...leftRowBodyParts, ...rightRowBodyParts];
  const parentDiv = document.createElement('div');
  parentDiv.className = 'py-20 px-24 sm:px-32 sm:py-28 bg-color-gray-4 border border-gray-3 bg-gray-4 rounded-12';
  const title = document.createElement('h4');
  title.innerText = 'Marketplace search';
  const partTitle = document.createElement('h5');
  partTitle.innerText = 'Body parts:';
  parentDiv.appendChild(title);
  parentDiv.appendChild(partTitle);
  for(let i = 0; i < bodyParts.length; i++) {
    const bodyPart = bodyParts[i];
    const partName = bodyPart.children[0].children[1].children[0].innerHTML;
    
    const childDiv = document.createElement('div');
    childDiv.style.display = 'inline-block';
    childDiv.style.marginLeft = '10px';
    const span = document.createElement('span');
    span.style.marginLeft = "10px";
    span.innerHTML = partName;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if(i != 0 && i != 3)
      checkbox.checked = true;
    checkbox.id = partName.replace(' ', '-');
    checkbox.className = 'part-checkbox';
    childDiv.appendChild(checkbox);
    childDiv.appendChild(span);
    parentDiv.appendChild(childDiv)
  }

  const customTitle = document.createElement("h5");
  customTitle.innerText = "Extra filters";
  parentDiv.appendChild(customTitle);
  const classCheckbox = createCheckbox(axieClass, 'class-checkbox', axieClass);
  const healthCheckbox = createCheckbox('health-' + axieHealth, 'custom-checkbox', '(' + axieHealth + ') Health');
  const speedCheckbox = createCheckbox('speed-' + axieSpeed, 'custom-checkbox', '(' + axieSpeed + ') Speed');
  const skillCheckbox = createCheckbox('skill-' + axieSkill, 'custom-checkbox', '(' + axieSkill + ') Skill');
  const moraleCheckbox = createCheckbox('morale-' + axieMorale, 'custom-checkbox', '(' + axieMorale + ') Morale');
 
  parentDiv.appendChild(classCheckbox);
  parentDiv.appendChild(healthCheckbox);
  parentDiv.appendChild(speedCheckbox);
  parentDiv.appendChild(skillCheckbox);
  parentDiv.appendChild(moraleCheckbox);

  const buttonDiv = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'px-20 py-8 relative rounded transition border text-white border-danger-4 bg-danger-4';
  button.innerText = "Filter";
  button.onclick = filterLink;
  buttonDiv.appendChild(button);
  parentDiv.appendChild(buttonDiv);
  showPopup(document.getElementById('filter-axies'), parentDiv, 400, 400);
}

function showPopup(el, content, height, width) {
  const popups = document.getElementsByClassName("filter-popup");
  const alreadyExists = popups.length > 0;
  for(let i = 0; i < popups.length; i++) {
    document.body.removeChild(popups[i]);
  }
  if(alreadyExists) return;

  let nDiv = document.createElement("div");
  nDiv.className = "filter-popup";
  nDiv.style.position = "absolute";
  nDiv.appendChild(content);
  document.body.appendChild(nDiv);

  var parentXPos = el.offsetParent.offsetLeft;
  var parentYPos = el.offsetParent.offsetTop;

  // Get scoll position of the window to compensate the position for the popup
  var scrollX = window.pageXOffset;
  var scrollY = window.pageYOffset;

  var xpos = el.offsetLeft + parentXPos - scrollX;
  xpos = xpos + 10;

  var ypos = el.offsetTop + parentYPos - scrollY;
  ypos = ypos + 65;



  // Recalculate the position if the popup is out of the windows, make it display under the element
  if (ypos < 0) {
      // You decide the js function to fetch the height value of the button, I defined it as 26 by checking the height value in browser
      var buttonHeight = 26;
      var offsetToMoveThePopupLower = 20; 
      ypos += height + buttonHeight + offsetToMoveThePopupLower;
  }



  nDiv.style.top = ypos + "px";
  nDiv.style.left = xpos + "px";
  nDiv.style.height = height + "px";
  nDiv.style.width = width + "px";

}

var waitForPage = setInterval(function() {

  let pageLoadTest = document.getElementsByClassName('block md:inline-block md:w-1/2 align-top');
  if(pageLoadTest.length < 2)
    return;
  clearInterval(waitForPage);
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
  link.integrity = 'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p';
  link.crossOrigin = 'anonymous';
  document.body.appendChild(link);

  let rightPage = document.getElementsByClassName('block md:inline-block md:w-1/2 align-top')[1];
  const newDiv = document.createElement('div');
  newDiv.id = 'filter-axies';
  newDiv.className = 'mt-40';
  newDiv.innerHTML = "<i class=\"fa fa-filter\"></i>";
  newDiv.onclick = faFilterShowWindow;
  rightPage.insertBefore(newDiv, rightPage.firstChild);
}, 500);
