export const sortArray = (theArray:Array<Object>, sortBy:string) => {
  (theArray||[]).sort((a,b)=>{
    let lowerString = (x) =>{
      return (sortBy?x[sortBy]||'':x.toString()).toLowerCase();
    }
    if(lowerString(a) < lowerString(b)){return -1}
    else if(lowerString(a) > lowerString(b)){return 1}
    else{return 0}
  });
}
export const sortArrayNumber = (theArray:Array<Object>, sortBy:string) => {
  (theArray||[]).sort((a,b)=>{
    let comparedVar = (x) =>{
      return sortBy?x[sortBy]:x;
    }
    if(comparedVar(a) < comparedVar(b)){return -1}
    else if(comparedVar(a) > comparedVar(b)){return 1}
    else{return 0}
  });
}
export const scrollToTop = () => {
  document.getElementsByClassName('main-panel')[0].scrollTop = 0;
}
export const getIntValue = (value) => {
    return parseInt((value||'').replace(/,/g, ''))||null;
}
export const setThousand = (value: Number) => {
   return (value||'').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')||'0';
}
export const turnObjToArray = (theObject: object) => {
    let theArray = [];
    Object.keys(theObject).forEach(
        key => {
            theArray.push({
                key,
                value: theObject[key] 
            })
        }
    )
    return theArray;
}
export const parsingArrayToObj = (theArray: Array<any>) => {
    let theObject = {}
    theArray.forEach(
        obj => {
            theObject[obj.key] = obj.value
        }
    )
    return theObject
}