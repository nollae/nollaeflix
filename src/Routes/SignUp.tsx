import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { loginState, signupState } from '../atoms';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';

const Sign_Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 0;
`;

const Header_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    position: relative;
    height: 90px;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
`;

const Header_Logo_Container = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    background-color: transparent;
    color: #0071eb;
    fill: #e50914;
    display: inline-block;
    line-height: 90px;
    text-decoration: none;
    vertical-align: middle;
    margin-left: 3%;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        direction: ltr;
        font-size: 16px;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        color: #0071eb;
        fill: #e50914;
        line-height: 90px;
        overflow: hidden;
        height: 45px;
        vertical-align: middle;
        width: 167px;
    }
`;

const Logo_Span = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #0071eb;
    fill: #e50914;
    line-height: 90px;
    left: -9999px;
    position: absolute;
    top: -9999px;
`;

const Login = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    background-color: transparent;
    text-decoration: none;
    color: #333;
    float: right;
    font-size: 19px;
    font-weight: 500;
    line-height: 90px;
    margin: 0 3%;
`;

const Body_Wrapper = styled.div<{$isShow?:boolean}>`
    display: ${(props) => props.$isShow ? "" : "none"};
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
    width: 100%;
    background-color: #fff;
    flex-grow: 1;
    padding-bottom: 95px;
`;

const Body_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: border-box;
    margin: 0 auto 15px;
    max-width: 978px;
    overflow: hidden;
    display: block;
    --layout-container-side-padding: 32px;
    padding: 20px var(--layout-container-side-padding) 60px;
`;

const Step_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    margin: 0 auto;
    text-align: center;
    max-width: 340px;
`;

const Step_Header_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: center;
    display: inline-block;
    span{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #333;
        direction: ltr;
        font-size: 16px;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        text-align: center;
        background: url(https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Checkmark.png) no-repeat 50% 50%;
        display: block;
        background-size: 50px;
        height: 50px;
        width: 50px;
        margin: 100px 0 20px;
    }
`;

const Step_Header_Wrapper2 = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: center;
    display: inline-block;
    span {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #333;
        direction: ltr;
        font-size: 16px;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        text-align: center;
        background: url(https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png) no-repeat 50% 50%;
        background-size: 260px;
        height: 90px;
        display: block;
        width: 260px;
        margin: 100px 0 20px;
    }    
`;

const Step_Title_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: center;
`;

const Step_Title_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: center;
    display: inline-block;
`;

const Step_Detail = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    display: block;
    line-height: 19px;
    font-size: 13px;
    text-align: inherit;
    b{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #333;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        line-height: 19px;
        font-size: 13px;
        text-align: inherit;
        font-weight: 500;
    }
`;

const Step_Title = styled.h1`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: center;
    margin: 0 0 .4em;
    display: inline-block;
    font-weight: 500;
    font-size: 32px;
`;

const Content_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: center;
    display: inline-block;
    max-width: 300px;
    margin: 0;
    font-size: 18px;
    margin-bottom: 0;
    margin-top: 0;
`;

const Content_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    font-size: 18px;
    padding: 0;
    order: -1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 15px;
    text-align: left;
`;

const Content = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    font-size: 18px;
    list-style-type: disc;
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0;
    margin-top: 20px;
    svg{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        font-size: 18px;
        list-style-type: disc;
        fill: none;
        align-self: flex-start;
        color: #e50914;
        flex: none;
        height: 26px;
        width: 26px;
        overflow: hidden;
    }
    span{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #333;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        list-style-type: disc;
        margin-left: 10px;
        font-size: 18px;
        margin-bottom: 0;
        margin-top: 0;
    }
`;

const Submit_Button_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    margin: 0 auto;
    text-align: center;
    margin-top: 24px;
    max-width: 340px;
`;

const Submit_Button = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    border: none;
    box-shadow: 0 1px 1px rgba(0,0,0,.25);
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    letter-spacing: .025rem;
    text-align: center;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
    position: relative;
    background-color: #e50914;
    color: #fff;
    min-width: 110px;
    padding: 20.5px 2em;
    width: 100%;
    line-height: 1;
    border-radius: 4px;
    font-size: 24px;
    font-weight: 400;
    min-height: 64px;
    &:hover{
        background-color: #f6121d;
    }
`;

/***************************** */

const Sub_Body_Wrapper = styled.div<{$isShow?:boolean}>`
    display: ${(props) => props.$isShow ? "" : "none"};
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
    width: 100%;
    background-color: #fff;
    flex-grow: 1;
    padding-bottom: 95px;
`;

const Sub_Body_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 100%;
    max-width: 560px;
    margin: 0px auto;
    padding: 20px 25px;
    box-sizing: border-box;
    transition: none 0s ease 0s;
`;

const Sub_Body_Container2 = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: border-box;
    margin: 0 auto 15px;
    max-width: 978px;
    overflow: hidden;
    --layout-container-side-padding: 32px;
    padding: 20px var(--layout-container-side-padding) 60px;
    display: block;
    transform: none;
    opacity: 1;
    transition-duration: 250ms;    
`;

const Sub_Header_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    margin-top: 0px;
    margin-bottom: 0.5rem;
`;

const Sub_Title_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: inline-block;
`;

const Sub_Step_Detail = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: block;
    line-height: 19px;
    font-size: 13px;
    text-align: inherit;
    b {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #333;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        line-height: 19px;
        font-size: 13px;
        text-align: inherit;
        font-weight: 500;
    }
`;

const Sub_Title = styled.h1`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    margin: 0 0 .4em;
    display: inline-block;
    font-weight: 500;
    font-size: 32px;
`;

const Type_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
`;

const Type_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: flex;
    flex-direction: row;
    gap: 8px;
    -webkit-box-align: stretch;
    align-items: stretch;
`;

const Type_Detail_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    flex-basis: 100%;
`;

const Type_Detail_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;
    height: 100%;
`;

const Detail_Input = styled.input`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: inherit;
    font: inherit;
    line-height: normal;
    appearance: none;
    z-index: -1;
    margin: 0px;
    border: 0px;
    background: none;
    position: absolute;
    box-sizing: border-box;
    padding: 0;
`;

const Detail_Label_Wrapper = styled.label`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: flex;
    height: 100%;
`;

const Detail_Label_Container = styled.div<{$isSelected?:boolean, $type?:string}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border: ${(props) => props.$isSelected ? "0px" : "1px solid rgba(128, 128, 128, 0.4)"};
    border-radius: 12px;
    box-sizing: border-box;
    padding: ${(props) => props.$isSelected ? "13px" : "12px" };
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 107px;
    color: ${(props) => props.$isSelected ?  "white" : "black" };
    transition: box-shadow 100ms ease-in-out 0s;
    box-shadow: ${(props) => props.$isSelected ? "rgba(0, 0, 0, 0.3) 0px 4px 13px -3px" : "none"};
    background: ${(props) => props.$isSelected ? (props.$type === "1") ? "radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)" 
                                                    : (props.$type === "2") ? " radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)"
                                                    : "radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)"
                                                : "none" };
`;


const Detail_Title = styled.h2<{$isSelected?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: ${(props) => props.$isSelected ? "white" : "black"} ;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    margin: 0px;
`;


const Detail_Sub_Title = styled.sub<{$isSelected?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;
    vertical-align: baseline;
    font-size: 0.625rem;
    font-weight: 500;
    line-height: 1;
    color: ${(props) => props.$isSelected ? "white" : "rgb(103, 103, 103)" } ;
    bottom: 0px;
`;

const Detail_Svg_Wrapper = styled.div<{$isSelected?:boolean}>`
    display: ${(props) => props.$isSelected ? "flex" : "none"} ;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: white;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    cursor: initial;
    border-style: none;
    border-width: 1px;
    border-color: rgba(128, 128, 128, 0.4);
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    min-height: 16px;
    align-self: end;
    margin-top: auto;
    /* max-width: 0px; */
    /* opacity: 0; */
    animation: 100ms ease-out 0s 1 normal forwards running;
    max-width: 16px;
    opacity: 1;
`;

const Detail_Svg = styled.svg`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: white;
    cursor: initial;
    width: 24;
    height: 22;
    fill: none;
    overflow: hidden;
    transform: scale(1.375);
    path{
        fill: white;
    }
`;

const Sub_Content_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    margin: 0px -25px;
    margin-top: 15px;
`;

const Sub_Content_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: border-box;
    padding: 0px 25px;
    width: 100%;
`;

const Sub_Item_Wrapper = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    padding: 12.5px 0px;
    margin: 0px;
    list-style: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 1px solid rgba(128, 128, 128, 0.4);
`;

const Sub_Item_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    list-style: none;
    display: flex;
    flex: 1 1 0%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
`;

const Sub_Item_Title = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    list-style: none;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.53846;
    color: rgb(118, 118, 118);
    flex: 0 0 40%;
`;

const Sub_Item_Content = styled.div<{$isMain?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    list-style: none;
    font-size: ${(props) => props.$isMain ?"1rem" : "0.875rem"};
    font-weight: 500;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.7);
    flex: 0 0 calc(60% - 13px);
    padding-left: 13px;
    text-align: right;
`;

const Sub_Button_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    margin: 20px auto;
    max-width: 440px;
`;

const Sub_Button = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: visible;
    text-transform: none;
    appearance: none;
    font-style: inherit;
    font-variant: inherit;
    font-stretch: inherit;
    font-family: inherit;
    font-optical-sizing: inherit;
    font-kerning: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    margin: 0px;
    text-decoration: none;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    display: inline-flex;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: normal;
    line-height: 1;
    user-select: none;
    border: 0px;
    border-radius: 0.25rem;
    cursor: pointer;
    fill: currentcolor;
    position: relative;
    transition-duration: 250ms;
    transition-property: background-color, border-color;
    transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
    vertical-align: text-top;
    width: 100%;
    font-size: 1.5rem;
    font-weight: 500;
    min-height: 3.5rem;
    padding: 0.75rem 1.5rem;
    background: rgb(229, 9, 20);
    color: rgb(255, 255, 255);
    &:hover {
        transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
        background: rgb(193, 17, 25);
    }
`;

const Step_Cotent = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: center;
    display: inline-block;
    max-width: 300px;
    margin: 0;
    font-size: 18px;
    margin-bottom: 0;
    margin-top: 0;
`;

const Signup_Form = styled.form`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;    
`;

const Signup_Form_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    margin: 0 auto;
    max-width: 440px;
    text-align: left;    
`;

const Signup_Header_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: left;    
`;

const Signup_Header_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: left;
    display: inline-block;
    margin-top: 20px;    
`;

const Signup_Step = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    display: block;
    line-height: 19px;
    font-size: 13px;
    text-align: inherit;
    b{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #333;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        line-height: 19px;
        font-size: 13px;
        text-align: inherit;
        font-weight: 500;
    }
`;

const Signup_Title = styled.h1`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: left;
    margin: 0 0 .4em;
    display: inline-block;
    font-weight: 500;
    font-size: 32px;    
`;

const Signup_Sub_Title1 = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: left;
    font-size: 18px;
    margin-bottom: 0;
    margin-top: 0;
`;

const Signup_Sub_Title2 = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: left;
    margin-bottom: 0;
    font-size: 18px;
    margin-top: 10px;    
`;

const Signup_Items_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    text-align: left;
    box-sizing: border-box;
    padding: 0;
    margin: 16px 0 20px;    
`;

const Signup_Item_Wrapper = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    margin-bottom: 10px;
    list-style: none;
    margin-left: 0;
`;

const Signup_Item_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    width: 100%;
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    vertical-align: text-top;    
`;

const Signup_Lable = styled.label<{$isEmailFocus:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    display: block;
    user-select: none;
    position: absolute;
    z-index: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition-property: top, font-size, line-height;
    transition-duration: 250ms;
    pointer-events: none;
    transition-timing-function: ${(props) => props.$isEmailFocus ? "cubic-bezier(0.5, 0, 0.1, 1)" : "cubic-bezier(0.9, 0, 0.51, 1)"};
    left: 1rem;
    right: 1rem;
    top:  ${(props) => props.$isEmailFocus ? "0.5rem" : "1rem"};
    font-size: ${(props) => props.$isEmailFocus ? "0.75rem" : "1rem"};
    font-weight: 400;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.7);    
`;

const Signup_Input_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    -webkit-box-align: center;
    align-items: center;
    display: inline-flex;
    gap: 2px;
    letter-spacing: normal;
    line-height: 100%;
    position: relative;
    text-align: left;
    z-index: 0;
    fill: currentcolor;
    padding: 0px;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    color: rgb(0, 0, 0);
    min-width: 0px;    
`;

const Sign_Input = styled.input<{$isEmailFocus:boolean}>`
    /* filter: opacity(${(props) => props.$isEmailFocus ? 100 : 0}%); */
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    fill: currentcolor;
    animation-timeline: auto;
    animation-range-start: normal;
    animation-range-end: normal;
    appearance: none;
    letter-spacing: inherit;
    text-align: inherit;
    text-transform: inherit;
    animation: auto ease 0s 1 normal none running animation-14hycbg;
    background: padding-box transparent;
    border-width: 0px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    font: inherit;
    margin: 0px;
    text-decoration: inherit;
    min-height: 16px;
    min-width: 16px;
    width: 100%;
    color: inherit;
    /* filter: opacity(0%); */
    padding: 1.5rem 1rem 0.5rem;
    line-height: 1.5;
    font-size: 1rem;    
`;

const Sign_Input_Border = styled.div<{$isFocus?:boolean, $isEmailError?:boolean, $isValid?:boolean}>`
    outline: ${(props) => props.$isFocus ? "rgb(0, 0, 0) solid 0.125rem" : "none"};
    outline-offset: ${(props) => props.$isFocus ? "0.125rem" : "none"} !important;
    border-color: ${(props) => props.$isEmailError ? "rgb(193, 17, 25)" : (props.$isValid) ? "rgb(12, 136, 73)" : "rgba(128, 128, 128)"} ;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    letter-spacing: normal;
    line-height: 100%;
    text-align: left;
    fill: currentcolor;
    font-size: 1rem;
    font-weight: 400;
    color: transparent;
    position: absolute;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    inset: 0px;
    z-index: -1;
    border: 1px solid black;
    user-select: none;
    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    background: rgb(255, 255, 255);
    /* border-color: rgb(128, 128, 128);     */
`;

const Signup_Error = styled.div<{$isEmailError?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    fill: currentcolor;
    margin-top: 0.375rem;
    width: 100%;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.53846;
    color: rgb(193, 17, 25);   
    svg {
        display: ${(props) => props.$isEmailError ? "" : "none" };
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        list-style: none;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.53846;
        color: rgb(193, 17, 25);
        fill: none;
        width: 16;
        height: 16;
        overflow: hidden;
        margin-right: 0.25rem;
        position: relative;
        top: 0.1875rem;
    } 
`;

const Signup_Button_Wrapper = styled.div`
     -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    font-size: 16px;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    margin: 0 auto;
    max-width: 440px;
    text-align: center;
    margin-top: 24px;   
`;

const Signup_Button = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    border: none;
    box-shadow: 0 1px 1px rgba(0,0,0,.25);
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    letter-spacing: .025rem;
    text-align: center;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
    position: relative;
    background-color: #e50914;
    color: #fff;
    min-width: 110px;
    padding: 20.5px 2em;
    width: 100%;
    line-height: 1;
    border-radius: 4px;
    font-size: 24px;
    font-weight: 400;
    min-height: 64px;    
    &:hover{
        background-color: #f6121d;
    }
`;

const Contract_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #333;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    width: 100%;
    position: relative;
    flex-wrap: wrap;
    display: flex;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;    
`;

const Contract_Button_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    -webkit-box-align: center;
    align-items: center;
    color: black;
    fill: black;
    display: inline-flex;
    font-weight: 400;
    gap: 2px;
    letter-spacing: normal;
    position: relative;
    text-align: left;
    z-index: 0;
    padding: 0;
    width: 1.125rem;
    font-size: inherit;
    line-height: inherit;
    max-height: 1.5em;
    min-width: 0;   
`;

const Contract_Button_Input = styled.input`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    fill: black;
    box-sizing: border-box;
    animation: animation-14hycbg;
    appearance: none;
    background: transparent;
    background-clip: padding-box;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    text-align: inherit;
    text-decoration: inherit;
    text-transform: inherit;
    transition-delay: 250ms!important;
    border: 1px solid transparent;
    min-height: 10px;
    min-width: 10px;
    position: absolute;
    width: 2.75rem;
    height: 2.75rem;
    left: -0.8125rem;
    cursor: pointer;
    border-radius: 0.125rem;    
`;

const Contract_Button_Svg_Container = styled.div<{$isChecked:boolean, $isError?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    fill: black;
    font-weight: 400;
    letter-spacing: normal;
    text-align: left;
    line-height: inherit;
    position: absolute;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    left: 0;
    right: 0;
    z-index: -1;
    background: white;
    border: 1px solid black;
    user-select: none;
    border-style: solid;
    bottom: auto;
    box-sizing: border-box;
    top: auto;
    transition-property: background-color,border-color,border-width,color;
    transition-duration: 250ms;
    transition-timing-function: ${(props) => props.$isChecked ? "cubic-bezier(0.9, 0, 0.51, 1)" : "cubic-bezier(0.5, 0, 0.1, 1)"};
    width: inherit;
    height: 1.125rem;
    border-width: ${(props) => props.$isChecked ? "0" : "0.0625rem"};
    border-radius: 0.125rem;
    font-size: 13px;
    color: rgb(255,255,255);
    background-color: ${(props) => props.$isChecked ? "rgb(0,0,0)" : "rgb(255,255,255)" };
    border-color: ${(props) => props.$isChecked ? "rgba(0,0,0,0)" : props.$isError ? "rgb(193, 17, 25)" : "rgb(128,128,128)" };    

    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        list-style: none;
        font-weight: 400;
        letter-spacing: normal;
        text-align: left;
        line-height: inherit;
        user-select: none;
        font-size: 13px;
        color: rgb(255,255,255);
        height: 16;
        overflow: hidden;
        fill: currentColor;
        width: 0.75rem;
    }
`;

const Contract_Label = styled.label`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    font-weight: 400;
    user-select: none;
    display: inline-block;
    flex: 1 1 0%;
    padding-left: 0.75rem;
    font-size: inherit;
    line-height: inherit;
    color: rgb(0,0,0);    
`;

const Contract_Error_Container = styled.div<{$isError:boolean}>`
    display: ${(props) => props.$isError ? "" : "none"} ;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --layout-container-side-padding: 32px;
    list-style: none;
    font-weight: 400;
    line-height: 1.5;
    fill: currentcolor;
    margin-top: 0.375rem;
    width: 100%;
    padding-left: 1.875rem;
    font-size: 0.8125rem;
    color: rgb(193, 17, 25);
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        direction: ltr;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --layout-container-side-padding: 32px;
        list-style: none;
        font-weight: 400;
        line-height: 1.5;
        font-size: 0.8125rem;
        color: rgb(193, 17, 25);
        fill: none;
        width: 16;
        height: 16;
        overflow: hidden;
        margin-right: 0.25rem;
        position: relative;
        top: 0.1875rem;
    }    
`;

interface IForm {
    membership?: string,
    email?: string,
    password?: string,
}


function Sign() {

    const history = useHistory();
    const { register, watch, handleSubmit, formState:{errors, isValid, isValidating}, getValues, setValue, trigger, setFocus} = useForm();

    const mainSingup = useRouteMatch({path: "/signup", exact: true});
    const subSingup = useRouteMatch({path: "/signup/planform", exact: true});
    const main2Signup = useRouteMatch({ path: "/signup/registration", exact: true});
    const sub2Singup = useRouteMatch({path: "/signup/regform", exact: true});

    useEffect(() => {
        if(mainSingup){
            setIsShowMain(true);
            setIsShowSub(false);
            setIsShowMain2(false);
            setIsShowSub2(false);
        }
        if(subSingup){
            setIsShowMain(false);
            setIsShowSub(true);
            setIsShowMain2(false);
            setIsShowSub2(false);
        }
        if(main2Signup){
            setIsShowMain(false);
            setIsShowSub(false);
            setIsShowMain2(true);
            setIsShowSub2(false);
        }
        if(sub2Singup){
            setIsShowMain(false);
            setIsShowSub(false);
            setIsShowMain2(false);
            setIsShowSub2(true);
        }
    }, [mainSingup, subSingup, main2Signup, sub2Singup]);

    const [isShowMain, setIsShowMain] = useState(true);
    const [isShowSub, setIsShowSub] = useState(false);
    const [isShowMain2, setIsShowMain2] = useState(false);
    const [isShowSub2, setIsShowSub2] = useState(false);

    // 1단계 메인에서 서브 화면으로 
    const handleNextStep = (step:number) => {
        if(step === 1){
            setIsShowMain(false);
            setIsShowSub(true);
            setIsShowMain2(false);
            setIsShowSub2(false);
            history.push(`/signup/planform`);
        }
        if(step === 2){
            setIsShowMain(false);
            setIsShowSub(false);
            setIsShowMain2(true);
            setIsShowSub2(false);
            history.push(`/signup/registration`);
        }
        if(step === 3){
            setIsShowMain(false);
            setIsShowSub(false);
            setIsShowMain2(false);
            setIsShowSub2(true);
            history.push(`/signup/regform`);
        }
        if(step === 4){

        }
    }

    // 1단계 멤버십 종류
    const [isSelectedType1, setIsSelectedType1] = useState(true);
    const [isSelectedType2, setIsSelectedType2] = useState(false);
    const [isSelectedType3, setIsSelectedType3] = useState(false);
    const [type, setType] = useState(1);

    const handleType = (event:any) => {
        const value = event.target.value;
        setType(value);
        if(value === "1") {
            setIsSelectedType1(true);
            setIsSelectedType2(false);
            setIsSelectedType3(false);
        }
        if(value === "2") {
            setIsSelectedType1(false);
            setIsSelectedType2(true);
            setIsSelectedType3(false);
        }
        if(value === "3") {
            setIsSelectedType1(false);
            setIsSelectedType2(false);
            setIsSelectedType3(true);
        }
    }

    // 2단계 이메일 & 비밀번호
    const [login, setLogin] = useRecoilState(loginState);
    const [signup, setSignup] = useRecoilState(signupState);
    const onValid = (data:IForm) => {
        
        if(isValid && isChecked){
            setSignup((items) => ({membership: type+""!, email: data.email!, password: data.password!}));
            setLogin((items)=> ({email: data.email!, password:data.password!}));
            history.push('/home');
        }
    }

    useEffect(() => {
        // 이메일 Setting
        if(login.email) {
            setValue("email", login.email);
            handleEmailFocus();
            trigger();
            setFocus("email");
        }
    }, []);

    // 이메일
    const [isCmFocusEamil, setIsCmFocusEamil] = useState(false);
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const handleEmailFocus = () => {
        setIsEmailFocus(true);
        setIsCmFocusEamil(true);
    }

    // 비밀번호
    const [isCmFocusPassword, setIsCmFocusPassword] = useState(false);
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const handlePasswordFocus = () => {
        setIsPasswordFocus(true);
        setIsCmFocusPassword(true);
    }

    // 약관동의
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isErrorChecked, setIsErrorChecked] = useState(false);
    const handleChecked = (type:number) => {
        if(type === 1){
            setIsChecked(!isChecked);
            if(isChecked) setIsErrorChecked(true);
            if(!isChecked) setIsErrorChecked(false);
        }
        if(type === 2){
            setIsChecked2(!isChecked2);
        }
        
    }

    return (
        <Sign_Container>
            <Header_Container>
                {/* Header */}
                <Header_Logo_Container>
                    {/* Logo */}
                    <svg viewBox="0 0 111 30" data-uia="netflix-logo" aria-hidden="true" focusable="false">
                        <g id="netflix-logo">
                            <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" id="Fill-14">
                            </path>
                        </g>
                    </svg>
                    <Logo_Span>Netflix 홈</Logo_Span>
                </Header_Logo_Container>
                {/* Login */}
                <Login href="/login">로그인</Login>
            </Header_Container>
            {/* Body : Step 1/3 Main */}
            <Body_Wrapper $isShow={isShowMain} >
                <Body_Container>
                    <Step_Container>
                        {/* Header */}
                        <Step_Header_Wrapper>
                            <span />
                        </Step_Header_Wrapper>
                        {/* Title */}
                        <Step_Title_Wrapper>
                            <Step_Title_Container>
                                {/* Detail */}
                                <Step_Detail>
                                    <b>1</b>
                                    /
                                    <b>2단계</b>
                                </Step_Detail>
                                <Step_Title>
                                    원하는 멤버십을 선택하세요.
                                </Step_Title>
                            </Step_Title_Container>
                        </Step_Title_Wrapper>
                        {/* Content */}
                        <Content_Wrapper>
                            <Content_Container>
                                <Content>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    <span>無약정, 無위약금. 해지도 쿨하게 언제든지.</span>
                                </Content>
                                <Content>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    <span>하나의 요금으로 즐기는 끝없는 콘텐츠의 세계.</span>
                                </Content>
                                <Content>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    <span>가지고 계신 모든 디바이스에서 넷플릭스를 즐겨보세요.</span>
                                </Content>
                            </Content_Container>
                        </Content_Wrapper>
                        {/* Submit Button */}
                        <Submit_Button_Wrapper>
                            <Submit_Button onClick={() => handleNextStep(1)}>
                                다음
                            </Submit_Button>
                        </Submit_Button_Wrapper>
                    </Step_Container>
                </Body_Container>
            </Body_Wrapper>
            {/* Body : Step 1/3 Sub */}
            <Sub_Body_Wrapper $isShow={isShowSub}>
                <Sub_Body_Container>
                    {/* MemberShip */}
                    {/* Title */}
                    <Sub_Header_Wrapper>
                        <div>
                            <Sub_Title_Wrapper>
                                <Sub_Step_Detail>
                                    <b>1</b>
                                    /
                                    <b>2단계</b>
                                </Sub_Step_Detail>
                                <Sub_Title>
                                    원하는 멤버십을 선택하세요.
                                </Sub_Title>
                            </Sub_Title_Wrapper>
                        </div>
                    </Sub_Header_Wrapper>
                    {/* Type */}
                    <Type_Wrapper>
                        <Type_Container>
                            {/* Detail */}
                            {/* Type1: Premium */}
                            <Type_Detail_Wrapper>
                                <Type_Detail_Container>
                                    <Detail_Input 
                                        onClick={handleType}
                                        type="radio" id="premium" value={1} defaultChecked={isSelectedType1}/>
                                    <Detail_Label_Wrapper htmlFor="premium">
                                        <Detail_Label_Container $isSelected={isSelectedType1} $type={"1"}>
                                            {/* Title */}
                                            <Detail_Title $isSelected={isSelectedType1}>프리미엄</Detail_Title>
                                            {/* Sub Title */}
                                            <Detail_Sub_Title $isSelected={isSelectedType1}>4K + HDR</Detail_Sub_Title>
                                            {/* Button */}
                                            <Detail_Svg_Wrapper $isSelected={isSelectedType1} aria-setsize={14}>
                                                <Detail_Svg width="24" height="22" viewBox="0 0 24 22" fill="none" data-uia="success-svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0183 21.0833C17.7761 21.0833 22.4438 16.5688 22.4438 11C22.4438 5.43112 17.7761 0.916656 12.0183 0.916656C6.26044 0.916656 1.59277 5.43112 1.59277 11C1.59277 16.5688 6.26044 21.0833 12.0183 21.0833ZM11.7407 14.3982L17.4273 8.89817L16.087 7.60181L11.0705 12.4536L8.89738 10.3518L7.55702 11.6482L10.4004 14.3982L11.0705 15.0463L11.7407 14.3982Z" fill="#0071EB">
                                                    </path>
                                                </Detail_Svg>
                                            </Detail_Svg_Wrapper>
                                        </Detail_Label_Container>
                                    </Detail_Label_Wrapper>
                                </Type_Detail_Container>
                            </Type_Detail_Wrapper>
                            {/* Type2: Standard */}
                            <Type_Detail_Wrapper>
                                <Type_Detail_Container>
                                    <Detail_Input 
                                        onClick={handleType}
                                        type="radio" id="standard" value={2} defaultChecked={isSelectedType2}/>
                                    <Detail_Label_Wrapper htmlFor="standard">
                                        <Detail_Label_Container $isSelected={isSelectedType2} $type={"2"}>
                                            {/* Title */}
                                            <Detail_Title $isSelected={isSelectedType2}>스탠다드</Detail_Title>
                                            {/* Sub Title */}
                                            <Detail_Sub_Title $isSelected={isSelectedType2}>1080p</Detail_Sub_Title>
                                            {/* Button */}
                                            <Detail_Svg_Wrapper $isSelected={isSelectedType2} aria-setsize={14}>
                                                <Detail_Svg width="24" height="22" viewBox="0 0 24 22" fill="none" data-uia="success-svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0183 21.0833C17.7761 21.0833 22.4438 16.5688 22.4438 11C22.4438 5.43112 17.7761 0.916656 12.0183 0.916656C6.26044 0.916656 1.59277 5.43112 1.59277 11C1.59277 16.5688 6.26044 21.0833 12.0183 21.0833ZM11.7407 14.3982L17.4273 8.89817L16.087 7.60181L11.0705 12.4536L8.89738 10.3518L7.55702 11.6482L10.4004 14.3982L11.0705 15.0463L11.7407 14.3982Z" fill="#0071EB">
                                                    </path>
                                                </Detail_Svg>
                                            </Detail_Svg_Wrapper>
                                        </Detail_Label_Container>
                                    </Detail_Label_Wrapper>
                                </Type_Detail_Container>
                            </Type_Detail_Wrapper>
                            {/* Type3: Ad Standard */}
                            <Type_Detail_Wrapper>
                                <Type_Detail_Container>
                                    <Detail_Input 
                                        onClick={handleType}
                                        type="radio" id="adStandard" value={3} defaultChecked={isSelectedType3}/>
                                    <Detail_Label_Wrapper htmlFor="adStandard">
                                        <Detail_Label_Container $isSelected={isSelectedType3} $type={"3"}>
                                            {/* Title */}
                                            <Detail_Title $isSelected={isSelectedType3}>광고형 스탠다드</Detail_Title>
                                            {/* Sub Title */}
                                            <Detail_Sub_Title $isSelected={isSelectedType3}>1080p</Detail_Sub_Title>
                                            {/* Button */}
                                            <Detail_Svg_Wrapper $isSelected={isSelectedType3} aria-setsize={14}>
                                                <Detail_Svg width="24" height="22" viewBox="0 0 24 22" fill="none" data-uia="success-svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0183 21.0833C17.7761 21.0833 22.4438 16.5688 22.4438 11C22.4438 5.43112 17.7761 0.916656 12.0183 0.916656C6.26044 0.916656 1.59277 5.43112 1.59277 11C1.59277 16.5688 6.26044 21.0833 12.0183 21.0833ZM11.7407 14.3982L17.4273 8.89817L16.087 7.60181L11.0705 12.4536L8.89738 10.3518L7.55702 11.6482L10.4004 14.3982L11.0705 15.0463L11.7407 14.3982Z" fill="#0071EB">
                                                    </path>
                                                </Detail_Svg>
                                            </Detail_Svg_Wrapper>
                                        </Detail_Label_Container>
                                    </Detail_Label_Wrapper>
                                </Type_Detail_Container>
                            </Type_Detail_Wrapper>
                        </Type_Container>
                    </Type_Wrapper>
                    {/* Content */}
                    <Sub_Content_Wrapper>
                        <Sub_Content_Container>
                            <Sub_Item_Wrapper>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>월 요금</Sub_Item_Title>
                                    {/* Type1: Premium | Type2: Standard | Type3: Ad Standard */}
                                    <Sub_Item_Content $isMain={true}>
                                        { isSelectedType1 ? "17,000원" 
                                        : isSelectedType2 ? "13,500원" 
                                        : "5,500원"} 
                                    </Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                            <Sub_Item_Wrapper>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>화질과 음질</Sub_Item_Title>
                                    {/* Type1: Premium | Type2: Standard & Type3: Ad Standard */}
                                    <Sub_Item_Content>
                                        { isSelectedType1 ? "가장 좋음" : "좋음"}
                                    </Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                            <Sub_Item_Wrapper>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>해상도</Sub_Item_Title>
                                    {/* Type1: Premium | Type2: Standard & Type3: Ad Standard */}
                                    <Sub_Item_Content>{ isSelectedType1 ? "4K(UHD) + HDR" : "1080p(풀 HD)"}</Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                            {/* Type1: Premium */}
                            <Sub_Item_Wrapper style={{
                                display: isSelectedType1 ? "flex" : "none"
                            }}>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>공간 음향(이머시브 사운드)</Sub_Item_Title>
                                    <Sub_Item_Content>포함</Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                            <Sub_Item_Wrapper>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>지원 디바이스</Sub_Item_Title>
                                    <Sub_Item_Content>TV, 컴퓨터, 스마트폰, 태블릿</Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                            <Sub_Item_Wrapper>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>가구 구성원 간 동시접속자 수</Sub_Item_Title>
                                    {/* Type1: Premium | Type2: Standard & Type3: Ad Standard */}
                                    <Sub_Item_Content>{ isSelectedType1 ? "4" : "2" }</Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                            <Sub_Item_Wrapper>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>저장 디바이스</Sub_Item_Title>
                                    {/* Type1: Premium | Type2: Standard & Type3: Ad Standard */}
                                    <Sub_Item_Content>{ isSelectedType1 ? "6" : "2" }</Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                            <Sub_Item_Wrapper style={{borderBottom : "none"}}>
                                <Sub_Item_Container>
                                    <Sub_Item_Title>광고</Sub_Item_Title>
                                    {/* Type1: Premium & Type2: Standard : Type3: Ad Standard */}
                                    <Sub_Item_Content>{ isSelectedType3 ? "시간당 단 몇 분" : "무광고" }</Sub_Item_Content>
                                </Sub_Item_Container>
                            </Sub_Item_Wrapper>
                        </Sub_Content_Container>
                    </Sub_Content_Wrapper>
                    {/* Detail */}
                    <div style={{margin: "0px -16px",}}>
                        <div>
                            <small style={{
                                color: "#737373",
                                display: "block",
                                fontSize: "13px",
                                padding: "0 16px",
                                marginTop: "10px"
                            }}>
                                광고형 멤버십에 대해 자세히 알아보세요. 광고형 멤버십을 선택하면, 맞춤형 광고와 Netflix의 개인정보 처리방침에 부합하는 기타 목적을 위해 생년월일을 제공해 주셔야 합니다.
                            </small>
                            <small style={{
                                color: "#737373",
                                display: "block",
                                fontSize: "13px",
                                padding: "0 16px",
                                marginTop: "10px"
                            }}>
                                풀 HD(1080p), UHD(4K), HDR 화질 제공 여부는 사용하는 인터넷 서비스와 디바이스의 성능에 따라 달라질 수 있습니다. 모든 콘텐츠가 모든 화질로 제공되지는 않습니다. 자세한 내용은 이용 약관을 확인하세요.
                            </small>
                            <small style={{
                                color: "#737373",
                                display: "block",
                                fontSize: "13px",
                                padding: "0 16px",
                                marginTop: "10px"
                            }}>
                                함께 거주하는 사람들만 계정을 함께 이용할 수 있습니다. 스탠다드 멤버십은 추가 회원을 1명, 프리미엄은 최대 2명까지 등록할 수 있습니다. 자세히 알아보기. 프리미엄 멤버십은 동시접속 4명, 스탠다드 또는 광고형 스탠다드는 2명까지 가능합니다.
                            </small>
                        </div>
                    </div>
                    {/* Next Button */}
                    <div>
                        <Sub_Button_Wrapper>
                            <Sub_Button onClick={() => handleNextStep(2)}>다음</Sub_Button>
                        </Sub_Button_Wrapper>
                    </div>
                </Sub_Body_Container>
            </Sub_Body_Wrapper>
            {/* Body : Step 2/3 Main */}
            <Body_Wrapper $isShow={isShowMain2}>
                <Body_Container>
                    <Step_Container>
                        {/* Header */}
                        <Step_Header_Wrapper2>
                            <span></span>
                        </Step_Header_Wrapper2>
                        {/* Title */}
                        <Step_Title_Wrapper>
                            <Step_Title_Container>
                                {/* Detail */}
                                <Step_Detail>
                                    <b>2</b>
                                    /
                                    <b>2단계</b>
                                </Step_Detail>
                                <Step_Title>
                                    계정 설정 마무리하기
                                </Step_Title>
                            </Step_Title_Container>
                        </Step_Title_Wrapper>
                        {/* Content */}
                        <Step_Cotent>
                            맞춤형 콘텐츠 서비스, 넷플릭스! 비밀번호를 설정하고 넷플릭스를 시청하세요.
                        </Step_Cotent>
                        {/* Submit Button */}
                        <Submit_Button_Wrapper>
                            <Submit_Button onClick={() => handleNextStep(3)}>
                                다음
                            </Submit_Button>
                        </Submit_Button_Wrapper>
                    </Step_Container>
                </Body_Container>
            </Body_Wrapper>
            {/* Body : Step 2/3 Sub */}
            <Sub_Body_Wrapper $isShow={isShowSub2}>
                <Sub_Body_Container2>
                    {/* Form */}
                    <Signup_Form onSubmit={handleSubmit(onValid)}>
                        <Signup_Form_Container>
                            <div>
                                {/* Header */}
                                <Signup_Header_Wrapper>
                                    <Signup_Header_Container>
                                        {/* Step & Title */}
                                        <Signup_Step>
                                            <b>2</b>
                                            /
                                            <b>2단계</b>
                                        </Signup_Step>
                                        <Signup_Title>
                                            비밀번호를 설정해 멤버십을 시작하세요
                                        </Signup_Title>
                                    </Signup_Header_Container>
                                </Signup_Header_Wrapper>
                            </div>
                            <div>
                                <Signup_Sub_Title1>몇 단계만 더 거치면 넷플릭스 가입 완료!</Signup_Sub_Title1>
                                <Signup_Sub_Title2>복잡한 단계는 모두 없앴습니다.</Signup_Sub_Title2>
                                <Signup_Items_Container>
                                    {/* 이메일주소 */}
                                    <Signup_Item_Wrapper>
                                        <Signup_Item_Container>
                                            <Signup_Lable 
                                                $isEmailFocus={isEmailFocus}
                                                htmlFor="signup_email">
                                                이메일 주소
                                            </Signup_Lable>
                                            <Signup_Input_Container>
                                                <Sign_Input 
                                                    id="signup_email" 
                                                    type="email" 
                                                    $isEmailFocus={isEmailFocus}
                                                    onFocus={handleEmailFocus}
                                                    {...register("email", { 
                                                        required: "이메일 주소는 반드시 입력하셔야 합니다.",
                                                        pattern:{
                                                            value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 
                                                            message:"이메일 주소를 정확히 입력하세요."
                                                        },
                                                        minLength: {
                                                            value: 5,
                                                            message: "이메일 주소는 5~50자 사이여야 합니다."
                                                        },
                                                        maxLength: 50,
                                                        onBlur: () => {
                                                            if(!getValues("email"))
                                                                setIsEmailFocus(false);
                                                            setIsCmFocusEamil(false);
                                                        },
                                                    })}
                                                />
                                                <Sign_Input_Border 
                                                    $isFocus={isCmFocusEamil} 
                                                    $isEmailError={(errors?.email?.message) ? true : false} 
                                                    $isValid={isValid} 
                                                />
                                            </Signup_Input_Container>
                                            <Signup_Error
                                                $isEmailError={(errors?.email?.message) ? true : false}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                {typeof errors?.email?.message === 'string' && errors?.email?.message}
                                            </Signup_Error>
                                        </Signup_Item_Container>
                                    </Signup_Item_Wrapper>
                                    {/* 비밀번호 */}
                                    <Signup_Item_Wrapper>
                                        <Signup_Item_Container>
                                            <Signup_Lable 
                                                $isEmailFocus={isPasswordFocus}
                                                htmlFor="signup_password">
                                                비밀번호를 추가하세요
                                            </Signup_Lable>
                                            <Signup_Input_Container>
                                                <Sign_Input 
                                                    id="signup_password" 
                                                    type="password" 
                                                    $isEmailFocus={isPasswordFocus} 
                                                    onFocus={handlePasswordFocus}
                                                    {...register("password", { 
                                                        required: "비밀번호는 반드시 입력하셔야 합니다.",
                                                        minLength: {
                                                            value: 5,
                                                            message: "비밀번호는 6~60자 사이여야 합니다."
                                                        },
                                                        maxLength: 60,
                                                        onBlur: () => {
                                                            if(!getValues("password"))
                                                                setIsPasswordFocus(false);
                                                            setIsCmFocusPassword(false);
            
                                                        },
                                                    })}
                                                />
                                                <Sign_Input_Border 
                                                    $isFocus={isCmFocusPassword} 
                                                    $isEmailError={(errors?.password?.message) ? true : false} 
                                                    $isValid={isValid} 
                                                />
                                            </Signup_Input_Container>
                                            <Signup_Error
                                                $isEmailError={(errors?.password?.message) ? true : false}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                {typeof errors?.password?.message === 'string' && errors?.password?.message}
                                            </Signup_Error>
                                        </Signup_Item_Container>
                                    </Signup_Item_Wrapper>
                                    {/* 약관동의 */}
                                    <Signup_Item_Wrapper>
                                        <Contract_Container>
                                            <Contract_Button_Container>
                                                <Contract_Button_Input id="contract1" type="checkbox"  onClick={() => handleChecked(1)} />       
                                                <Contract_Button_Svg_Container $isChecked={isChecked} $isError={isErrorChecked}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CheckmarkSmall" aria-hidden="true">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4696 3.46973L14.5303 4.53039L6.53026 12.5304C6.23737 12.8233 5.7625 12.8233 5.4696 12.5304L1.4696 8.53039L2.53026 7.46973L5.99993 10.9394L13.4696 3.46973Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </Contract_Button_Svg_Container> 
                                            </Contract_Button_Container>
                                            <Contract_Label htmlFor="contract1">
                                                <span>
                                                    예, 저는 개인정보 처리방침에 따른 개인정보 수집 및 활용에 동의합니다. (필수 사항)
                                                </span>
                                            </Contract_Label>
                                            <Contract_Error_Container $isError={isErrorChecked}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                먼저 이용 약관에 동의하셔야 합니다.
                                            </Contract_Error_Container>
                                        </Contract_Container>
                                    </Signup_Item_Wrapper>
                                    <Signup_Item_Wrapper>
                                        <Contract_Container>
                                            <Contract_Button_Container>
                                                <Contract_Button_Input id="contract1" type="checkbox"  onClick={() => handleChecked(2)} />       
                                                <Contract_Button_Svg_Container $isChecked={isChecked2}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CheckmarkSmall" aria-hidden="true">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4696 3.46973L14.5303 4.53039L6.53026 12.5304C6.23737 12.8233 5.7625 12.8233 5.4696 12.5304L1.4696 8.53039L2.53026 7.46973L5.99993 10.9394L13.4696 3.46973Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </Contract_Button_Svg_Container> 
                                            </Contract_Button_Container>
                                            <Contract_Label htmlFor="contract1">
                                                <span>
                                                    예, 넷플릭스 특별 할인 알림 이메일을 보내주세요. (선택 사항)
                                                </span>
                                            </Contract_Label>
                                        </Contract_Container>
                                    </Signup_Item_Wrapper>
                                </Signup_Items_Container>
                            </div>
                        </Signup_Form_Container> 
                        <Signup_Button_Wrapper>
                            <Signup_Button type="submit" onClick={() => handleNextStep(4)}>동의하고 계속</Signup_Button>                            
                        </Signup_Button_Wrapper>       
                    </Signup_Form>
                </Sub_Body_Container2>
            </Sub_Body_Wrapper>
        </Sign_Container>
    );
}

export default Sign;