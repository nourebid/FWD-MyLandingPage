// Variables
const mySections = document.querySelectorAll('section');
const myList = document.getElementById('navbarList');
const fragment = document.createDocumentFragment();
const goTopBtn = document.getElementById('goTopBtn');
// End of Variables

//Looping the sections to Build NavBar
mySections.forEach((section) => {
    //getting the text node from the data-nav
    let sectionName = section.getAttribute('data-nav');
    //create a new variable for the new Li's
    let newLi = document.createElement('li');
    //create the new Li's text node
    let textNode = document.createTextNode(sectionName);
    //Create new link tag with scrolling into view
    let link = document.createElement('a');
    link.addEventListener('click', () => {
        section.scrollIntoView({behavior: "smooth"});
    });
    
    //Append childs
    link.appendChild(textNode);
    newLi.appendChild(link);
    fragment.appendChild(newLi);
    //Adding the CSS class for the new Li's
    newLi.classList.add('li__section');
});
myList.appendChild(fragment);

//Scroll to anchor function
const scrolling = () => {
  const anchors = document.querySelectorAll('ul a');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', ()=> {
      for(i = 0; i < mySections; i++) {
        mySections[i].addEventListener('click', sectionScroll(anchor));
      };
    });
  });
};

scrolling();

//Active Class Functionality
//getting the element in viewport top value 
const view = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};
//Class Removal function
const removeClass = (section) => {
    section.classList.remove('activeSection');
};
//Class adding function
const addClass = (conditional, section) => {
    if (conditional) {
        section.classList.add('activeSection');
    };
};
//Class switching function
const activation = () => {
    mySections.forEach(section => {
        const elementView = view(section);
        inView = () => elementView < 200 && elementView >= -200;

        removeClass(section);
        addClass(inView(), section);
    });
};

//Event Listener on Scroll
window.addEventListener('scroll', activation);

//Scroll to top Btn Functionality
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
  scrollFunction();
};

const scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goTopBtn.classList.remove('goTopBtn--non');
    goTopBtn.classList.add('goTopBtn--active');
  } else {
    goTopBtn.classList.remove('goTopBtn--active');
    goTopBtn.classList.add('goTopBtn--non');
  };
};

// When the user clicks on the button, scroll to the top of the document
const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};