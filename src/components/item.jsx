import React from "react";

export const Item  = ({title, handler}) =>
  (
<li onClick= {handler} className='item'>{ title }</li>
);