import{
spinnerSearchEl,
spinnerJobDetailsEl

}from'../common.JS';


const renderSpinner = whichSpinner => {
    const spinnerEL= whichSpinner ==='search'? spinnerSearchEl:spinnerJobDetailsEl;
    spinnerEL.classList.toggle('spinner--visible');
}

export default renderSpinner;