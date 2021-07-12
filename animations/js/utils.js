// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => {
    return {width: window.innerWidth, height: window.innerHeight};
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY)    {
        posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    }

    return { x : posx, y : posy }
};


const collectionHas = (a, b) => {
  for(var i = 0, len = a.length; i < len; i ++) {
      if(a[i] == b) return true;
  }
  return false;
}

const findParentBySelector = (elm, selector) => {
    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;
    while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
        cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
}

// var yourElm = document.getElementById("yourElm"); //div in your original code
// var selector = ".yes";
// var parent = findParentBySelector(yourElm, selector);


export { map, lerp, calcWinsize, getRandomNumber, getMousePos, findParentBySelector };
