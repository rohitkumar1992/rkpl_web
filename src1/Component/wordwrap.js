import React from 'react';
// import LinesEllipsis from 'react-lines-ellipsis'
import { trimWords } from 'react-trim-words';
const Wordwrap =(props)=>{
  // return(props.name.replace(/^(.{5}[^\s]*).*/, "$1"));
//   return(<LinesEllipsis
// text={props.name}
// maxLine='1'
// ellipsis='...'
// trimRight
// basedOn='words'
// />)
return(trimWords(props.name, props.count, '...'))
}
export default Wordwrap;
