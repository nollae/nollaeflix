import styled from 'styled-components';
import { motion } from 'framer-motion';

import { useForm } from 'react-hook-form';

import {ReactComponent as MemberShip_SVG} from '../assets/member-ship.svg';
import { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { loginState } from '../atoms';
import { useRecoilState } from 'recoil';

const Main_Cotainer = styled.div`
    min-height: 32rem;
    padding: 8.5rem 0 3rem;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    color: rgb(255, 255, 255);
    text-align: center;
    height: 100%;
    box-sizing: border-box;           
`;

const Main_Bg_Wrapper = styled.div`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

const Main_Bg_Container = styled.div`
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    img {
        height: 100%;
        width: 100%;
        transform: scale(1.25) translateY(-10%);
        object-fit: cover;
        border: 0;
    }
`;

const Main_Bg_Cover = styled.div`
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%) !important;
    background: rgb(0 0 0 / 40%);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const Main_Content_Container = styled.div`
    max-width: calc(100% - 4rem);
    margin: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`;

const Main_Content_Detail_Container = styled.div`
    flex-basis: 50%;
    padding: 0;
    z-index: 1;
    width: 100%;
`;

const Main_Content_Border = styled.div`
    flex-basis: 50%;
    padding: 0;
    z-index: 1;
`;

const Main_Content_Title = styled.h1`
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
`;

const Main_Content_SubTitle = styled.p`
    margin: 1rem 0 0;
    font-size: 1.125rem;
    font-weight: 400;
`;

const MemberShip_Container = styled.div`
    display: flex;
    position: relative;
    -webkit-box-pack: center;
    justify-content: center;
    background: radial-gradient(51.39% 511.66% at 47.68% -217.91%, #ff9900 0%, #e50914 17.27%, #0e1b4f 79.44%, #000413 100%);
    box-shadow: 0px -8px 25px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    /* margin: 0 74px; */
    color: white;
    padding: 32px;
`;

const MemberShip_Info_Container = styled.div`
    padding-left: 32px;
`;

const MemberShip_Info_Text_01 = styled.p`
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    margin: 0;
`;

const MemberShip_Info_Text_02 = styled.p`
    font-size: 16px;
    line-height: 24px;
    margin-top: 4px;
    margin-bottom: 8px;
`;

const MemberShip_Info_Button = styled.button`
    cursor: pointer;
    color: #448ef4;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 8px;
    width: fit-content;
    font-weight: 500;
    background: none;
    border: none;
    text-decoration: underline;
    padding: 0;
`;

// Section 
const Section_Container = styled.div`
    min-height: auto;
    padding: 4.5rem 0;
    position: relative;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    color: rgb(255, 255, 255);
    text-align: center;
    height: 100%;
    box-sizing: border-box;
`;

const Section_Div_Container = styled.div<{$isReverse?:boolean, $isColumn?:boolean}>`
    flex-direction: ${(props) => props.$isColumn ? "column" : ( props.$isReverse ? "row-reverse" : "row" ) };
    max-width: calc(100% - 4rem);
    margin: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    /* -ms-flex-direction: column; */
    /* flex-direction: column; */
    text-align: center;
`;

const Section_Devider = styled.div`
    width: 100%;
    height: 0.5rem;
    position: absolute;
    bottom: -0.5rem;
    background-color: rgb(35, 35, 35);
`;

const Section_Content_Container = styled.div`
    text-align: left;
    padding-right: 0.375rem;
    flex-basis: 50%;
    padding: 0;
    z-index: 1;
    width: 100%;
`;

const Section_Content_Title = styled.h2`
    margin: 0;
    font-size: 3rem;
    font-weight: 900;
`;

const Section_Content_Text = styled.p`
    margin: 1rem 0 0;
    font-size: 1.5rem;
    font-weight: 400;
`;

const Section_Content_Devider = styled.div`
    margin: 1.5rem 0 0;
    
    div {
        position: absolute;
        top: 50%;
        left: 50%;
    }
`;

const Section_Video_Container = styled.div`
    padding-left: 0.375rem;
    flex-basis: 50%;
    padding: 0;
    z-index: 1;
    
    div {
        position: relative;
        img {
            width: 100%;
        }
    }
`;

const Section_Video_Div_Container = styled.div<{$topValue:number}>`
    z-index: -1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    max-width: 73%;
    max-height: 54%;
    position: absolute !important;
    top: ${(props) => props.$topValue}%;
    left: 50%;
    transform: translate(-50%, -50%);

    video {
        display: inline-block;
        vertical-align: baseline;
    }
`;

const Section_Motion_Container = styled.div`
    padding: 0.5rem 0.75rem;
    overflow: hidden;
    position: absolute !important;
    left: 50%;
    bottom: 8%;
    transform: translateX(-50%);
    margin: 0 auto;
    background: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    width: 60%;
    min-width: 15rem;
    border: 2px solid rgba(128, 128, 128, 0.7);
    box-shadow: 0 0 2em 0 rgb(0, 0, 0);
    border-radius: 0.75rem;
    z-index: 1;
`;

const Section_Motion_Image_Wrapper = styled.div`
    margin: 0 1rem 0 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    img {
        height: 4.5rem;
    }
`;

const Section_Motion_Content_Wrapper = styled.div`
    text-align: left;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    margin: 0.3rem 0;

    div {
        &:first-child {
            font-size: 1rem;
            color: rgb(255, 255, 255);
            font-weight: 500;
        }
        &:last-child {
            font-size: 0.875rem;
            font-weight: 400;
            color: #0071eb; 
        }
    }
`;

const Section_Motion_Gif = styled.div`
    height: 3.75rem;
    width: 3rem;
    outline: 2px solid rgb(0, 0, 0);
    outline-offset: -2px;
    display: block;
    background: url(https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif) center center no-repeat;
    background-size: 100%;
    content: '';
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
`;

const Section_List_Container = styled.div`
    flex-basis: 50%;
    padding: 0;
    z-index: 1;
    width: 100%;
`

const Section_List_Div = styled.div`
    padding-right: 0.375rem;
    flex-basis: 50%;
    padding: 0;
    z-index: 1;
`;

const Section_List_Detail_Container = styled.div`
    margin: 1.5rem 0 0;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        font-weight: 400;
        li {
            list-style-type: none;
            padding: 0;
            text-indent: 0;
            margin: 0 0 0.5rem 0;
        }
    }
`;

const Section_List_Detail_Title= styled(motion.h3)`
    margin: 0;
    display: flex;
    font-size: inherit;
    font-weight: inherit;
    margin-bottom: 0.0625rem;
    position: relative;
    background-color: rgb(45, 45, 45);
    color: rgb(255, 255, 255);
    transition-duration: 250ms;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);

    &:hover {
        transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
        background-color: rgb(65, 65, 65);
    }

    button{
        padding: 1.5rem;
        appearance: none;
        border-radius: 0;
        box-sizing: content-box;
        font: inherit;
        letter-spacing: inherit;
        line-height: inherit;
        margin: 0;
        text-decoration: none;
        width: 100%;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        text-align: left;
        text-transform: none;
        overflow: visible;


    }

    button:focus{
        outline: rgb(255, 255, 255) solid 0.125rem;
        outline-offset: 0.125rem;
    }
`;

const Section_List_Detail_Content = styled(motion.div)<{$isOpen?:boolean}>`
    overflow: hidden;
    visibility: ${(props) => props.$isOpen ? "visible" : "collapse"};
    max-height:${(props) => props.$isOpen ? "75rem" : "0" }; 
    padding: ${(props) => props.$isOpen ? "1.5rem" :"0 1.5rem"};
    transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1) ${(props) => props.$isOpen ? "0s" : ""};
    text-align: left;
    background-color: rgb(45, 45, 45);
    color: rgb(255, 255, 255);
    span{
        a{
            color: rgb(255, 255, 255);
            border-radius: 0.125rem;
            text-decoration: underline;
        }
    }
`;

const Section_List_Detail_Button_Svg = styled.svg<{$isOpen:boolean}>`
    svg:not(:root) {
        overflow: hidden;
    }
    flex-shrink: 0;
    transform: ${(props) => props.$isOpen ? "rotate(-45deg)" : "rotate(0)" };
`;

const Email_Platform_Container = styled.div`
    content: '2';
    padding: 0 2rem;
    text-align: center;
    box-sizing: border-box;
    max-width: 61.5rem;
    margin: 0 auto;
    form {
        display: flex;
        flex-direction: column;
        h3 {
            margin: 0;
            font-size: 1.125rem;
            font-weight: 400;
            line-height: 1.5;
        }
    }
`;

const Email_Form_Container = styled.div`
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    position: relative;
    margin: 1rem auto 0;
    width: 100%;
    max-width: 36.625rem;
    display: flex;
    /* -webkit-box-align: center; */
`;

const Email_Input_Container = styled.div`
    width: auto;
    flex: 1 1 auto;
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    vertical-align: text-top;
`;

const Email_Input_Common_Label = styled.label`
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    position: absolute;
    z-index: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition-property: top, font-size, line-height;
    transition-duration: 250ms;
    pointer-events: none;
    left: 1rem;
    right: 1rem;
    display: block; 
`;

const Email_Input_Label_Tp = styled(Email_Input_Common_Label)<{$isEmailFocus?:boolean}>`
    font-size: ${(props) => props.$isEmailFocus ? "0.75rem" : "1rem"};
    transition-timing-function: ${(props) => props.$isEmailFocus ? "cubic-bezier(0.5, 0, 0.1, 1)" : "cubic-bezier(0.9, 0, 0.51, 1)"};
    top: ${(props) => props.$isEmailFocus ? "0.5rem" : "1rem"};
`;

// const Email_Input_Label_Bt = styled(Email_Input_Common_Label)<{$isEmailFocus?:boolean}>`
//     font-size: ${(props) => props.$isEmailFocus ? "0.75rem" : "1rem"};
//     transition-timing-function: ${(props) => props.$isEmailFocus ? "cubic-bezier(0.5, 0, 0.1, 1)" : "cubic-bezier(0.9, 0, 0.51, 1)"};
//     top: ${(props) => props.$isEmailFocus ? "0.5rem" : "1rem"};
// `;

const Email_Input_Container_Div = styled.div`
    font-size: 1rem;
    font-weight: 400;
    color: rgb(255, 255, 255);
    fill: currentcolor;
    min-width: 12.5rem;
    padding: 0px;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    display: inline-flex;
    gap: 2px;
    letter-spacing: normal;
    line-height: 100%;
    position: relative;
    text-align: left;
    z-index: 0;
`;

const Email_Common_Input = styled.input`
    &:focus-visible {
        outline: 0;
    }
    line-height: 1.5 !important;
    font-size: 1rem !important;
    width: 100%;
    color: inherit;
    padding: 1.5rem 1rem 0.5rem;
    min-height: 16px;
    min-width: 16px;
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
`;

const Email_Input_Tp = styled(Email_Common_Input)<{$isEmailFocus?:boolean,}>`
    filter: opacity(${(props) => props.$isEmailFocus ? 100 : 0}%);
    /* outline: ${(props) => props.$isEmailFocus ? undefined : 0}; */
`;

// const Email_Input_Bt = styled(Email_Common_Input)<{$isEmailFocus?:boolean,}>`
//     filter: opacity(${(props) => props.$isEmailFocus ? 100 : 0}%);
//     /* outline: ${(props) => props.$isEmailFocus ? undefined : 0}; */
// `;

const Email_Input_Border_Common = styled.div`
    background: rgba(22, 22, 22, 0.7);
    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    color: transparent;
    position: absolute;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    /* border: 1px solid black; */
    user-select: none;
`;

const Email_Input_Border_Tp = styled(Email_Input_Border_Common)<{$isFocus?:boolean, $isEmailError?:boolean, $isValid?:boolean}>`
    outline: ${(props) => props.$isFocus ? "rgb(255, 255, 255) solid 0.125rem" : "none"};
    outline-offset: ${(props) => props.$isFocus ? "0.125rem" : "none"};
    border-color: ${(props) => props.$isEmailError ? "rgb(235, 57, 66)" : (props.$isValid) ? "rgb(43, 184, 113)" : "rgba(128, 128, 128, 0.7)"} ;
`;

const Email_Input_Border_Bt = styled(Email_Input_Border_Common)<{$isFocus?:boolean, $isEmailError?:boolean, $isValid?:boolean}>`
    outline: ${(props) => props.$isFocus ? "rgb(255, 255, 255) solid 0.125rem" : "none"};
    outline-offset: ${(props) => props.$isFocus ? "0.125rem" : "none"};
    border-color: ${(props) => props.$isEmailError ? "rgb(235, 57, 66)" : (props.$isValid) ? "rgb(43, 184, 113)" : "rgba(128, 128, 128, 0.7)"} ;
`;

const Email_Error_Container_Common = styled.div`
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.53846;
    color: rgb(235, 57, 66);
    fill: currentcolor;
    margin-top: 0.375rem;
    width: 100%;
    svg {
        margin-right: 0.25rem;
        position: relative;
        top: 0.1875rem;
    }
`;

const Email_Error_Container_Tp = styled(Email_Error_Container_Common)<{$isEmailError:boolean}>`
    svg {
        display: ${(props) => props.$isEmailError ? "" : "none" };
    }
`;
const Email_Error_Container_Bt = styled(Email_Error_Container_Common)<{$isEmailError:boolean}>`
    svg {
        display: ${(props) => props.$isEmailError ? "" : "none" };
    }
`;

const Email_Button_Container = styled.button`
    flex: 0 0 auto;
    margin-top: 0 !important;
    margin-left: 0.5rem !important;
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
    width: auto;
    font-size: 1.5rem;
    font-weight: 500;
    min-height: 3.5rem;
    padding: 0.75rem 1.5rem;
    background: rgb(229, 9, 20);
    color: rgb(255, 255, 255);
    text-transform: none;
    overflow: visible;

    &:active {
        transition: none 0s ease 0s;
        color: rgba(255, 255, 255, 0.7);
        background: rgb(153, 22, 29);
        border-color: darkgray;
        outline: none;
    }
    &:hover {
        transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
        background: rgb(193, 17, 25);
    }
    &:focus {
        /* outline: rgb(255, 255, 255) solid 0.125rem;
        outline-offset: 0.125rem; */
    }

    &::after{
        inset: 0px;
        position: absolute;
        transition: inherit;
        border-style: solid;
        border-width: 0.0625rem;
        border-radius: 0.1875rem;
        content: "";
        border-color: rgba(0, 0, 0, 0);
    }
`;

const Email_Button_Svg_Container = styled.div`
    display: inline-block;
    height: 1.5rem;
    svg{
        width: 1.5rem;
        height: inherit;
        margin-left: 0.5rem;
        margin-right: 0rem;
    }
`;

interface IForm {
    emailTp?: string,
    emailBt?: string,
}


function Main() {

    const history = useHistory();

    // useForm hook
    const { register, watch, handleSubmit, formState:{errors, isValid, isValidating}, getValues, setValue, trigger, setFocus} = useForm<IForm>();
    const [login, setLogin] = useRecoilState(loginState);

    const onValidTp = (data:IForm) => {
        if(isValid){
            if(login.email && login.password){
                history.push('/home');
            }
            else{
                setLogin((items)=> ({email: data.emailTp + "", password:items.password}));
                history.push('/signup');
            }
        }
    }

    
    // 상단 이메일
    const [isFocusTp, setIsFocusTp] = useState(false);
    const [isEmailTpFocus, setIsEmailTpFocus] = useState(false);
    const handleEmailTpFocus = () => {
        setIsEmailTpFocus(true);
        setIsFocusTp(true);
    }

    useEffect(() => {
        // 이메일 Setting
        if(login.email) {
            setValue("emailTp", login.email);
            handleEmailTpFocus();
            trigger();
            setFocus("emailTp");
        }
    }, []);

    

   

    // 자주 묻는 질문 
    const QAList = [
        { title : `넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?`, content : `넷플릭스는 장편 영화, 다큐멘터리, 시리즈, 애니메이션, 각종 상을 수상한 넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고 있습니다. 마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하실 수 있습니다. <br><br> <a href="https://www.netflix.com/kr/browse/genre/839338">넷플릭스 콘텐츠를 한번 살펴보세요</a>`},
        { title : `넷플릭스란 무엇인가요?`, content : `넷플릭스는 각종 수상 경력에 빛나는 시리즈, 영화, 애니메이션, 다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한 수천 종의 디바이스에서 시청할 수 있는 스트리밍 서비스입니다. <br><br>저렴한 월 요금으로 원하는 시간에 원하는 만큼 즐길 수 있습니다. 무궁무진한 콘텐츠가 준비되어 있으며 매주 새로운 시리즈와 영화가 제공됩니다.`},
        { title : `넷플릭스 요금은 얼마인가요?`, content : `스마트폰, 태블릿, 스마트 TV, 노트북, 스트리밍 디바이스 등 다양한 디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요. 멤버십 요금은 월 5,500원부터 17,000원까지 다양합니다. 추가 비용이나 약정이 없습니다.`},
        { title : `어디에서 시청할 수 있나요?`, content : `언제 어디서나 시청할 수 있습니다. 넷플릭스 계정으로 로그인하면 PC에서 netflix.com을 통해 바로 시청할 수 있으며, 인터넷이 연결되어 있고 넷플릭스 앱을 지원하는 디바이스(스마트 TV, 스마트폰, 태블릿, 스트리밍 미디어 플레이어, 게임 콘솔 등)에서도 언제든지 시청할 수 있습니다. <br><br>iOS, Android, Windows 10용 앱에서는 좋아하는 시리즈를 저장할 수도 있습니다. 저장 기능을 이용해 이동 중이나 인터넷에 연결할 수 없는 곳에서도 시청하세요. 넷플릭스는 어디서든 함께니까요.`},
        { title : `멤버십을 해지하려면 어떻게 하나요?`, content : `넷플릭스는 부담 없이 간편합니다. 성가신 계약도, 약정도 없으니까요. 멤버십 해지도 온라인에서 클릭 두 번이면 완료할 수 있습니다. 해지 수수료도 없으니 원할 때 언제든 계정을 시작하거나 종료하세요.`},
        { title : `아이들이 넷플릭스를 봐도 좋을까요?`, content : `멤버십에 넷플릭스 키즈 환경이 포함되어 있어 자녀가 자기만의 공간에서 가족용 시리즈와 영화를 즐기는 동안 부모가 이를 관리할 수 있습니다. <br><br>키즈 프로필과 더불어 PIN 번호를 이용한 자녀 보호 기능도 있어, 자녀가 시청할 수 있는 콘텐츠의 관람등급을 제한하고 자녀의 시청을 원치 않는 특정 작품을 차단할 수도 있습니다.`},
    ]
    // 자주 묻는 질문 아코디언 
    const [activeIndex, setActiveIndex] = useState<number>();
    const handleAccodian = (idx:number) => {
        
        if(activeIndex == idx){
            setActiveIndex(undefined);
        }else{
            setActiveIndex(idx);
        }
    }

    const onValidBt = (data:IForm) => {
    }

    // 하단 이메일 
    const [isFocusBt, setIsFocusBt] = useState(false);
    const [isEmailBtFocus, setIsEmailBtFocus] = useState(false);
    const handleEmailBtFocus = () => {
        setIsEmailBtFocus(true);
        setIsFocusBt(true);
    }

    // const handleEmailBtBlur = () => {
    //     if(emailBt.length <= 0) setIsEmailBtFocus(false);
    // }

    // const [emailBt, setEmailBt] = useState("");
    // const handleEmailBtVal = (event:React.FormEvent<HTMLInputElement>) => {
    //     const {  currentTarget: {value}, } = event;
    //     setEmailBt(value);
    // }

    return (
        <div>
            {/* 이미지 배경 && 이메일 주소 입력 */}
            <Main_Cotainer>
                <Main_Bg_Wrapper>
                    <Main_Bg_Container>
                        <img alt="" aria-hidden="true" src="https://assets.nflxext.com/ffe/siteui/vlv3/d253acf4-a1e2-4462-a416-f78802dc2d85/df3e63de-ea64-4e5e-b42a-370630b4c8ee/KR-ko-20240429-POP_SIGNUP_TWO_WEEKS-perspective_WEB_e969cb3e-6c59-41db-82f3-8f4aa5209d72_small.jpg" />
                        <Main_Bg_Cover />
                    </Main_Bg_Container>
                </Main_Bg_Wrapper>
                <Main_Content_Container>
                    <Main_Content_Detail_Container>
                        <Main_Content_Title>
                            영화, 시리즈 등을 무제한으로
                        </Main_Content_Title>
                        <Main_Content_SubTitle>
                            어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.
                        </Main_Content_SubTitle>

                        <div style={{margin: "1.5rem 0 0",}}>
                            <Email_Platform_Container>
                                <form onSubmit={handleSubmit(onValidTp)}>
                                    <h3>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</h3>
                                    <Email_Form_Container>
                                        <Email_Input_Container>
                                            <Email_Input_Label_Tp 
                                                $isEmailFocus={isEmailTpFocus}
                                                htmlFor="email_top">
                                                이메일 주소
                                            </Email_Input_Label_Tp>
                                            <Email_Input_Container_Div>
                                                <Email_Input_Tp 
                                                    id="email_top"
                                                    $isEmailFocus={isEmailTpFocus}
                                                    onFocus={handleEmailTpFocus}
                                                    {...register("emailTp", { 
                                                        required: "이메일 주소는 반드시 입력하셔야 합니다.",
                                                        pattern:{
                                                            value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 
                                                            message:"이메일 주소를 정확히 입력하세요."
                                                        },
                                                        minLength: {
                                                            value: 5,
                                                            message: "이메일 주소는 반드시 입력하셔야 합니다."
                                                        },
                                                        maxLength: 50,
                                                        onBlur: () => {
                                                            if(!getValues("emailTp"))
                                                                setIsEmailTpFocus(false);
                                                            setIsFocusTp(false);

                                                        },
                                                    })}
                                                />
                                                <Email_Input_Border_Tp 
                                                    $isFocus={isFocusTp} 
                                                    $isEmailError={(errors?.emailTp?.message) ? true : false} 
                                                    $isValid={isValid} 
                                                />
                                            </Email_Input_Container_Div>
                                            <Email_Error_Container_Tp 
                                                $isEmailError={(errors?.emailTp?.message) ? true : false}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                                {errors?.emailTp?.message}
                                            </Email_Error_Container_Tp>

                                        </Email_Input_Container>
                                            <Email_Button_Container>
                                                {
                                                    login.email && login.password 
                                                    ?
                                                    `홈으로 가기`
                                                    :
                                                    `시작하기`
                                                }
                                                <Email_Button_Svg_Container>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ChevronRightStandard" aria-hidden="true">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </Email_Button_Svg_Container>
                                            </Email_Button_Container>
                                    </Email_Form_Container>
                                </form>
                            </Email_Platform_Container>
                        </div>  

                    </Main_Content_Detail_Container>
                    <Main_Content_Border />
                </Main_Content_Container>
            </Main_Cotainer>

            {/* 멤버십 */}
            <div>
                <MemberShip_Container>
                    <div>
                        <MemberShip_SVG />
                    </div>
                    <MemberShip_Info_Container>
                        <MemberShip_Info_Text_01>
                            5,500원이면 만날 수 있는 넷플릭스.
                        </MemberShip_Info_Text_01>
                        <MemberShip_Info_Text_02>
                            광고형 스탠다드 멤버십에 가입하세요.
                        </MemberShip_Info_Text_02>
                        <MemberShip_Info_Button>
                            자세히 알아보기
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" 
                                    d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor">
                                </path>
                            </svg>
                        </MemberShip_Info_Button>
                    </MemberShip_Info_Container>
                </MemberShip_Container>
            </div>

            {/* TV로 즐기세요 */}
            <Section_Container>
                <Section_Div_Container $isReverse={false}>
                    <Section_Content_Container>
                        <Section_Content_Title>
                            TV로 즐기세요
                        </Section_Content_Title>
                        <Section_Content_Text>
                            스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이 플레이어 등 다양한 디바이스에서 시청하세요.
                        </Section_Content_Text>
                        <Section_Content_Devider>
                            <div></div>
                        </Section_Content_Devider>
                    </Section_Content_Container>

                    <Section_Video_Container>
                        <div>
                            <img alt="" 
                                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" />
                            <Section_Video_Div_Container $topValue={46}>
                                <video autoPlay={true} playsInline={true} muted={true} loop={true}>
                                    <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                                </video>
                                <div></div>
                                <div></div>
                            </Section_Video_Div_Container>
                        </div>
                    </Section_Video_Container>
                </Section_Div_Container>
                <Section_Devider />
            </Section_Container>
            
            {/* 어디서나 자유롭게 시청하세요 */}
            <Section_Container>
                <Section_Div_Container $isReverse={true}>
                    <Section_Content_Container>
                        <Section_Content_Title>
                            어디서나 자유롭게 시청하세요
                        </Section_Content_Title>
                        <Section_Content_Text>
                            각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로 스트리밍하세요.
                        </Section_Content_Text>
                        <Section_Content_Devider>
                            <div></div>
                        </Section_Content_Devider>
                    </Section_Content_Container>

                    <Section_Video_Container>
                        <div>
                            <img alt="" 
                                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" />
                            <Section_Video_Div_Container $topValue={34}>
                                <video autoPlay={true} playsInline={true} muted={true} loop={true}>
                                    <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4" />
                                </video>
                                <div></div>
                                <div></div>
                            </Section_Video_Div_Container>
                        </div>
                    </Section_Video_Container>

                </Section_Div_Container>
                <Section_Devider />
            </Section_Container>

            {/* 어린이 전용 프로필을 만들어보세요 */}
            <Section_Container>
                <Section_Div_Container $isReverse={false}>
                    <Section_Content_Container>
                        <Section_Content_Title>
                            어린이 전용 프로필을 만들어 보세요
                        </Section_Content_Title>   
                        <Section_Content_Text>
                            자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.
                        </Section_Content_Text>     
                        <Section_Content_Devider>
                            <div></div>
                        </Section_Content_Devider>           
                    </Section_Content_Container>   

                    <Section_Video_Container>
                        <div>
                            <img alt="" 
                                src="https://occ-0-3098-993.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdl4VeWgVycbbzJBV1KbIpMScxU_I4h6uTvNRpFab-65jsTTqI0V-g-4Jq4CLaIVqx-wbKAwA_Ee8KhZyTb0SFJ5tK2mifI-GYEB.png?r=15b" />
                            <div style={{overflow: "hidden",}}>
                                <div></div>
                                <div></div>
                            </div>
                        </div>                  
                    </Section_Video_Container>
                                             
                </Section_Div_Container>
                <Section_Devider />
            </Section_Container>   
            
            {/* 즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요 */}
            <Section_Container>
                <Section_Div_Container $isReverse={true}>
                    <Section_Content_Container>
                        <Section_Content_Title>
                            즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요
                        </Section_Content_Title>
                        <Section_Content_Text>
                            비행기, 기차, 잠수함. 어디서든 시청하세요.
                        </Section_Content_Text>
                        <Section_Content_Devider>
                            <div></div>
                        </Section_Content_Devider>
                    </Section_Content_Container>

                    <Section_Video_Container>
                        <div>
                            <img alt="" 
                                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" />
                            <Section_Motion_Container>
                                <Section_Motion_Image_Wrapper>
                                    <img alt="" 
                                        src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" />
                                </Section_Motion_Image_Wrapper>   
                                <Section_Motion_Content_Wrapper>
                                    <div>기묘한 이야기</div>
                                    <div>저장 중...</div>
                                </Section_Motion_Content_Wrapper>    
                                <Section_Motion_Gif />       
                            </Section_Motion_Container>
                        </div>
                    </Section_Video_Container>

                </Section_Div_Container>
                <Section_Devider />
            </Section_Container>

            {/* 자주 묻는 질문 */}
            <Section_Container>
                <Section_Div_Container $isColumn={true}>
                    <Section_List_Container>
                        <Section_Content_Title>
                            자주 묻는 질문
                        </Section_Content_Title>
                        <Section_List_Detail_Container>
                            <ul>
                                {QAList.map((item, idx) => (
                                    <li key={idx} className={(idx === activeIndex) ? 'active' : ''}>
                                        <Section_List_Detail_Title onClick={() => handleAccodian(idx)}>
                                            <button > 
                                                <span dangerouslySetInnerHTML={{__html: item.title}}></span>
                                                <Section_List_Detail_Button_Svg 
                                                    $isOpen={(idx === activeIndex)}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="36" height="36" viewBox="0 0 36 36" role="img" data-icon="PlusLarge" aria-hidden="true" >
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                                                </Section_List_Detail_Button_Svg>
                                            </button>
                                        </Section_List_Detail_Title>
                                        <Section_List_Detail_Content $isOpen={(idx === activeIndex)}>
                                            <span dangerouslySetInnerHTML={{__html: item.content}}>
                                            </span>
                                        </Section_List_Detail_Content>
                                    </li>
                                ))}
                            </ul>
                            {/* 이메일 */}
                            {/* <div style={{marginTop: "2.85rem",}}>
                                <Email_Platform_Container>
                                    <form onSubmit={handleSubmit(onValidBt)}>
                                        <h3>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</h3>
                                        <Email_Form_Container>
                                            <Email_Input_Container>
                                                <Email_Input_Label_Bt
                                                    $isEmailFocus={isEmailBtFocus}
                                                    htmlFor="email_bttm">
                                                    이메일 주소
                                                </Email_Input_Label_Bt>
                                                <Email_Input_Container_Div>
                                                    <Email_Input_Bt 
                                                        id="email_bttm"
                                                        $isEmailFocus={isEmailBtFocus}
                                                        onFocus={handleEmailBtFocus}
                                                        {...register("emailBt", { 
                                                            required: "이메일 주소는 반드시 입력하셔야 합니다.",
                                                            pattern:{
                                                                value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 
                                                                message:"이메일 주소를 정확히 입력하세요."
                                                            },
                                                            minLength: {
                                                                value: 5,
                                                                message: "이메일 주소는 반드시 입력하셔야 합니다."
                                                            },
                                                            maxLength: 50,
                                                            onBlur: () => {
                                                                if(!getValues("emailBt"))
                                                                    setIsEmailBtFocus(false);
                                                                setIsFocusBt(false);
                                                            },
                                                            // onChange: () => {
                                                            //     setValue("emailTp", getValues("emailBt"));
                                                            // }
                                                        })}
                                                    />
                                                    <Email_Input_Border_Bt $isFocus={isFocusBt} $isEmailError={(errors?.emailBt?.message) ? true : false} $isValid={isValid} />
                                                </Email_Input_Container_Div>
                                                <Email_Error_Container_Bt $isEmailError={(errors?.emailBt?.message) ? true : false}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                    {errors?.emailBt?.message}
                                                </Email_Error_Container_Bt>

                                            </Email_Input_Container>
                                            <Email_Button_Container>
                                                시작하기
                                                <Email_Button_Svg_Container>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ChevronRightStandard" aria-hidden="true">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </Email_Button_Svg_Container>
                                            </Email_Button_Container>
                                        </Email_Form_Container>
                                    </form>
                                </Email_Platform_Container>
                            </div>                */}
                        </Section_List_Detail_Container>
                    </Section_List_Container>    
                    <Section_List_Div />                        
                </Section_Div_Container>     
                <Section_Devider />                        
            </Section_Container>



        </div>
    );
}

export default Main;