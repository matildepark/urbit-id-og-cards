import { sigil, reactRenderer } from "@tlon/sigil-js";
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const sigilString = ( patp: string, size: number) => {
   return ReactDOMServer.renderToStaticMarkup(
     <div style={{ borderRadius: "0.75rem", overflow: "hidden"}}>
     {sigil({
         patp: patp,
         renderer: reactRenderer,
         size: size,
         colors: ["#24201E", "white"],
       })}
       </div>
       )
};

 export default sigilString;