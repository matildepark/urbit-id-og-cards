
import { readFileSync } from 'fs';
import { ParsedRequest } from './types';
import sigilString from './sigil';
import ob from 'urbit-ob';

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/scp.woff2`).toString('base64');

function getCss(theme: string) {
    let background = 'white';
    let foreground = 'black';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Source Code Pro';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

      body {
        background: ${background};
        height: 100vh;
        width: 100vw;
        display: flex;
        text-align: left;
        align-items: center;
        justify-content: left;
    }

    code, .mono {
        color: #000000;
        font-family: 'Source Code Pro';
        white-space: pre-wrap;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: left;
        justify-content: left;
        justify-items: left;
    }

    .spacer {
        margin: 150px 100px;
    }

    p {
        font-family: "Inter", sans-serif;
        font-size: 1.5rem;
        margin: 1rem 0 0 0;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-size: 3rem;
        font-weight: 600;
        color: ${foreground};
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, color, nickname, images } = parsedReq;
    const patp = ob.isValidPatp(`~${text}`) ? `~${text}` : "~zod";
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
            ${images[0] ? `<div style="border-radius:0.75rem;overflow:hidden;"><img src=${images[0]} style="height:250px;width:250px;object-fit:contain;"/></div>` : sigilString(patp, 250, color)}
            <div style="display: flex; flex-direction: column; align-items: left; text-align: left; margin-left: 2rem;">
            ${nickname && `<p class="heading">${nickname}</p>`}
            <p class="${nickname ? "mono" : "heading"}">${patp}</p>
            <p>Urbit ID</p>
            </div>
            </div>
            <div class="spacer">
        </div>
    </body>
</html>`;
}
