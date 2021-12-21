import {css} from "styled-components";

 const small=(props)=>{
    return css`
    @media only screen and (max-width:500px){
        ${props}
    }
    `
}

 const medium=(props)=>{
    return css`
    @media only screen and (max-width:740px){
        ${props}
    }
    `
}
 const large=(props)=>{
    return css`
    @media only screen and (max-width:930px){
        ${props}
    }
    `
}
export { small,medium,large}