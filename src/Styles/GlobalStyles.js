import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    font-family: 'Lato', sans-serif;
    user-select: none;
    overflow: auto ;
}
a{
    text-decoration: none;
    color: #000;
    display: inline-block;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,a{
    font-family: 'Lato', sans-serif;
}
button{
    border: none;
    background: transparent;
}
:no-button:focus{
   border: none
}
input:focus{
    border: none !important;
   outline: none;
}
textarea:focus{
    border: none !important;
   outline: none;
   overflow-y: scroll;
   scrollbar-width: none !important;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide{
    background: transparent
}
.error {
    border: 1px solid #dc3545;
}
.notload {
    cursor: pointer;
}
.notiLogin{
    margin-left: 4px;
    font-weight: 800;
}
input.emoji-search {
    display: none;
}
ul.skin-tones-list {
    display: none;
}
.disabled{
    background: #8db7f6
}
.smnone-true{
    display: none;
}

aside.emoji-picker-react .content-wrapper:before {
    content: none !important;
}
// Loading CSS
.loader {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 20px;
    height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;
