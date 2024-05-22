import styled from 'styled-components';

import { getMovieVideos,
    IGetMovieDetails, getMovieDetails,
    IGetMovieCredits, getMovieCredits,
    IGetMoviesSimilar, getMoviesSimilar,
    getSeriesVideos,
    getSeriesDetails,
    getSeriesCredits,
    getSeriesSimilar
 } from '../api';
 
import { makeVideoPath, convertToTime, makeImagePath } from '../utils';
import { useQuery } from 'react-query';

import ReactPlayer from 'react-player';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'; 

import { userSelector, addFavoriteVideo, 
        removeFavoriteVideo, 
        IUser, addVotedVideos, 
        removeVotedVideos, changeMute,
        addFavoriteVideoInfo, removeFavoriteVideoInfo
    } from '../atoms';
import { useSetRecoilState, useRecoilValue } from "recoil";


const MainWrapper = styled.div<{$isOpen?:boolean}>`
    /* display: ${(props) => props.$isOpen ? "" : "none"}; */
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
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    will-change: scroll-position;
    height: 100%;
    width: 100%;    
    z-index: 100;
    /* border: 10px solid red; */
`;

const MainContainer = styled.div`
    background-color: #181818 !important;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    box-sizing: inherit;
    background-color: transparent;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    overflow: hidden;
    will-change: transform;
    position: inherit;
    transform-origin: 50% 12.5%;
    top: 2em;
    width: 850px;
    opacity: 1;
    left: auto;
    transform: none;
    margin-bottom: 2em;
    min-width: 850px;
    /* z-index: 2;     */
`;

const PreviewContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    background-color: #000;
    position: relative;
    box-sizing: inherit;
    cursor: auto;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    overflow: hidden;    
`;

const PreviewVideoWrapper = styled.div`
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
    /* position: absolute; */
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const PreviewVideoContainer = styled.div`
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
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden; 
    div > iframe {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: auto;
        display: inline-block;
        vertical-align: baseline;
        box-sizing: inherit;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }   
    img {
        display: inline-block;
        vertical-align: baseline;
        box-sizing: inherit;
        /* position: absolute; */
        width: 100%;
        height: 100%;
    }
`;

const DetailBackgound = styled.div<{$isOpen?:boolean}>`
    /* display: ${(props) => props.$isOpen ? "" : "none"}; */
    z-index: 99;
    overflow-y: auto;
    position: relative;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    opacity: 0.7;   
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
        background-color: #000;
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
    } 
`;

const PlayerCover = styled.div`
    color: white;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    width: 100%;
    height: 300px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1) 12%, rgba(0, 0, 0, 0) 0%);
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    -webkit-box-pack: justify;
    justify-content: space-between;    
    width: 100%;
    height: 100%;
`;
const PlayerCover2 = styled.div`
    color: white;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    width: 100%;
    height: 300px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 0%);
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    -webkit-box-pack: justify;
    justify-content: space-between;    
    width: 100%;
    height: 100%;
`;

const ModalCloseWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    cursor: pointer;
    margin: 1em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    display: block;
    opacity: 1;
`;

const ModalCloseSvg = styled.span`
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
        background-color: #181818;
        border-radius: 50%;
        height: 36px;
        padding: 8px;
        width: 36px;
    }
`;

const VideoControlContainer = styled.div`
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
    bottom: 22%;
    left: 3em;
    position: absolute;
    width: 40%;    
`;

const ControlButtonContainer = styled.div`
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
`;

const PlayButtonWrapper = styled.a`
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
    margin: .25em;
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
    background-color: white;
    color: black;
    padding-left: 1rem;
    padding-right: 1.2rem;
    max-height: 42px;
    min-height: 32px;    
    &:hover {
        background-color: #e6e6e6 !important;
        border-color: #fff;
    }
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
    box-sizing: inherit;
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
        color: black;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: 100%;
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

const PlayTitle = styled.span`
    -webkit-text-size-adjust: 100%;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.4rem;    
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
    padding: 0.1rem;
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

const MainTitleWrapper = styled.div`
    width: 1000px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transform-origin: left bottom;
    transform: scale(1) translate3d(0px, 0px, 0px);
    transition-duration: 1300ms;
    transition-delay: 0ms;    
`;

const MainTitle = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transform-origin: left bottom;
    transform: scale(1) translate3d(0px, 0px, 0px);
    transition-duration: 1300ms;
    transition-delay: 0ms;

    font-size: 3rem;
    font-weight: 500;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
    /* background-color: rgba(0, 0, 0, 0.35); */
`;

const InfoWrapper = styled.div`
    /* bottom: 0%; */
    /* padding: 22px 0; */
    /* position: absolute; */
    padding: 0 3em;
    margin-top: -122px;
    position: relative;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    background-color: #181818;
    opacity: 1;
`;

const InfoContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    /* padding: 0 3em; */
    padding: 2rem 0 0 0;
    box-sizing: inherit;
`;

const InfoTrackWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        box-sizing: inherit;
    }
`;

const InfoTrackContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    background-color: #181818;
    display: grid;
    position: relative;
    width: 100%;
    box-sizing: inherit;
    column-gap: 2em;
    grid-template-columns: minmax(0,2fr) minmax(0,1fr);
`;

const InfoDetailContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
`;

const InfoDetail = styled.p`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    box-sizing: inherit;
    margin-bottom: .5em;
    font-size: 14px;
    line-height: 24px;
    /* div{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        color: #fff;
        font-size: 14px;
        line-height: 24px;
        box-sizing: inherit;
    }    */
`;

const InfoCastContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    display: flex;
    flex-direction: column;    
`;

const InfoCastDetailContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    margin: .5em .5em .5em 0;
    word-break: break-word;
    box-sizing: inherit;
`;

const CastLabel = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    box-sizing: inherit;
    color: #777;    
`;

const CastItem = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    box-sizing: inherit;
    color: #ddd;
    cursor: pointer;
    margin: 0;
    outline-color: #fff;
`;

const CastItemMore = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    box-sizing: inherit;
    color: #ddd;
    cursor: pointer;
    margin: 0;
    outline-color: #fff;
    font-style: italic;
    a {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        font-size: 14px;
        line-height: 20px;
        word-break: break-word;
        font-style: italic;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
        box-sizing: inherit;
    }
`;

const InfoMetaInfo = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    margin: .8em 0;  
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        box-sizing: inherit;
    }  
`;

const MetaInfo = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    align-items: center;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    box-sizing: inherit;    
`;

const MetaData = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    box-sizing: inherit;
    align-items: center;
    color: #bcbcbc;
    display: flex;
    flex-wrap: wrap;
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 16px;
        color: #bcbcbc;
        box-sizing: inherit;
        margin-right: .5em;
    }
    span {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 16px;
        color: #bcbcbc;
        box-sizing: inherit;
        margin-right: .5em;
        white-space: nowrap;
    }
`;

const VoteRateWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: .5em;    
`;

const VoteRateContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-weight: 500;
    line-height: 24px;    
`;

const VoteRateSvg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    box-sizing: inherit;
    background-color: rgb(229, 9, 20);
    height: 24px;
    width: 24px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 2px;
    svg{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        fill: none;
        box-sizing: inherit;
        width: 16px;
        height: 16px;
        overflow: hidden;
    }    
`;

const VoteRate = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-weight: 500;
    box-sizing: inherit;
    font-size: 16px;
    line-height: 24px;
    margin-left: 0.5em;    
`;

const SimilarWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;    
`;

const SimilarContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    background-color: #181818;
    box-sizing: inherit;    
`;

const SimilarTitle = styled.h3`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    box-sizing: inherit;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 48px;   
`;

const ContentWrapper = styled.div<{$isMore:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    overflow: hidden;
    max-height: ${(props) => props.$isMore ? "" :  "65em"};
`;

const ContentContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    grid-gap: 1em;
    align-items: stretch;
    display: grid;
    justify-items: stretch;
    grid-template-columns: repeat(3,1fr);
    box-sizing: inherit;
`;

const ContentItemContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    border-radius: .25em;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    flex: 0 0 31%;
    min-height: 22em;
    box-sizing: inherit;
    height: 100%;
    margin: .1em;    
`;

const ContentImageWrapper = styled.div`
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
    overflow: hidden;
    position: relative;    
`;

const ContentImage = styled.div`
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
    img {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        border: 0;
        box-sizing: inherit;
        display: block;
        width: 100%;
    }
`;

const ContentPlayWrapper = styled.div`
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
    &:hover{
        opacity: 1;
    }
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

// const ContentTime = styled.span`
//     text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
//     -webkit-text-size-adjust: 100%;
//     -webkit-font-smoothing: antialiased;
//     user-select: none;
//     word-break: keep-all;
//     font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
//     line-height: 1.4;
//     color: #fff;
//     font-size: 16px;
//     cursor: pointer;
//     box-sizing: inherit;
//     position: absolute;
//     right: 5%;
//     top: 5%;
//     white-space: nowrap;    
// `;

const ContentCardContainer = styled.div`
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
    background-color: #2f2f2f;
    min-height: 100%;
    div {
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
    }
`;

const ContentCardMetaContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 1em;
    box-sizing: inherit;    
`;

const ContentCardRightWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    box-sizing: inherit;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    min-width: unset;
    padding: 0;
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 16px;
        cursor: pointer;
        box-sizing: inherit;
        align-items: center;
        color: #bcbcbc;
        display: flex;
        flex-wrap: wrap;
    }
`;

const ContentCardYear = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    cursor: pointer;
    color: #bcbcbc;
    box-sizing: inherit;
    margin-right: .5em;
    order: 2;
`;

const ContentCardLeftWrapper = styled.div`
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
    position: relative;    
`;

const ContentCardSvgWrapper = styled.div`
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
`;

const ContentCardButton = styled.button`
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
    &:hover{
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

const ContentSvg = styled.div`
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
    height: 1.8rem;
    width: 1.8rem;
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
        height: 55%;
        width: auto;
    }
`;

const ContentOverViewWrapper = styled.p`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    box-sizing: inherit;
    color: #d2d2d2;
    margin: 0;
    padding: 0 1em 1em;    
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        cursor: pointer;
        font-size: 14px;
        line-height: 20px;
        color: #d2d2d2;
        box-sizing: inherit;
    }
`;

const ContentOverView = styled.div`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    color: #d2d2d2;
    box-sizing: inherit;
`;

const DetailWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        background-color: #181818;
        padding-bottom: 1em;
        box-sizing: inherit;
    }    
`;

const DetailHeaderWrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    h3 {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        box-sizing: inherit;
        font-size: 24px;
        /* margin-bottom: 20px; */
        margin-top: 48px;
        font-weight: 400;
    }    
`;

const DetailContentContainer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        cursor: default;
        user-select: none;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        /* margin: .5em .5em .5em 0; */
        word-break: break-word;
        box-sizing: inherit;
    }
`;

const DetailLabel = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    box-sizing: inherit;
    color: #777;    
`;

const DetailContent = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    box-sizing: inherit;
    color: #ddd;
    cursor: pointer;
    margin: 0;
    outline-color: #fff;
`;

const VideoMuteWrapper = styled.div`
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
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    overflow: hidden;
    bottom: 22%;
    margin-bottom: 1em;
    right: 3em;
    opacity: 0.4;
    display: block;   
    &:hover{
        opacity: 1;
    } 
`;

const VideoMuteButtonWrapper = styled.div`
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
`;

const VideoMuteButton = styled.button`
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
    /* padding: 0.8rem; */
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
    &:hover{
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

const MuteSvg = styled.div`
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
    height: 1.4rem;
    width: 1.4rem;
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

const ContentMoreWrapper = styled.div<{$isMore:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    border-bottom: 2px solid #404040;
    box-shadow: none;
    display: flex;
    height: 6em;
    justify-content: center;
    margin: auto;
    position: relative;
    width: 100%;
    box-sizing: inherit;
    background-image: linear-gradient(0deg,#181818 0,hsla(0,0%,9%,.7) 20%,hsla(0,0%,9%,.4) 30%,transparent 50%);
    margin-top: ${(props) => props.$isMore ? "" : "-6em"};    
`;

const ContentMoreButtonWrapper = styled.button`
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
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    border-radius: 50%;
    bottom: 0;
    position: absolute;
    transform: translateY(50%);
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
    &:hover{
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

const MoreButtonSvg = styled.div`
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
    height: 1.8rem;
    width: 1.8rem;
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
        /* width: auto; */
    }    
`;


interface IProps {
    onModalClose:(data:boolean) => void,
    isOpen:boolean,
    movieId?:number,
    title?:string,
    to?:string,
    from?:string,
}

// interface IGenre {
//     id: number,
//     name: string,
// }


function Detail(props:IProps) {

    // 사용자 local 가져오기 
    const user = useRecoilValue<IUser | null>(userSelector);

    // video 데이터 가져오기
    const videoKey = props.from === "series" ? ["series", "videos"] : ["movies", "videos"];
    const videoFn = props.from === "series" ? () => getSeriesVideos(props.movieId) : () => getMovieVideos(props.movieId);
    
    const { data } = useQuery(videoKey, videoFn);

    const handlePlayerReady = () => {
        // const iframe = document.querySelector(".react-player > div > iframe")  as HTMLIFrameElement | null;
    };

    // 영화 detail 데이터 가져오기
    const detailKey = props.from === "series" ? ["series", "details"] : ["movies", "details"];
    const detailFn = props.from === "series" ? () => getSeriesDetails(props.movieId) : () => getMovieDetails(props.movieId);
    
    const { data: detail } = useQuery<IGetMovieDetails>(detailKey, detailFn);

    // 영화 credits 데이터 가져오기
    const credeitKey = props.from === "series" ? ["series", "credits"] : ["movies", "credits"];
    const credeitFn = props.from === "series" ? () => getSeriesCredits(props.movieId) : () => getMovieCredits(props.movieId);

    const { data: credits } = useQuery<IGetMovieCredits>(credeitKey, credeitFn);

    // 비슷한 콘텐츠 데이터 가져오기
    const similarKey = props.from === "series" ? ["series", "similar"] : ["movies", "similar"];
    const similarFn = props.from === "series" ? () => getSeriesSimilar(props.movieId) : () => getMoviesSimilar(props.movieId);

    const { data: similar } = useQuery<IGetMoviesSimilar>(similarKey, similarFn);

    // 비슷한 콘텐츠 더보기 버튼 이벤트
    const [isMore, setIsMore] = useState(false);
    const handleContentMore = () => {
        setIsMore(!isMore);
    }

    // 영상 음소거 버튼 이벤트
    const [isMute, setIsMute] = useState(user !== null ? user.muted : false);
    const setMute = useSetRecoilState(changeMute);
    const handleVideoMute = () => {
        if(user !== null){
            setMute(!isMute);
        }
        setIsMute(!isMute);
    }

    // 모달 닫기 이벤트
    const history = useHistory();
    const [isClose, setIsClose] = useState(false);
    const handleModalClose = () => {
        setIsClose(!isClose);
        props.onModalClose(false);
        if(props.to){
            history.push(props.to);
        }else{
            history.push(`/home`);
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
    const setAddVoted = useSetRecoilState(addVotedVideos);
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
        <>
            <MainWrapper tabIndex={-1}>
                <MainContainer>
                    {/* video */}
                    <PreviewContainer>
                        <PreviewVideoWrapper>
                            {/* video */}
                            <PreviewVideoContainer>
                                {
                                    data?.results[0] ? 
                                    <ReactPlayer 
                                    url={data?.results[0] && makeVideoPath(data?.results[0].key)}
                                    playing={true}
                                    loop={true}
                                    controls={false}
                                    className="react-player"
                                    onReady={handlePlayerReady}
                                    width="150%"
                                    height="600px"
                                    muted={isMute}
                                    config={{
                                        youtube: {
                                                playerVars: { 
                                                    disablekb: 1, 
                                                    modestbranding: 1,
                                                } 
                                            }
                                        }}
                                    /> :
                                    <img alt=''
                                    src={detail?.backdrop_path ? makeImagePath(detail?.backdrop_path) : ""} />
                                }
                                
                                <PlayerCover />
                                <PlayerCover2 />
                                
                                {/* <LogoOverlay /> */}
                                {/* <video controls>
                                    <source src={data?.results[0] && makeVideoPath(data?.results[0].key)} type="video/mp4" />
                                </video> */}
                            </PreviewVideoContainer>
                            {/* 재생 && 관심 && 좋아요 */}
                            <VideoControlContainer>
                                {/* Title */}
                                <MainTitleWrapper>
                                    <MainTitle>
                                        {props.title}
                                    </MainTitle>
                                </MainTitleWrapper>

                                <ControlButtonContainer>
                                    {/* 재생 */}
                                    <PlayButtonWrapper>
                                        <PlayButtonContainer>
                                            <PlayButtonSvgWrapper>
                                                <PlayButtonSvg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true">
                                                        <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </PlayButtonSvg>
                                            </PlayButtonSvgWrapper>
                                            <PlayButtonGap />
                                            <PlayTitle>재생</PlayTitle>
                                        </PlayButtonContainer>
                                    </PlayButtonWrapper>
                                    {/* 관심 */}
                                    <WishButtonWrapper onClick={() => handleFavVideo(detail?.id, detail?.title, detail?.backdrop_path, detail?.poster_path, detail?.name)} >
                                        <WishButtonSvgWrapper>
                                            <WishButtonSvg>
                                                {/* not wish */}
                                                <svg 
                                                    style={{display: detail?.id !== undefined ? favList?.includes(detail?.id) ? "none" : "" : ""}}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlusStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                {/* wish */}
                                                <svg 
                                                    style={{display: detail?.id !== undefined ? favList?.includes(detail?.id) ? "" : "none" : ""}}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                            </WishButtonSvg>
                                        </WishButtonSvgWrapper>
                                    </WishButtonWrapper>
                                    {/* 좋아요 */}
                                    <WishButtonWrapper onClick={() => handleVotedVideo(detail?.id)} >
                                        <WishButtonSvgWrapper>
                                            <WishButtonSvg>
                                                {/* not like */}
                                                <svg 
                                                    style={{display: detail?.id !== undefined ? votedList?.includes(detail?.id) ? "none" : "" : ""}}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                {/* like */}
                                                <svg 
                                                    style={{display: detail?.id !== undefined ? votedList?.includes(detail?.id) ? "" : "none" : ""}}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpFillStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.407 6.25579L13.313 5.50407C13.1342 4.07353 11.9181 3 10.4764 3C10.2133 3 10 3.21331 10 3.47644V6.7132C10 6.90062 9.94733 7.08427 9.848 7.2432L7.90742 10.3481C7.64516 10.7677 7.23665 11.0752 6.76086 11.2112L4.72528 11.7928C4.29598 11.9154 4 12.3078 4 12.7543V18.3161C4 18.6938 4.30618 19 4.68387 19C5.874 19 7.04352 19.3106 8.07684 19.9011L8.25 20C9.39679 20.6553 10.6947 21 12.0156 21H13H16H16.5C17.3284 21 18 20.3284 18 19.5C18 19.1158 17.8556 18.7654 17.6181 18.5H18C18.8284 18.5 19.5 17.8284 19.5 17C19.5 16.4601 19.2147 15.9868 18.7867 15.7226C19.478 15.5888 20 14.9804 20 14.25C20 13.4216 19.3284 12.75 18.5 12.75H18.3294C18.7336 12.4813 19 12.0217 19 11.5C19 10.6716 18.3284 10 17.5 10H13.125L13.407 7.74421C13.4688 7.24999 13.4688 6.75001 13.407 6.25579Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                            </WishButtonSvg>
                                        </WishButtonSvgWrapper>
                                    </WishButtonWrapper>

                                </ControlButtonContainer>
                            </VideoControlContainer>
                            {/* 음소거 */}
                            <VideoMuteWrapper>
                                <VideoMuteButtonWrapper>
                                    <VideoMuteButton onClick={handleVideoMute}>
                                        <div>
                                            <MuteSvg>
                                                {/* off */}
                                                <svg 
                                                    style={{display: isMute ? "" : "none"}}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="VolumeOffStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                {/* on */}
                                                <svg 
                                                    style={{display: isMute ? "none" : ""}}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="VolumeHighStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                            </MuteSvg>
                                        </div>
                                    </VideoMuteButton>
                                </VideoMuteButtonWrapper>
                            </VideoMuteWrapper>
                        </PreviewVideoWrapper>
                    </PreviewContainer>
                    {/* close */}
                    <ModalCloseWrapper>
                        <ModalCloseSvg>
                            <svg onClick={handleModalClose} 
                                xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="XStandard" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z" fill="currentColor">
                                </path>
                            </svg>        
                        </ModalCloseSvg>
                    </ModalCloseWrapper>
                    {/* info */}
                    <InfoWrapper >
                        <InfoContainer>
                            <InfoTrackWrapper>
                                <div>
                                    <InfoTrackContainer>
                                        {/* detail */}
                                        <InfoDetailContainer>
                                            <InfoMetaInfo>
                                                <div>
                                                    <div>
                                                        <MetaInfo>
                                                            <MetaData>
                                                                <div>{detail?.release_date ? detail?.release_date.split("-")[0] : detail?.first_air_date.split("-")[0]}</div>
                                                                <div> | {detail?.runtime ? convertToTime(detail?.runtime) : detail?.seasons.length + ` 개의 시즌` }</div>
                                                                <span> {detail?.belongs_to_collection ? detail?.belongs_to_collection.name ? ` | ` + detail?.belongs_to_collection.name : "" : ""}</span>
                                                            </MetaData>
                                                        </MetaInfo>
                                                    </div>
                                                </div>
                                            </InfoMetaInfo>
                                            {/* vote */}
                                            <VoteRateWrapper>
                                                <VoteRateContainer>
                                                    <VoteRateSvg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpFillStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.407 6.25579L13.313 5.50407C13.1342 4.07353 11.9181 3 10.4764 3C10.2133 3 10 3.21331 10 3.47644V6.7132C10 6.90062 9.94733 7.08427 9.848 7.2432L7.90742 10.3481C7.64516 10.7677 7.23665 11.0752 6.76086 11.2112L4.72528 11.7928C4.29598 11.9154 4 12.3078 4 12.7543V18.3161C4 18.6938 4.30618 19 4.68387 19C5.874 19 7.04352 19.3106 8.07684 19.9011L8.25 20C9.39679 20.6553 10.6947 21 12.0156 21H13H16H16.5C17.3284 21 18 20.3284 18 19.5C18 19.1158 17.8556 18.7654 17.6181 18.5H18C18.8284 18.5 19.5 17.8284 19.5 17C19.5 16.4601 19.2147 15.9868 18.7867 15.7226C19.478 15.5888 20 14.9804 20 14.25C20 13.4216 19.3284 12.75 18.5 12.75H18.3294C18.7336 12.4813 19 12.0217 19 11.5C19 10.6716 18.3284 10 17.5 10H13.125L13.407 7.74421C13.4688 7.24999 13.4688 6.75001 13.407 6.25579Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                    </VoteRateSvg> 
                                                    <VoteRate>{detail?.vote_average}</VoteRate>
                                                    <VoteRate style={{fontWeight: "200"}}> / 10</VoteRate>
                                                </VoteRateContainer>
                                            </VoteRateWrapper>
                                            <InfoDetail>
                                                {/* <div></div> */}
                                                {detail?.overview}
                                            </InfoDetail>
                                        </InfoDetailContainer>
                                        {/* cast */}
                                        <InfoCastContainer>
                                            <InfoCastDetailContainer>
                                                <CastLabel>출연: </CastLabel>
                                                {credits?.cast.map((item, index, arr) => (
                                                    <span key={item.id + "casts"}>
                                                        <CastItem> 
                                                            {index <=2 ? item.name : null}
                                                            {index >= 2 ? null : ", "}
                                                        </CastItem>
                                                        {index === 2 && credits?.cast.length >= 3 && 
                                                            (
                                                                <CastItemMore>
                                                                    <a href="#about">, 더보기, </a>
                                                                </CastItemMore>
                                                            )
                                                        }
                                                    </span>
                                                ))}
                                                
                                                
                                            </InfoCastDetailContainer>
                                            {/* genres */}  
                                            <InfoCastDetailContainer>
                                                <CastLabel>장르: </CastLabel>
                                                {detail?.genres.map((item, index, arr) => (
                                                    <CastItem key={item.id + "genres"}>
                                                        {item.name}
                                                        {index === arr.length - 1 ? null : ", "}
                                                    </CastItem>
                                                ))}
                                            </InfoCastDetailContainer>
                                        </InfoCastContainer>
                                    </InfoTrackContainer>
                                </div>
                            </InfoTrackWrapper>
                        </InfoContainer>
                    </InfoWrapper>
                    {/* similar */}
                    <InfoWrapper style={{marginTop:0}}>
                        <SimilarWrapper>
                            <SimilarContainer>
                                <SimilarTitle>함께 시청된 콘텐츠</SimilarTitle>
                                <ContentWrapper $isMore={isMore}>
                                    <ContentContainer>
                                        {/* item */}
                                        {
                                            similar?.results.map((item, idx) => (
                                                item.backdrop_path === null || item.overview === "" ? null 
                                                : 
                                                <ContentItemContainer key={idx}>
                                                    {/* image */}
                                                    <ContentImageWrapper>
                                                        <ContentImage>
                                                            <img src={item.backdrop_path === null ? "" : makeImagePath(item.backdrop_path)} alt="" />
                                                        </ContentImage>
                                                        <ContentPlayWrapper>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true">
                                                                <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor">
                                                                </path>
                                                            </svg>
                                                        </ContentPlayWrapper>
                                                        {/* <ContentTime>1시간 47분</ContentTime> */}
                                                    </ContentImageWrapper>
                                                    {/* card */}
                                                    <ContentCardContainer>
                                                        <div>
                                                            <ContentCardMetaContainer>
                                                                <ContentCardRightWrapper>
                                                                    <div>
                                                                        <ContentCardYear style={{fontWeight: 500, fontSize: "18px"}}>{item.title ? item.title : item.name}</ContentCardYear>
                                                                        <ContentCardYear>{item.release_date ? 
                                                                                                item.release_date.split("-")[0] : 
                                                                                                item.first_air_date ? item.first_air_date.split("-")[0] : ""}</ContentCardYear>
                                                                    </div>
                                                                </ContentCardRightWrapper>
                                                                <div>
                                                                    <ContentCardLeftWrapper>
                                                                        <ContentCardSvgWrapper>
                                                                            {/* 관심있는 콘텐츠 */}
                                                                            <ContentCardButton onClick={() => handleFavVideo(item?.id, item?.title, item?.backdrop_path, "", item?.name)}>
                                                                                <div>
                                                                                    <ContentSvg>
                                                                                        {/* not wish */}
                                                                                        <svg 
                                                                                            style={{display: item?.id !== undefined ? favList?.includes(item?.id) ? "none" : "" : ""}}
                                                                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlusStandard" aria-hidden="true">
                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor">
                                                                                            </path>
                                                                                        </svg>
                                                                                        {/* wish */}
                                                                                        <svg 
                                                                                            style={{display: item?.id !== undefined ? favList?.includes(item?.id) ? "" : "none" : ""}}
                                                                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                                                                            </path>
                                                                                        </svg>
                                                                                    </ContentSvg>
                                                                                </div>
                                                                            </ContentCardButton>
                                                                        </ContentCardSvgWrapper>
                                                                    </ContentCardLeftWrapper>
                                                                </div>
                                                            </ContentCardMetaContainer>
                                                            <ContentOverViewWrapper>
                                                                <div>
                                                                    <ContentOverView>
                                                                        {item.overview}
                                                                    </ContentOverView>
                                                                </div>
                                                            </ContentOverViewWrapper>
                                                        </div>
                                                    </ContentCardContainer>
                                                </ContentItemContainer>

                                            ))
                                        }
                                    </ContentContainer>
                                </ContentWrapper>
                                {/* 콘텐츠 더보기 */}
                                <ContentMoreWrapper $isMore={isMore}>
                                    <ContentMoreButtonWrapper onClick={handleContentMore}>
                                        <div>
                                            <MoreButtonSvg>
                                                {/* close */}
                                                <svg 
                                                    style={{display : isMore ? "none" : ""}}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ChevronDownStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 15.5859L19.2928 8.29297L20.7071 9.70718L12.7071 17.7072C12.5195 17.8947 12.2652 18.0001 12 18.0001C11.7347 18.0001 11.4804 17.8947 11.2928 17.7072L3.29285 9.70718L4.70706 8.29297L12 15.5859Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                {/* open */}
                                                <svg
                                                    style={{display : isMore ? "" : "none"}} 
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ChevronUpStandard" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 8.41409L19.2929 15.707L20.7071 14.2928L12.7071 6.29277C12.5196 6.10523 12.2652 5.99988 12 5.99988C11.7348 5.99988 11.4804 6.10523 11.2929 6.29277L3.29291 14.2928L4.70712 15.707L12 8.41409Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                            </MoreButtonSvg>
                                        </div>
                                    </ContentMoreButtonWrapper>
                                </ContentMoreWrapper>
                            </SimilarContainer>
                        </SimilarWrapper>
                    </InfoWrapper>
                    {/* Detail */}
                    <InfoWrapper style={{marginTop:0}} id="about">
                        <DetailWrapper>
                            <div>
                                {/* header */}
                                <DetailHeaderWrapper>
                                    <h3>
                                        <strong>'{detail?.title ? detail?.title : detail?.name}' </strong>
                                        상세 정보
                                    </h3>
                                </DetailHeaderWrapper>
                                {/* content */}
                                <DetailContentContainer>
                                    {/* item */}
                                    {
                                        props.from === "series"
                                        ?
                                        <div>
                                            <DetailLabel>크리에이터: </DetailLabel>
                                            {credits?.crew.map((item, index, arr) => (
                                                <DetailContent key={item.id + "creator"}>
                                                    {
                                                        item.known_for_department === "Writing" ?
                                                        item.name : null
                                                    }
                                                </DetailContent>
                                            ))}
                                        </div>
                                        :
                                        <div>
                                            <DetailLabel>감독: </DetailLabel>
                                            {credits?.crew.map((item, index, arr) => (
                                                <DetailContent key={index + "director"}>
                                                    {
                                                        item.job === "Director" ?
                                                        item.name : null
                                                    }
                                                </DetailContent>
                                            ))}
                                        </div>
                                    }
                                    
                                    <div>
                                        <DetailLabel>출연: </DetailLabel>
                                        {credits?.cast.map((item, index, arr) => (
                                            <DetailContent key={item.id + "cast"}>
                                                {item.name}
                                                {index === arr.length - 1 ? null : ", "}
                                            </DetailContent>
                                        ))}
                                    </div>
                                    {
                                        props.from === "series"
                                        ?
                                        null 
                                        :
                                        <div>
                                            <DetailLabel>각본: </DetailLabel>
                                            {credits?.crew.map((item, index, arr) => (
                                                <DetailContent key={index + "write"}>
                                                    {
                                                        item.job === "Writer" ?
                                                        item.name : null
                                                    }
                                                </DetailContent>
                                            ))}
                                        </div>
                                    }
                                    <div>
                                        <DetailLabel>장르: </DetailLabel>
                                        {detail?.genres.map((item, index, arr) => (
                                        <DetailContent key={index + "genre"}>
                                            {item.name}
                                            {index === arr.length - 1 ? null : ", "}
                                        </DetailContent>
                                    ))}
                                    </div>
                                </DetailContentContainer>
                            </div>
                        </DetailWrapper>
                    </InfoWrapper>
                </MainContainer>
            </MainWrapper>
            <DetailBackgound $isOpen={props.isOpen} tabIndex={-1}>
                <div tabIndex={-1}>
                </div>
            </DetailBackgound>
            
        </>
    );
}

export default Detail;