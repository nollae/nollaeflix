
import styled from 'styled-components';

import { Link, useHistory, useRouteMatch } from 'react-router-dom'; 
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"; 

import { useForm } from 'react-hook-form';

import { loginState, useResetAllStates } from '../atoms';

const Header_Wrapper = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    position: sticky;
    top: 0;
    height: auto;
    min-height: 70px;
    z-index: 1;    
`;

const Header_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    left: 0;
    position: relative;
    right: 0;
    top: 0;
    z-index: 1;
    background: transparent;    
`;

const Banner = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    overflow: auto;
`;

const Home_Header_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    align-items: center;
    display: flex;
    font-size: 1.2rem;
    padding: 0 4%;
    position: relative;
    transition: background-color .4s;
    background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);
    z-index: 2;
    height: 68px;
    background-color: transparent;    
`;

const Home_Logo = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    background-color: transparent;
    speak: none;
    font-family: nf-icon;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: none;
    transform: translateZ(0);
    color: #e50914;
    cursor: pointer;
    display: inline-block;
    margin-right: 5px;
    text-decoration: none;
    vertical-align: middle;
    font-size: 25px;    
`;

const _Logo = styled(motion.svg)`
  /* margin-right: 50px; */
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
`;

const Nav_Items_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    align-items: center;
    display: flex;
    margin: 0;
    padding: 0;    
`;

const Nav_Tab_Wrapper = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    list-style-type: none;
    margin-left: 18px;
    display: none;    
    a{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 1.2rem;
        list-style-type: none;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
        align-items: center;
        display: flex;
        font-weight: 500;
        height: 100%;
    }
`;

const Nav_Item_Wrapper = styled.li<{$isMatched?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    list-style-type: none;
    margin-left: 18px;
    display: block;
    a{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 0.75rem;
        list-style-type: none;
        background-color: transparent;
        text-decoration: none;
        outline: none;
        align-items: center;
        display: flex;
        height: 100%;
        position: relative;
        transition: color .4s;
        cursor: ${(props) => props.$isMatched ? "default" : "pointer" };
        font-weight: 500;
        color: #fff;
    }
`;

const Nav_Items_Container2 = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    align-items: center;
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: flex-end;
    position: absolute;
    right: 4%;
    top: 0;   
`;

const Nav_Item_Wrapper2 = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    margin-right: 10px;    
`;

const Search_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    display: inline-block;
    vertical-align: middle;    
`;

const Search_Button = styled(motion.button)<{$isOpen:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    color: inherit;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    background: transparent;
    border: none;
    cursor: pointer;
    display: ${(props) => props.$isOpen ? "none" : "inline-block"};   
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        color: inherit;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        fill: none;
        width: 24;
        height: 24;
        overflow: hidden;
        margin-right: 0;
    } 
`;

const Search_Input_Container = styled(motion.div)<{$isOpen:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    align-items: center;
    background: rgba(0,0,0,.75);
    border: 1px solid hsla(0,0%,100%,.85);
    display: ${(props) => props.$isOpen ? "flex" : "none"};    
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #fff;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 1.2rem;
        fill: none;
        width: 40px;
        height: 24;
        overflow: hidden;
        padding: 0 6px;
        margin-right: 0;
    }
`;

const Search_Label = styled(motion.label)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    clip: rect(1px,1px,1px,1px)!important;
    height: 1px!important;
    overflow: hidden!important;
    position: absolute!important;
    white-space: nowrap!important;
    width: 1px!important;    
`;

const Search_Input = styled(motion.input)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    direction: ltr;
    font: inherit;
    margin: 0;
    background: transparent;
    border: none;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    outline: none;
    padding: 7px 14px 7px 7px;
    width: 212px;
    height: 34px;
    line-height: 34px;
`;

const Search_Close_Button = styled(motion.span)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    speak: none;
    font-family: nf-icon;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: none;
    transform: translateZ(0);
    cursor: pointer;
    font-size: 13px;
    margin: 0 6px;   
    svg {
        flex-shrink: 0;
        transform: rotate(-45deg);
        width: 30px;
    }
`;

const Notice_Wrapper = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    white-space: normal;
    position: relative;    
`;

const Notice_Button = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    white-space: normal;
    color: inherit;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    line-height: 1;
    margin-top: .2em;
    padding: 2px 6px 3px;
    position: relative;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        white-space: normal;
        color: inherit;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        font-size: 1.5em;
        line-height: 1;
        fill: none;
        width: 24;
        height: 24;
        overflow: hidden;
    }    
`;

const Account_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    display: block;
    font-size: 12px;
    position: relative;
    z-index: 0;    
`;

const Account_DropDown_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    align-items: center;
    cursor: pointer;
    display: flex;
    width: 100%;
`;

const Account_Button_Wrapper = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    z-index: -1;
    display: block;
`;

const Account_Caret = styled.span<{$isOpen:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    cursor: pointer;
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    height: 0;
    margin-left: 10px;
    transition: transform 367ms cubic-bezier(.21,0,.07,1);
    width: 0;    
    // open
    transform: ${(props) => props.$isOpen ? "rotate(180deg)" : "" };
`;

const Account_Button = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    align-items: center;
    display: flex;
    position: relative;
    img {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        border: 0;
        border-radius: 4px;
        height: 32px;
        vertical-align: middle;
        width: 32px;
    }
`;

const Menu_Wrapper = styled.div<{$isOpen:boolean}>`
    display: ${(props) => props.$isOpen ? "" : "none"};
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    background-color: rgba(0,0,0,.9);
    border: 1px solid hsla(0,0%,100%,.15);
    box-sizing: border-box;
    color: #fff;
    cursor: default;
    font-size: 13px;
    line-height: 21px;
    margin-left: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 52px;
    width: 220px;
    opacity: 0.9;
`;

const Menu_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    cursor: default;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;    
`;

const Menu_Block = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;
    cursor: default;
    height: auto;
    margin: 0;
    width: 100%;
    border-top: 1px solid hsla(0,0%,100%,.25);
    padding: 10px 0;
    display: block;    
`;

const Account_Menu_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;
    cursor: default;
    display: block;
    height: auto;
    margin: 0;
    padding: 0;
    width: 100%;
    padding-bottom: 10px;
`;

const Menu_Item_Wrapper = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    box-sizing: border-box;
    cursor: default;
    display: block;
    font-size: 13px;
    line-height: 16px;
    padding: 5px 10px;    
`;

const Menu_Item = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 13px;
    line-height: 16px;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    color: #fff;
    text-transform: none;
    width: 100%;
    align-items: center;
    display: flex;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        font-size: 13px;
        line-height: 16px;
        cursor: pointer;
        text-transform: none;
        width: 40px;
        /* fill: none;
        width: 24;
        height: 24; */
        overflow: hidden;
        color: #b3b3b3;
        padding: 0 13px 0 5px;
    }    
`;

const Menu_Item_Title = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 13px;
    line-height: 16px;
    cursor: pointer;
    color: #fff;
    text-transform: none;
    box-sizing: border-box;    
`;

const Logout_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;
    cursor: default;
    display: block;
    height: auto;
    margin: 0;
    width: 100%;
    border-top: 1px solid hsla(0,0%,100%,.25);
    padding: 10px 0;    
`;

const navVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
};

interface IForm {
    keyword: string;
}

function MainHeader(){


    const homeMatch = useRouteMatch("/home");
    const seriesMatch = useRouteMatch("/home/series");
    const wishMatch = useRouteMatch("/home/wish");
    // const likeMatch = useRouteMatch("/home/like");

    
    // 상단 검색 Input 열림 
    const [searchOpen, setSearchOpen] = useState(false);

    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();

    const { scrollY } = useScroll();

    const handleSearch = () => {
        if(searchOpen){
            // trigger the close animation
            inputAnimation.start({
                scaleX: 0,
            })
        }else{
            // trigger the open animation
            inputAnimation.start({
                scaleX: 1,
            })
        }

        setSearchOpen((prev) => !prev);
    };

    useMotionValueEvent(scrollY, "change", (value) => {
        if(value > 80){
            navAnimation.start("scroll");
        }else{
            navAnimation.start("top");
        }
    });

    const history = useHistory();
    const { register, handleSubmit } = useForm<IForm>();
    const onValid = (data:IForm) => {
      history.push(`/search?keyword=${data.keyword}`);
    }

    // account dropdown
    const [isOpenDrop, setIsOpenDrop] = useState(false);
    const handleDropDown = () => {
        setIsOpenDrop(!isOpenDrop);
    }

    // 로그아웃 이벤트
    const resetAllStates = useResetAllStates();
    const handleLogout = () => {
        resetAllStates();
        history.push(`/`);
        history.go(0);
    };

    return (
        <Header_Wrapper
                variants={navVariants}
                animate={navAnimation} 
                initial={"top"}
            >
                <Header_Container>
                    <Banner></Banner>
                    <Home_Header_Container>
                        {/* Logo */}
                        <Home_Logo>
                            <_Logo 
                                xmlns="http://www.w3.org/2000/svg"
                                width="1024"
                                height="276.742"
                                viewBox="0 0 111 30">
                                <motion.path 
                                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                                />
                            </_Logo>
                        </Home_Logo>
                        {/* Navigation */}
                        <Nav_Items_Container>
                            {/* <Nav_Tab_Wrapper>
                                <a href="/home">메뉴</a>
                            </Nav_Tab_Wrapper> */}
                            <Nav_Item_Wrapper $isMatched={homeMatch?.isExact}>
                                <Link to="/home">
                                    홈 {homeMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper>
                            <Nav_Item_Wrapper $isMatched={seriesMatch?.isExact}>
                                <Link to="/home/series">
                                    시리즈 {seriesMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper>
                            <Nav_Item_Wrapper $isMatched={wishMatch?.isExact}>
                                <Link to="/home/wish">
                                    내가 찜한 리스트 {wishMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper>
                            {/* <Nav_Item_Wrapper $isMatched={likeMatch?.isExact}>
                                <Link to="/home/like">
                                    내가 좋아한 리스트 {likeMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper> */}
                        </Nav_Items_Container>
                        {/* Sub Navigation */}
                        <Nav_Items_Container2>
                            {/* Search */}
                            <Nav_Item_Wrapper2>
                                <Search_Wrapper>
                                    {/* input 열리기전 */}
                                    <Search_Button
                                        $isOpen={searchOpen}
                                        onClick={handleSearch}
                                        // animate={{ x: searchOpen ? -185 : 0}}
                                        transition={{ type:"linear" }}
                                    >
                                        <motion.svg 
                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="MagnifyingGlassStandard" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z" fill="currentColor">
                                            </path>
                                        </motion.svg>
                                    </Search_Button>
                                    {/* input 열린후 */}
                                    <Search_Input_Container
                                        $isOpen={searchOpen}
                                        animate={inputAnimation}
                                        initial={{ scaleX: 0 }}
                                        transition={{ type:"linear" }}
                                    >
                                        <motion.svg 
                                            onClick={handleSearch}
                                            transition={{ type:"linear" }}
                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="MagnifyingGlassStandard" aria-hidden="true">
                                            <motion.path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z" fill="currentColor">
                                            </motion.path>
                                        </motion.svg>
                                        <Search_Label htmlFor="searchInput" />
                                        <Search_Input 
                                            {...register(
                                                "keyword",
                                                { required: true, minLength: 1 }
                                            )}
                                            id="searchInput" placeholder="제목, 사람, 장르" />
                                        {/* <Search_Close_Button>
                                            <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" width="36" height="36" viewBox="0 0 36 36" role="img" data-icon="PlusLarge" aria-hidden="true">
                                                <motion.path fillRule="evenodd" clipRule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor">
                                                </motion.path>
                                            </motion.svg>
                                        </Search_Close_Button> */}
                                    </Search_Input_Container>
                                </Search_Wrapper>
                            </Nav_Item_Wrapper2>
                            {/* Notice */}
                            <Nav_Item_Wrapper2>
                                <Notice_Wrapper>
                                    <Notice_Button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="BellStandard" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z" fill="currentColor">
                                            </path>
                                        </svg>
                                    </Notice_Button>
                                </Notice_Wrapper>
                            </Nav_Item_Wrapper2>
                            {/* Account */}
                            <Nav_Item_Wrapper2 onClick={handleDropDown}> 
                                <Account_Wrapper>
                                    <Account_DropDown_Wrapper>
                                        <Account_Button_Wrapper>
                                            <Account_Button>
                                                <img src="https://occ-0-3098-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeWnT5_rTSlUpkNatPpA4X3lve97EV_XI1iiDbvKXbbd0OWJKM2SHClmtQB5o-VcefoMJ4C-tU2ZTx_TZfT3o-q-51gRGBI.png?r=a58" alt="" />
                                            </Account_Button>
                                        </Account_Button_Wrapper>
                                        <Account_Caret $isOpen={isOpenDrop} />
                                    </Account_DropDown_Wrapper>
                                    {/* menu */}
                                    <Menu_Wrapper $isOpen={isOpenDrop}>
                                        <Menu_Container>
                                            {/* <Menu_Block /> */}
                                            {/* About Account */}
                                            {/* <Account_Menu_Container> */}
                                                {/* 프로필관리 */}
                                                {/* <Menu_Item_Wrapper>
                                                    <Menu_Item>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PencilStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                        <Menu_Item_Title>프로필 관리</Menu_Item_Title>
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper> */}
                                                {/* 계정 */}
                                                {/* <Menu_Item_Wrapper>
                                                    <Menu_Item>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="UserStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM17 5C17 7.76142 14.7614 10 12 10C9.23858 10 7 7.76142 7 5C7 2.23858 9.23858 0 12 0C14.7614 0 17 2.23858 17 5ZM4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21V21.5136C19.5678 21.5667 18.9844 21.6327 18.2814 21.6988C16.6787 21.8495 14.461 22 12 22C9.53901 22 7.32131 21.8495 5.71861 21.6988C5.01564 21.6327 4.43224 21.5667 4 21.5136V21ZM21.1508 23.3775C21.1509 23.3774 21.151 23.3774 21 22.3889L21.151 23.3774C21.6393 23.3028 22 22.8829 22 22.3889V21C22 15.4772 17.5228 11 12 11C6.47715 11 2 15.4772 2 21V22.3889C2 22.8829 2.36067 23.3028 2.84897 23.3774L3 22.3889C2.84897 23.3774 2.84908 23.3774 2.8492 23.3775L2.84952 23.3775L2.85043 23.3776L2.85334 23.3781L2.86352 23.3796L2.90103 23.3852C2.93357 23.3899 2.98105 23.3968 3.04275 23.4055C3.16613 23.4228 3.3464 23.4472 3.57769 23.4765C4.04018 23.535 4.7071 23.6126 5.5314 23.6901C7.1787 23.8449 9.461 24 12 24C14.539 24 16.8213 23.8449 18.4686 23.6901C19.2929 23.6126 19.9598 23.535 20.4223 23.4765C20.6536 23.4472 20.8339 23.4228 20.9573 23.4055C21.0189 23.3968 21.0664 23.3899 21.099 23.3852L21.1365 23.3796L21.1467 23.3781L21.1496 23.3776L21.1505 23.3775L21.1508 23.3775Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                        <Menu_Item_Title>계정</Menu_Item_Title>
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper> */}
                                                {/* 고객 센터 */}
                                                {/* <Menu_Item_Wrapper>
                                                    <Menu_Item>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CircleQuestionMarkStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12 8C10.6831 8 10 8.74303 10 9.5H8C8 7.25697 10.0032 6 12 6C13.9968 6 16 7.25697 16 9.5C16 10.8487 14.9191 11.7679 13.8217 12.18C13.5572 12.2793 13.3322 12.4295 13.1858 12.5913C13.0452 12.7467 13 12.883 13 13V14H11V13C11 11.5649 12.1677 10.6647 13.1186 10.3076C13.8476 10.0339 14 9.64823 14 9.5C14 8.74303 13.3169 8 12 8ZM13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                        <Menu_Item_Title>고객 센터</Menu_Item_Title>
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper> */}
                                            {/* </Account_Menu_Container> */}
                                            {/* Logout */}
                                            <Logout_Container>
                                                <Menu_Item_Wrapper onClick={handleLogout}>
                                                    <Menu_Item>
                                                        넷플릭스에서 로그아웃
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper>
                                            </Logout_Container>
                                        </Menu_Container>
                                    </Menu_Wrapper>
                                </Account_Wrapper>
                            </Nav_Item_Wrapper2>
                        </Nav_Items_Container2>
                    </Home_Header_Container>
                </Header_Container>
            </Header_Wrapper>
    );
}

export default MainHeader;