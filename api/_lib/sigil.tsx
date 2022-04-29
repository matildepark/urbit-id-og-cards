import { sigil, reactRenderer } from "@tlon/sigil-js";
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const foregroundFromBackground = (background) => {
  const rgb = {
    r: parseInt(background.slice(1, 3), 16),
    g: parseInt(background.slice(3, 5), 16),
    b: parseInt(background.slice(5, 7), 16),
  };
  const brightness = (299 * rgb.r + 587 * rgb.g + 114 * rgb.b) / 1000;
  const whiteBrightness = 255;

  return whiteBrightness - brightness < 50 ? "black" : "white";
};


const sigilString = ( patp: string, size: number, color: string = "#24201E") => {
  const foreground = foregroundFromBackground(color);

   return ReactDOMServer.renderToStaticMarkup(
     <div style={{ borderRadius: "0.75rem", overflow: "hidden"}}>
     {sigil({
         patp: patp,
         renderer: reactRenderer,
         size: size,
         colors: [color, foreground],
       })}
       </div>
       )
};

 export default sigilString;