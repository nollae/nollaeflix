
import styled from 'styled-components';

import { useHistory } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from "framer-motion"; 

import { IGetMoviesResult, getSeries, 
} from '../api';
import { makeImagePath } from '../utils';

import { useQuery } from 'react-query';

import Detail from './Detail';
import MainHeader from '../Components/MainHeader';

import { addFavoriteVideo, 
    removeFavoriteVideo, userState, 
    IUser, loginState,
    addVotedVideos, removeVotedVideos,
    addFavoriteVideoInfo, removeFavoriteVideoInfo
} from '../atoms';

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const BodyContainer = styled.div<{$isOpen?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    -webkit-locale: "ko-KR";
    width: 100%;
    z-index: 0;
    overflow: ${(props) => props.$isOpen ? "hidden" : "visible"};    
`;

const MainViewWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    min-height: 1000px;
    position: relative;
    z-index: 0;    
`;

const MainViewContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    /* overflow: hidden; */
    padding: 0 0 50px;
    z-index: 0;
    margin-top: -70px;    
`;

const SlideContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    z-index: 1;
    transition: transform .54s cubic-bezier(.5,0,.1,1) 0s;
    outline: 0;
    position: relative;
    box-sizing: border-box;
    margin: 8vw 0;
    padding: 0;    
`;

const SlideContentWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    position: relative;
    z-index: 0;
    transition: transform .54s cubic-bezier(.5,0,.1,1) 0s;
    /* height: 7.7rem; */
`;

const SlideLayerWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    box-sizing: border-box;
    padding: 0;
    /* height: 7.7rem; */
`;

const SlideContentContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    margin: 0;
    padding: 0 4%;
    position: relative;
    touch-action: pan-y;
    z-index: 2; 
    height: 7.7rem;
`;

const SliderWrapper = styled(motion.div)`
    position: relative;
    width: 100%;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    padding-bottom: 1px;
    overflow-x: visible;
`;

const SliderContainer = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: nowrap;    
`;

const SliderItemWrapper = styled(motion.div)`
    width: 16.8%;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    box-sizing: border-box;
    display: inline-block;
    padding: 0 .2vw;
    position: relative;
    vertical-align: top;
    white-space: normal;
    z-index: 1;
    /* width: 25%; */
    padding-left: 0;   
    
    &:first-child {
        transform-origin: center left !important;
    }
    &:last-child {
        transform-origin: center right !important;
    }
`;

const SliderItemContainer = styled.div`
    max-height: 140px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    position: relative;
    z-index: 1;
    display: block;    
`;

const SliderItem = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    display: block;
    /* background-color: #181818;  */
`;

const SliderImgContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    color: #fff;
    cursor: pointer;
    border-radius: .2vw;
    padding: 28.125% 0;
    height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;  
    img {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        font-size: .85vw;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        white-space: normal;
        color: #fff;
        border: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        cursor: pointer;
        content-visibility : auto;
    }   
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        font-size: .85vw;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        white-space: normal;
        color: #fff;
        cursor: pointer;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        bottom: 0;
        left: 0;
        position: absolute;
        right: auto;
        top: 0;
        width: 50%;
    }
`;

const SliderImgTitle = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    color: #fff;
    cursor: pointer;
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    border-radius: 4px;
    /* opacity: 0; */
    p {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        cursor: pointer;
        bottom: 0;
        box-sizing: border-box;
        font-size: 1.5em;
        font-weight: 500;
        left: 8%;
        margin: 0;
        overflow: hidden;
        padding: 0 0 4%;
        position: absolute;
        right: 8%;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
    }
`;

// const SliderNextWrapper = styled.span`
//     /* height: 12rem; */
//     height: 100%;

//     -webkit-text-size-adjust: 100%;
//     -webkit-font-smoothing: antialiased;
//     user-select: none;
//     font-size: .85vw;
//     word-break: keep-all;
//     font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
//     line-height: 1.4;
//     bottom: 0;
//     color: #fff;
//     display: flex;
//     justify-content: center;
//     position: absolute;
//     text-align: center;
//     top: 0;
//     width: 3.6%;
//     z-index: 20;
//     cursor: pointer;
//     border-bottom-left-radius: 4px;
//     border-top-left-radius: 4px;
//     background: hsla(0,0%,8%,.5);    
//     &:hover {
//         background: hsla(0, 0%, 8%, .7);
//         div > svg {
//             fill: white;
//         }
//     }
// `;

// const SldierNextImg = styled.div`
//     -webkit-text-size-adjust: 100%;
//     -webkit-font-smoothing: antialiased;
//     user-select: none;
//     word-break: keep-all;
//     color: #fff;
//     /* text-align: center; */
//     cursor: pointer;
//     /* speak: none;
//     font-family: nf-icon;
//     font-style: normal;
//     font-variant: normal;
//     font-weight: 400; */
//     line-height: 1;
//     text-transform: none;
//     transform: translateZ(0);
//     align-self: center;
//     /* display: none; */
//     /* font-size: 2.5vw; */
//     height: auto;
//     transition: transform .1s ease-out 0s;
//     transform-origin: 45% 50%;    
//     padding-left: 7px;
//     svg {
//         -webkit-text-size-adjust: 100%;
//         -webkit-font-smoothing: antialiased;
//         font: inherit;
//         text-transform: none;
//         cursor: pointer;
//         user-select: none;
//         word-break: break-word;
//         white-space: nowrap;
//         color: white;
//         line-height: 0;
//         fill: none;
//         overflow: hidden;
//         height: 100%;
//         width: 100%;
//     }   
// `;

const ContentPlayWrapper = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    box-sizing: inherit;
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    opacity: 0;
    /* 수정 */
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .2s ease-in;
    /* &:hover{
        opacity: 1;
    } */
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        background-color: rgba(30,30,20,.5);
        border: 1px solid #fff;
        border-radius: 2em;
        height: 3em;
        padding: .5em;
        width: 3em;
    }
`;

const ControlButtonContainer = styled(motion.div)`
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    opacity: 0;
    margin: 0;
    height: 4rem;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: auto;
    align-items: center;
    display: flex;
    margin-bottom: 1em;
    min-height: 2em;
    position: relative;
    z-index: 2;
    box-sizing: inherit; 
    background-color: #181818;  
`;

const PlayButtonWrapper = styled.div`

    position: absolute;
    left: 5%;
    /* margin-right: 40px; */
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    /* margin: .25em; */
    box-sizing: inherit;    
`;

const PlayButtonContainer = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    box-sizing: inherit;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    border: 0px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    opacity: 1;
    /* padding: 0.8rem; */
    position: relative;
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
    padding-left: 1rem;
    padding-right: 1.2rem;
    max-height: 42px;
    min-height: 32px;    
    &:hover {
        /* background-color: #e6e6e6 !important;
        border-color: #fff; */
        background-color: rgba(109, 109, 110, 0.4);
    }
`;

const PlayButtonGap = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    position: relative;
    width: 0.5rem;    
`;

const PlayButtonSvgWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    line-height: 0;
`;

const PlayButtonSvg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    line-height: 0;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.1rem;
    width: 1.1rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: black;
        line-height: 0;
        fill: none;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
`;

const PlayTitle = styled.span`
    -webkit-text-size-adjust: 100%;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    -webkit-font-smoothing: antialiased;
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 2rem;    
`;

const WishButtonWrapper = styled.div`

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: auto;
    margin: .25em;
    box-sizing: inherit;
    position: relative; 
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: auto;
        box-sizing: inherit;
    }   
`;

const WishButtonSvgWrapper =styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    box-sizing: inherit;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    opacity: 1;
    padding: 0rem;
    position: relative;
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    border-radius: 50%;
    /* padding-left: 0.8rem; */
    /* padding-right: 0.8rem; */
    border: 1px solid rgba(255, 255, 255, 0.7);
    color: white;
    background-color: rgba(42,42,42,.6);
    border-color: hsla(0,0%,100%,.5);
    border-width: 2px;
    max-height: 42px;
    max-width: 42px;
    min-height: 32px;
    min-width: 32px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #fff;
    }
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        box-sizing: inherit;
        line-height: 0;
    }    
`;

const WishButtonSvg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    line-height: 0;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.2rem;
    width: 1.2rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: auto;
    }    
`;

const SubHeader = styled.div`
    width: 50%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    position: relative;
    height: 68px;
    z-index: 1;
`;

const SubHeaderWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    align-items: center;
    display: flex;
    left: 0;
    padding: 0 4%;
    position: absolute;
    right: 0;
    top: 0;
    height: 68px;    
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #fff;
        cursor: default;
        user-select: none;
        font-size: .85vw;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        align-items: center;
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;
        margin: 0;
        min-height: 0;
        padding: 0;
    }
`;

const SubHeaderTitle = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-start; 
    span {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #fff;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        font-size: 38px;
        font-weight: 500;
        line-height: 38px;
        margin-right: 15px;
    }   
`

const rowVariants = {
    hidden: (back: boolean) => ({
        x: back ? -window.innerWidth + 50 : window.innerWidth - 50,
    }),
    visible: {
        x: 0,
    },
    exit: (back: boolean) => ({
        x: back ? window.innerWidth - 50 : -window.innerWidth + 50,
    }),
};

const boxVariants = {
    normal: {
      scale: 1,
      opacity: 1
    },
    hover: {
        zIndex: 99,
        scale: 1.3,
        y: -80,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
    }
};


const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        }
    },
};

function Series(){

    const history = useHistory();

    // 로그인 관리 
    const login = useRecoilValue(loginState);
    const [user, setUser] = useRecoilState<IUser | null>(userState);
    useEffect(() => {
    if(user === null){
        setUser((items) => ({
            email: login.email,
            muted: false,
            favoriteVideos: [],
            votedVideos: []
        }))
    }
    }, [login.email, setUser, user]);

    // tv series 데이터 가져오기
    const { data } = useQuery<IGetMoviesResult>(
        ["series", "popular"], 
        getSeries
    );

    // tv series 데이터 6개씩 나누기
    const size = 6;
    const sliceData = (target:IGetMoviesResult, size:number) => {
        const result = [];
        for (let i = 0; i < target.results.length; i += size) {
            result.push(target.results.slice(i, i + size));
        }
        return result;
    }
    const mainData = data ? sliceData(data, size) : [];


    // 영화 상세정보 모달 버튼 이벤트 
    const [movieInfo, setMovieInfo] = useState({movieId: data?.results[0].id, movieTitle: data?.results[0].name}); 

    const [isOpenMainDetail, setIsOpenMainDetail] = useState(false);
    const handleDetailInfo = (movieId?:number, movieTitle?:string) => {
        if(movieId !== undefined && movieTitle !== undefined){
            setMovieInfo({
                movieId: movieId,
                movieTitle: movieTitle
            });
            setIsOpenMainDetail(!isOpenMainDetail);
            history.push(`/series/${movieId}`);
        }
    }

    // 관심있는 영화/TV 추가 이벤트
    const favList = user?.favoriteVideos;
    const setAddFav = useSetRecoilState(addFavoriteVideo);
    const setDelFav = useSetRecoilState(removeFavoriteVideo);
    const setAddFavInfo = useSetRecoilState(addFavoriteVideoInfo);
    const setDelFavInfo = useSetRecoilState(removeFavoriteVideoInfo);
    

    const handleFavVideo = (
        movieId?: number, 
        title?: string, 
        backPath?: string,
        postPath?: string,
        name?: string,
    ) => {
        if (movieId !== undefined && movieId !== null){
            const temp = {
                id: movieId ,
                title: (title === undefined) ? "" : title,
                backdrop_path: (backPath === undefined) ? "" : backPath,
                poster_path: (postPath === undefined) ? "" : postPath,
                name: (name === undefined) ? "" :  name,
            };
            if(favList?.includes(movieId)){
                setDelFav(movieId);
                setDelFavInfo(movieId);
            }else{
                setAddFav(movieId)
                setAddFavInfo(temp);
            }
        }
    }

    // 좋아요 투표한 영화/TV 추가 이벤트
    const votedList = user?.votedVideos;
    const setAddVoted =  useSetRecoilState(addVotedVideos);
    const setDelVoted = useSetRecoilState(removeVotedVideos);
    const handleVotedVideo = (movieId?: number) => {
        if (movieId !== undefined && movieId !== null){
            if(votedList?.includes(movieId)){
                setDelVoted(movieId);
            }else{
                setAddVoted(movieId);
            }
        }
    }

    return (
        <BodyContainer $isOpen={isOpenMainDetail}>
            {/* Header */}
            <MainHeader />
            <SubHeader>
                <div>
                    <SubHeaderWrapper>
                        <SubHeaderTitle>
                            <span>TV 시리즈</span>
                        </SubHeaderTitle>
                    </SubHeaderWrapper>
                </div>
            </SubHeader>
            <MainViewWrapper
                style={{
                    marginTop: "11rem",
                }}
            >
                <MainViewContainer>
                    {
                        mainData.map((item, idx) => (
                            <SlideContainer
                                key={idx}
                                style={{
                                    marginTop: "0",
                                    // marginBottom: "0"
                                }}
                            >
                                {/* content */}
                                <SlideContentWrapper>
                                    <div>
                                        <SlideLayerWrapper>
                                            <SlideContentContainer>
                                                {/* slider */}
                                                <SliderWrapper>
                                                    <AnimatePresence
                                                        initial={false}
                                                        // mode="wait"
                                                        >
                                                        <SliderContainer
                                                            variants={rowVariants} 
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            transition={{ type: "tween", duration: 0.7 }}
                                                        >
                                                            {/* slider item */}
                                                            {
                                                                item
                                                                .map((movie) => (
                                                                    
                                                                    <SliderItemWrapper
                                                                        layoutId={movie.id + "series" + idx}
                                                                        key={movie.id + "series" + idx} 
                                                                        whileHover="hover"
                                                                        initial="normal"
                                                                        variants={boxVariants}
                                                                        transition={{ type: "tween" }}
                                                                    >
                                                                        {/* <div> */}
                                                                            <SliderItemContainer>
                                                                                {/* <div> */}
                                                                                    <SliderItem>
                                                                                        <SliderImgContainer onClick={() => handleDetailInfo(movie.id, movie.name)}>
                                                                                            {/* img */}
                                                                                            <img 
                                                                                                decoding="async"
                                                                                                src={makeImagePath(movie.backdrop_path || movie.poster_path, "w500")} alt="" />
                                                                                            {/* title */}
                                                                                            <ContentPlayWrapper variants={infoVariants}>
                                                                                                <svg 
                                                                                                    style={{
                                                                                                        position: "relative",
                                                                                                        right: "none",
                                                                                                        top: "none",
                                                                                                        width: "",
                                                                                                    }}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true">
                                                                                                    <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </ContentPlayWrapper>
                                                                                            <SliderImgTitle>
                                                                                                <p>{movie.name}</p>
                                                                                            </SliderImgTitle>
                                                                                        </SliderImgContainer>   
                                                                                        {/* <MainTitleWrapper variants={infoVariants}>
                                                                                            <MainTitle>
                                                                                                {movie.title}
                                                                                            </MainTitle>
                                                                                        </MainTitleWrapper> */}
                                                                                        <ControlButtonContainer variants={infoVariants}>
                                                                                            {/* 재생 */}
                                                                                            <PlayButtonWrapper>
                                                                                                <PlayButtonContainer>
                                                                                                    <PlayButtonSvgWrapper>
                                                                                                        <PlayButtonSvg>
                                                                                                            <svg 
                                                                                                                style={{color: "white"}}
                                                                                                                xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CircleIStandard" aria-hidden="true">
                                                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor">
                                                                                                                </path>
                                                                                                            </svg>
                                                                                                        </PlayButtonSvg>
                                                                                                    </PlayButtonSvgWrapper>
                                                                                                    <PlayButtonGap />
                                                                                                    <PlayTitle 
                                                                                                        onClick={() => handleDetailInfo(movie.id, movie.name)}
                                                                                                        style={{color: "white"}}>상세 정보</PlayTitle>
                                                                                                </PlayButtonContainer>
                                                                                            </PlayButtonWrapper>

                                                                                            {/* 관심 */}
                                                                                            <WishButtonWrapper 
                                                                                                style={{
                                                                                                    position: "absolute",
                                                                                                    right: "20%",
                                                                                                }}
                                                                                                onClick={() => handleFavVideo(movie?.id, movie?.title, movie?.backdrop_path, movie?.poster_path, movie?.name)} key={"wish"} >
                                                                                                <WishButtonSvgWrapper>
                                                                                                    <WishButtonSvg>
                                                                                                        {/* not wish */}
                                                                                                        <svg 
                                                                                                            style={{display: movie?.id !== undefined ? favList?.includes(movie?.id) ? "none" : "" : ""}}
                                                                                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlusStandard" aria-hidden="true">
                                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor">
                                                                                                            </path>
                                                                                                        </svg>
                                                                                                        {/* wish */}
                                                                                                        <svg 
                                                                                                            style={{display: movie?.id !== undefined ? favList?.includes(movie?.id) ? "" : "none" : ""}}
                                                                                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                                                                                            </path>
                                                                                                        </svg>
                                                                                                    </WishButtonSvg>
                                                                                                </WishButtonSvgWrapper>
                                                                                            </WishButtonWrapper>
                                                                                            {/* 좋아요 */}
                                                                                            <WishButtonWrapper 
                                                                                                style={{
                                                                                                    position: "absolute",
                                                                                                    right: "2%",
                                                                                                }}
                                                                                                onClick={() => handleVotedVideo(movie?.id)}  key={"like"}>
                                                                                                <WishButtonSvgWrapper>
                                                                                                    <WishButtonSvg>
                                                                                                        {/* not like */}
                                                                                                        <svg 
                                                                                                            style={{display: movie?.id !== undefined ? votedList?.includes(movie?.id) ? "none" : "" : ""}}
                                                                                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpStandard" aria-hidden="true">
                                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor">
                                                                                                            </path>
                                                                                                        </svg>
                                                                                                        {/* like */}
                                                                                                        <svg 
                                                                                                            style={{display: movie?.id !== undefined ? votedList?.includes(movie?.id) ? "" : "none" : ""}}
                                                                                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpFillStandard" aria-hidden="true">
                                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.407 6.25579L13.313 5.50407C13.1342 4.07353 11.9181 3 10.4764 3C10.2133 3 10 3.21331 10 3.47644V6.7132C10 6.90062 9.94733 7.08427 9.848 7.2432L7.90742 10.3481C7.64516 10.7677 7.23665 11.0752 6.76086 11.2112L4.72528 11.7928C4.29598 11.9154 4 12.3078 4 12.7543V18.3161C4 18.6938 4.30618 19 4.68387 19C5.874 19 7.04352 19.3106 8.07684 19.9011L8.25 20C9.39679 20.6553 10.6947 21 12.0156 21H13H16H16.5C17.3284 21 18 20.3284 18 19.5C18 19.1158 17.8556 18.7654 17.6181 18.5H18C18.8284 18.5 19.5 17.8284 19.5 17C19.5 16.4601 19.2147 15.9868 18.7867 15.7226C19.478 15.5888 20 14.9804 20 14.25C20 13.4216 19.3284 12.75 18.5 12.75H18.3294C18.7336 12.4813 19 12.0217 19 11.5C19 10.6716 18.3284 10 17.5 10H13.125L13.407 7.74421C13.4688 7.24999 13.4688 6.75001 13.407 6.25579Z" fill="currentColor">
                                                                                                            </path>
                                                                                                        </svg>
                                                                                                    </WishButtonSvg>
                                                                                                </WishButtonSvgWrapper>
                                                                                            </WishButtonWrapper>

                                                                                        </ControlButtonContainer>
                                                                                    </SliderItem>

                                                                                {/* </div> */}
                                                                                {/* <div></div> */}
                                                                            </SliderItemContainer>
                                                                        {/* </div> */}

                                                                    </SliderItemWrapper>
                                                                    
                                                                ))
                                                            }

                                                        </SliderContainer>
                                                    </AnimatePresence>
                                                </SliderWrapper>
                                            </SlideContentContainer>
                                        </SlideLayerWrapper>
                                    </div>
                                </SlideContentWrapper>
                            </SlideContainer>
                        ))
                    }
                </MainViewContainer>
            </MainViewWrapper>
            {/* Popup */}
            {
                isOpenMainDetail && 
                <>
                    <Detail 
                        onModalClose={setIsOpenMainDetail}
                        isOpen={isOpenMainDetail} 
                        movieId={movieInfo.movieId} 
                        title={movieInfo.movieTitle} 
                        to={"/home/series"}
                        from={"series"}
                    />
                </>
            }
        </BodyContainer>
    );
}

export default Series;