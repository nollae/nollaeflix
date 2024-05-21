import { useHistory, useRouteMatch } from 'react-router-dom'; 

import { loginState, useResetAllStates } from '../atoms';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';

import styled from "styled-components";

const Header_Container = styled.div`
    overflow: visible;
    height: 0;
    position: relative;
    z-index: 1;
    header {
        padding-left: 2rem;
        padding-right: 2rem;
        width: inherit;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        margin: auto;
        display: block;
    }
`;

const Header_Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: inherit;
    height: auto;
`;

const Header_Div_Wrapper = styled.div`
    margin-left: -0.5rem;
    width: calc(100% + 0.5rem);
    display: inline-flex;
    flex-wrap: wrap;
    height: inherit;
    margin-top: -0.5rem;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0px;
    /* box-sizing: border-box; */
`;

const Header_Logo_Wrapper = styled.div`
    width: auto;
    flex: 0 auto;
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0px;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    /* box-sizing: border-box; */
    span {
        /* box-sizing: border-box; */
    }
`;

const Header_Svg = styled.svg`
    width: 5.5625rem;
    height: 1.5rem;
    color: rgb(229, 9, 20);
    fill: currentColor;
    display: block;
    /* box-sizing: border-box; */
`;

const Header_Svg_Span = styled.span`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    box-sizing: border-box;
`;

const Header_Content_Wrapper = styled.div`
    width: auto;
    flex: 0 auto;
    display: inline-flex;
    flex-wrap: wrap;
    -webkit-box-pack: end;
    justify-content: flex-end;
    padding: 0px;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
`;

const Header_Content_Div_Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: inherit;
    height: auto;
`;

const Header_Content_Container = styled.div`
    margin-left: -0.5rem;
    width: calc(100% + 0.5rem);
    display: inline-flex;
    flex-wrap: wrap;
    height: inherit;
    margin-top: -0px;
    flex-direction: row;
    -webkit-box-pack: end;
    justify-content: flex-end;
    padding: 0px;
    /* box-sizing: border-box; */
`;

const Header_Content_Lang_Container = styled.div`
    width: auto;
    flex: 0 auto;
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0px;
    margin-left: 0.5rem;
    margin-top: 0px;
    /* box-sizing: border-box; */
    span{
        /* box-sizing: border-box; */
    }
`;

const Lang_Container = styled.div`
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    vertical-align: text-top;
    box-sizing: border-box;
`;

const Lang_Label = styled.label`
    right: 2.5rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 0.875rem;
    position: absolute;
    z-index: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition-property: top, font-size, line-height;
    transition-duration: 250ms;
    pointer-events: none;
    transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
    left: 2.25rem;
    top: 0rem;
    display: block;
    user-select: none;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    box-sizing: border-box;
`;

const Lang_Detail_Container = styled.div`
    min-width: auto;
    width: auto;
    font-size: 1rem;
    font-weight: 400;
    color: rgb(255, 255, 255);
    fill: currentColor;
    padding: 0;
    -webkit-box-align: center;
    align-items: center;
    display: inline-flex;
    gap: 2px;
    letter-spacing: normal;
    line-height: 100%;
    position: relative;
    text-align: left;
    z-index: 0;
    box-sizing: border-box;
`;

const Lang_Svg_Wrapper = styled.div`
    position: absolute;
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    left: 0.75rem;
    right: auto;
    box-sizing: border-box;
    svg {
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }
`;

const Lang_Select = styled.select`
    min-width: auto;
    width: auto;
    padding-right: 2.25rem;
    line-height: 1.25rem !important;
    color: inherit;
    filter: opacity(100%);
    padding-left: 2.25rem;
    padding-bottom: 0.375rem;
    padding-top: 0.375rem;
    min-height: 16px;
    animation: animation-14hycbg;
    appearance: none;
    background: transparent;
    background-clip: padding-box;
    border: 0 solid transparent;
    font: inherit;
    letter-spacing: inherit;
    margin: 0;
    text-align: inherit;
    text-decoration: inherit;
    text-transform: inherit;
    box-sizing: border-box;
`;

const Lang_Select_Option = styled.option`
    color: initial;
    background: initial;
    box-sizing: border-box;
`;

const Lang_Arrow_Svg_Wrapper = styled.div`
    background: rgba(22, 22, 22, 0.7);
    padding-right: 0.75rem;
    border-color: rgba(128, 128, 128, 0.7);
    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    color: inherit;
    -webkit-box-pack: end;
    justify-content: flex-end;
    font-size: 10px;
    padding-top: 2px;
    position: absolute;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    user-select: none;
    /* box-sizing: border-box; */
    svg {
        /* box-sizing: border-box; */
    }
`;

const Header_Content_Login_Container = styled.div`
    width: auto;
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0px;
    margin-left: 0.5rem;
    margin-top: 0px;
`;

const Login_Button = styled.a`
    appearance: none;
    font: inherit;
    margin: 0;
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
    border: 0;
    border-radius: 0.25rem;
    cursor: pointer;
    fill: currentColor;
    position: relative;
    transition-duration: 250ms;
    transition-property: background-color, border-color;
    transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
    vertical-align: text-top;
    width: auto;
    font-size: 0.875rem;
    font-weight: 500;
    min-height: 2rem;
    padding: 0.25rem 1rem;
    background: rgb(229, 9, 20);
    color: rgb(255, 255, 255);

    &:active{
        transition: none;
        color: rgba(255, 255, 255, 0.7);
        background: rgb(153, 22, 29);
    }
    &:hover {
        transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
        background: rgb(193, 17, 25);
    }
`;

function MainHeader() {
    // useRouteMatch는 우리에게 이 route안에 있는지 다른곳에 있는지 알려준다.
    const mainMatch = useRouteMatch({
      path: "/",
      exact: true,
    });

    const history = useHistory();

    const [login, setLogin] = useRecoilState(loginState);
    const [title, setTitle] = useState(false);
    const resetAllStates = useResetAllStates();

    useEffect(() => {

        if(login.email && login.password){
            setTitle(true);
        }else{
            setTitle(false);
        }

    }, [login]);

    // 로그아웃 이벤트 
    const handleLogout = () => {
        resetAllStates();
        history.push(`/`);
        history.go(0);
    };

    return (
        <Header_Container>
            <header>
                <Header_Wrapper>
                    <Header_Div_Wrapper>
                        {/* Logo */}
                        <Header_Logo_Wrapper>
                            <span>
                                <Header_Svg>
                                    <svg viewBox="0 0 111 30" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
                                        <g>
                                            <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z">
                                            </path>
                                        </g>
                                    </svg>
                                </Header_Svg>
                                <Header_Svg_Span>넷플릭스</Header_Svg_Span>
                            </span>
                        </Header_Logo_Wrapper>
                        {/* Language & Login */}
                        <Header_Content_Wrapper>
                            <Header_Content_Div_Wrapper>
                                <Header_Content_Container>
                                    {/* 언어 */}
                                    {/* <Header_Content_Lang_Container>
                                        <span>
                                            <Lang_Container>
                                                <Lang_Label htmlFor="lang"/>
                                                <Lang_Detail_Container>
                                                    <Lang_Svg_Wrapper>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="LanguagesSmall" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                    </Lang_Svg_Wrapper>
                                                    <Lang_Select id="lang">
                                                        <Lang_Select_Option label="한국어" value={"kr"}>한국어</Lang_Select_Option>
                                                        <Lang_Select_Option label="English" value={"en"}>English</Lang_Select_Option>
                                                    </Lang_Select>
                                                    <Lang_Arrow_Svg_Wrapper>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CaretDownSmall" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.5976 6.5C11.7461 6.5 11.8204 6.67956 11.7154 6.78457L8.23574 10.2643C8.10555 10.3945 7.89445 10.3945 7.76425 10.2643L4.28457 6.78457C4.17956 6.67956 4.25393 6.5 4.40244 6.5H11.5976Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                    </Lang_Arrow_Svg_Wrapper>
                                                </Lang_Detail_Container>
                                            </Lang_Container>
                                        </span>
                                    </Header_Content_Lang_Container> */}
                                    <Header_Content_Login_Container>
                                        <div>
                                            {
                                                title ? 
                                                <Login_Button onClick={handleLogout} role="button">
                                                    로그아웃
                                                </Login_Button>
                                                :
                                                <Login_Button href="/login" role="button">
                                                    로그인
                                                </Login_Button>
                                            }
                                            
                                        </div>
                                    </Header_Content_Login_Container>
                                </Header_Content_Container>
                            </Header_Content_Div_Wrapper>
                        </Header_Content_Wrapper>
                    </Header_Div_Wrapper>
                </Header_Wrapper>
            </header>
        </Header_Container>
    );
}

export default MainHeader;