import { useForm } from 'react-hook-form';

import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { loginState } from '../atoms';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';

import LoginHeader from '../Components/LoginHeader';

const Login_Screen_Container = styled.div`
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 0;
`;

const BackGround_Wrapper = styled.div`
    background-size: cover;
    display: block;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
    position: absolute;
    width: 100%;
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
    img {
        min-height: 100%;
        min-width: 100%;
    }
`;

const Login_Wrapper = styled.div`
    margin-bottom: 50px !important;
    max-width: 450px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    margin: 0 auto;
    padding: 0 5%;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
`;

const Login_Container = styled.div`
    min-height: 450px;
    padding: 48px 16px;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 100%;
`;

const Title_Wrapper = styled.header`
    text-align: left;
    h1 {
        margin-bottom: 28px !important;
        margin-block-start: 0;
        margin-block-end: 0;
        margin: 0;
        padding: 0;
        color: rgb(255, 255, 255);
        font-size: 2rem;
        font-weight: 700;
    }
`;

const Form_Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Email_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-flex: 1;
    flex-grow: 1;
`;

const Email_Container = styled.div`
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    vertical-align: text-top;
`;

const Label_Common = styled.label`
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

const Email_Label = styled(Label_Common)<{$isEmailFocus?:boolean}>`
    font-size: ${(props) => props.$isEmailFocus ? "0.75rem" : "1rem"};
    transition-timing-function: ${(props) => props.$isEmailFocus ? "cubic-bezier(0.5, 0, 0.1, 1)" : "cubic-bezier(0.9, 0, 0.51, 1)"};
    top: ${(props) => props.$isEmailFocus ? "0.5rem" : "1rem"};
`;

const Email_Input_Container = styled.div`
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

const Input_Common = styled.input`
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

const Email_Input = styled(Input_Common)<{$isEmailFocus?:boolean,}>`
    filter: opacity(${(props) => props.$isEmailFocus ? 100 : 0}%);
`;

const Input_Border_Common = styled.div`
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

const Email_Input_Border = styled(Input_Border_Common)<{$isFocus?:boolean, $isEmailError?:boolean, $isValid?:boolean}>`
    outline: ${(props) => props.$isFocus ? "rgb(255, 255, 255) solid 0.125rem" : "none"};
    outline-offset: ${(props) => props.$isFocus ? "0.125rem" : "none"};
    border-color: ${(props) => props.$isEmailError ? "rgb(235, 57, 66)" : (props.$isValid) ? "rgb(43, 184, 113)" : "rgba(128, 128, 128, 0.7)"} ;
`;

const Error_Container_Common = styled.div`
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

const Email_Error_Container = styled(Error_Container_Common)<{$isEmailError?:boolean}>`
    svg {
        display: ${(props) => props.$isEmailError ? "" : "none" };
    }
`;

const Password_Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Password_Container = styled.div`
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    vertical-align: text-top;
    width: 100%;
`;

const Password_Label = styled(Label_Common)<{$isPasswordFocus?:boolean}>`
    font-size: ${(props) => props.$isPasswordFocus ? "0.75rem" : "1rem"};
    transition-timing-function: ${(props) => props.$isPasswordFocus ? "cubic-bezier(0.5, 0, 0.1, 1)" : "cubic-bezier(0.9, 0, 0.51, 1)"};
    top: ${(props) => props.$isPasswordFocus ? "0.5rem" : "1rem"};
`;

const Password_Input_Container = styled(Email_Input_Container)``;

const Password_Input = styled(Input_Common)<{$isPasswordFocus?:boolean,}>`
    margin-right: 32px;
    filter: opacity(${(props) => props.$isPasswordFocus ? 100 : 0}%);
`;

const Password_Input_Border = styled(Input_Border_Common)<{$isFocus?:boolean, $isPasswordError?:boolean, $isValid?:boolean}>`
    outline: ${(props) => props.$isFocus ? "rgb(255, 255, 255) solid 0.125rem" : "none"};
    outline-offset: ${(props) => props.$isFocus ? "0.125rem" : "none"};
    border-color: ${(props) => props.$isPasswordError ? "rgb(235, 57, 66)" : (props.$isValid) ? "rgb(43, 184, 113)" : "rgba(128, 128, 128, 0.7)"} ;
`;

const Password_Error_Container = styled(Error_Container_Common)<{$isPasswordError?:boolean}>`
    svg {
        display: ${(props) => props.$isPasswordError ? "" : "none" };
    }
`;

const Submit_Button = styled.button`
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
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    min-height: 2.5rem;
    padding: 0.375rem 1rem;
    background: rgb(229, 9, 20);
    color: rgb(255, 255, 255);
`;

const Password_Show_Hide = styled.button<{$isDisplay?:boolean, $isShow?:boolean}>`
    display: ${(props) => props.$isDisplay ? "inline-flex" : "none"} ;
    visibility: ${(props) => props.$isShow ? "none" : "hidden"};
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    word-break: keep-all;
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
    border: 0.0625rem solid rgba(0, 0, 0, 0);
    box-sizing: border-box;
    /* display: inline-flex; */
    font-size: 13px;
    font-weight: 400;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: normal;
    line-height: 1;
    padding: 2px 7px;
    user-select: none;
    cursor: pointer;
    fill: currentcolor;
    transition-duration: 250ms;
    transition-property: background-color, border-color;
    transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
    vertical-align: text-top;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    background: rgba(0, 0, 0, 0);
    color: rgb(255, 255, 255);
    position: absolute;
    top: 12px;
    right: 8px;
    z-index: 1;
    &:hover {
        transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
        background: rgba(128, 128, 128, 0.4);
        border-color: rgba(0, 0, 0, 0);
        color: rgb(255, 255, 255);
    }
    &:focus {
        outline: none;
    }
`;

const Footer_Cotainer = styled.footer`
    display: flex;
    flex-direction: column;
    -webkit-box-flex: 1;
    flex-grow: 1;
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin-top: 20px;
`;

const Sign_Wrapper = styled.p`
    margin-block-start: 0;
    margin-block-end: 0;
    margin: 0;
    padding: 0;
    color: rgba(255,255,255,0.7);
    font-size: 1rem;
    font-weight: 400;
    margin-top: 16px;
`;

const Sing_Link = styled.a`
    color: rgb(255,255,255);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
`;

const Explain_Wrapper = styled.div`
    color: #8c8c8c;
    font-size: 13px;
    margin-top: 11px;
    position: relative;
    text-align: left;
`;

const Explain = styled.p`
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
`;

interface IForm {
    email: string,
    password: string,
}

function Login(){

    const history = useHistory();

    // useForm hook
    const { register, watch, handleSubmit, formState:{errors, isValid, isValidating}, getValues, setValue, trigger, setFocus} = useForm<IForm>();
    const [login, setLogin] = useRecoilState(loginState);

    const onValid = (data:IForm) => {
        if(isValid){
            setLogin((items) => ({...data}));
            history.push(`/home`);
        }
    }

    
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
        setIsDisplay(true);
    }

    // 비밀번호 보이기/숨기기
    const [isDisplay, setIsDisplay] = useState(false);
    const [isShowPwShow, setIsShowPwShow] = useState(false);
    const [isShowPwHide, setIsShowPwHide] = useState(true);

    const handleShowHide = () => {
        setIsShowPwShow(!isShowPwShow);
        setIsShowPwHide(!isShowPwHide);
        setIsDisplay(true);
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


    return (

        <Login_Screen_Container>
            {/* 배경 이미지 설정 */}
            <BackGround_Wrapper>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/d253acf4-a1e2-4462-a416-f78802dc2d85/df3e63de-ea64-4e5e-b42a-370630b4c8ee/KR-ko-20240429-POP_SIGNUP_TWO_WEEKS-perspective_WEB_e969cb3e-6c59-41db-82f3-8f4aa5209d72_small.jpg" alt="" />
            </BackGround_Wrapper>
            {/* 헤더 */}
            <LoginHeader />
            {/* 로그인  */}
            <Login_Wrapper>
                <Login_Container>
                    {/* 로그인 제목 */} 
                    <Title_Wrapper>
                        <h1>로그인</h1>
                    </Title_Wrapper>
                    {/* 로그인 양식 */}
                    <Form_Container onSubmit={handleSubmit(onValid)}>
                        {/* 이메일 */}
                        <Email_Wrapper>
                            <Email_Container>
                                <Email_Label 
                                    $isEmailFocus={isEmailFocus} 
                                    htmlFor="email_"
                                >이메일 주소 또는 휴대폰 번호</Email_Label>
                                <Email_Input_Container>
                                    <Email_Input
                                        id="email_"
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
                                                message: "이메일 주소는 반드시 입력하셔야 합니다."
                                            },
                                            maxLength: 50,
                                            onBlur: () => {
                                                if(!getValues("email"))
                                                    setIsEmailFocus(false);
                                                setIsCmFocusEamil(false);
                                            },
                                        })}
                                    />
                                    <Email_Input_Border 
                                        $isFocus={isCmFocusEamil} 
                                        $isEmailError={(errors?.email?.message) ? true : false} 
                                        $isValid={isValid} 
                                    />
                                </Email_Input_Container>
                                <Email_Error_Container
                                    $isEmailError={(errors?.email?.message) ? true : false}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    {errors?.email?.message}
                                </Email_Error_Container>
                            </Email_Container>
                        </Email_Wrapper>
                        {/* 비밀번호 */}
                        <Password_Wrapper >
                            <Password_Container >
                                <Password_Label
                                    $isPasswordFocus={isPasswordFocus}
                                    htmlFor="password_"
                                >비밀번호</Password_Label>
                                <Password_Input_Container>
                                    <Password_Input 
                                        type={isShowPwHide ? "password" : "text"}
                                        id="password_"
                                        $isPasswordFocus={isPasswordFocus} 
                                        onFocus={handlePasswordFocus}
                                        {...register("password", { 
                                            required: "비밀번호는 4~60자 사이여야 합니다.",
                                            minLength: {
                                                value: 5,
                                                message: "비밀번호는 4~60자 사이여야 합니다."
                                            },
                                            maxLength: 60,
                                            onBlur: () => {
                                                if(!getValues("password"))
                                                    setIsPasswordFocus(false);
                                                setIsCmFocusPassword(false);
                                                setIsDisplay(false);

                                            },
                                        })}
                                    />
                                    <Password_Input_Border 
                                        $isFocus={isCmFocusPassword} 
                                        $isPasswordError={(errors?.password?.message) ? true : false} 
                                        $isValid={isValid} 
                                    />
                                </Password_Input_Container>
                                <Password_Error_Container
                                   $isPasswordError={(errors?.password?.message) ? true : false}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    {errors?.password?.message}
                                </Password_Error_Container>
                            </Password_Container>
                            <Password_Show_Hide onMouseDown={(event) => event.preventDefault()} onClick={handleShowHide} $isDisplay={isDisplay} $isShow={isShowPwShow} role="button" data-uia="icon-button" title="비밀번호 표시"type="button">
                                <div aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="EyeSmall" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14 8L15.1175 9.00062C15.6275 8.43103 15.6275 7.56897 15.1175 6.99938L14 8ZM2 8C0.882523 6.99938 0.882833 6.99903 0.883154 6.99867L0.883848 6.9979L0.885427 6.99614L0.889343 6.9918L0.900191 6.97987L0.933801 6.94347C0.961437 6.91382 0.999518 6.8736 1.04754 6.82431C1.14348 6.72585 1.2797 6.59059 1.45216 6.43083C1.7956 6.11269 2.29067 5.69005 2.90485 5.26581C4.10464 4.43706 5.9066 3.5 8 3.5C10.0934 3.5 11.8954 4.43706 13.0951 5.26581C13.7093 5.69005 14.2044 6.11269 14.5478 6.43083C14.7203 6.59059 14.8565 6.72585 14.9525 6.82431C15.0005 6.8736 15.0386 6.91382 15.0662 6.94347L15.0998 6.97987L15.1107 6.9918L15.1146 6.99614L15.1162 6.9979L15.1168 6.99867C15.1172 6.99903 15.1175 6.99938 14 8C14 8 11.3137 5 8 5C4.68629 5 2 8 2 8ZM2 8L0.882523 6.99938C0.372492 7.56897 0.372492 8.43103 0.882523 9.00062L2 8ZM2 8C0.882523 9.00062 0.882833 9.00097 0.883154 9.00133L0.883848 9.0021L0.885427 9.00386L0.889343 9.0082L0.900191 9.02013L0.933801 9.05653C0.961437 9.08618 0.999518 9.1264 1.04754 9.17569C1.14348 9.27415 1.2797 9.40941 1.45216 9.56917C1.7956 9.88731 2.29067 10.31 2.90485 10.7342C4.10464 11.5629 5.9066 12.5 8 12.5C10.0934 12.5 11.8954 11.5629 13.0951 10.7342C13.7093 10.31 14.2044 9.88731 14.5478 9.56917C14.7203 9.40941 14.8565 9.27415 14.9525 9.17569C15.0005 9.1264 15.0386 9.08618 15.0662 9.05653L15.0998 9.02013L15.1107 9.0082L15.1146 9.00386L15.1162 9.0021L15.1168 9.00133C15.1172 9.00097 15.1175 9.00062 14 8C14 8 11.3137 11 8 11C4.68629 11 2 8 2 8ZM8 10.0002C9.10457 10.0002 10 9.10481 10 8.00024C10 6.89567 9.10457 6.00024 8 6.00024C6.89543 6.00024 6 6.89567 6 8.00024C6 9.10481 6.89543 10.0002 8 10.0002Z" fill="currentColor">
                                        </path>
                                    </svg>
                                </div>
                            </Password_Show_Hide>

                            <Password_Show_Hide onMouseDown={(event) => event.preventDefault()} onClick={handleShowHide} $isDisplay={isDisplay} $isShow={isShowPwHide} role="button" data-uia="icon-button" title="비밀번호 숨기기" type="button">
                                <div aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="EyeOffSmall" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.8716 11.9323L14.4697 15.5304L15.5304 14.4697L1.53039 0.469727L0.469727 1.53039L3.70008 4.76074C3.4123 4.92781 3.14639 5.09903 2.90487 5.26585C2.2907 5.69009 1.79562 6.11273 1.45218 6.43087C1.27972 6.59063 1.1435 6.72589 1.04756 6.82436C0.999541 6.87364 0.961461 6.91386 0.933825 6.94351L0.900214 6.97991L0.889367 6.99184L0.885451 6.99618L0.883872 6.99794L0.883177 6.99871C0.882857 6.99907 0.882547 6.99942 2.00002 8.00004L0.882547 6.99942C0.372515 7.56901 0.372515 8.43107 0.882547 9.00066L2.00002 8.00004C0.882547 9.00066 0.882857 9.00101 0.883177 9.00137L0.883872 9.00214L0.885451 9.0039L0.889367 9.00824L0.900214 9.02017L0.933825 9.05657C0.961461 9.08622 0.999541 9.12644 1.04756 9.17573C1.1435 9.27419 1.27972 9.40945 1.45218 9.56921C1.79562 9.88735 2.2907 10.31 2.90487 10.7342C4.10467 11.563 5.90663 12.5 8.00002 12.5C9.04223 12.5 10.0122 12.2678 10.8716 11.9323ZM9.69036 10.751C9.15423 10.9059 8.58697 11 8.00002 11C4.68632 11 2.00002 8.00004 2.00002 8.00004C2.00002 8.00004 3.11902 6.75037 4.80347 5.86413L6.15837 7.21903C6.05642 7.45904 6.00002 7.72308 6.00002 8.00029C6.00002 9.10485 6.89545 10.0003 8.00002 10.0003C8.27723 10.0003 8.54127 9.94389 8.78128 9.84194L9.69036 10.751ZM14.5479 9.56921C14.2266 9.8668 13.7727 10.2558 13.2127 10.6521L12.1345 9.57383C13.2837 8.80006 14 8.00004 14 8.00004C15.1175 9.00066 15.1172 9.00101 15.1169 9.00137L15.1162 9.00214L15.1146 9.0039L15.1107 9.00824L15.0998 9.02017L15.0662 9.05657C15.0386 9.08622 15.0005 9.12644 14.9525 9.17573C14.8565 9.27419 14.7203 9.40945 14.5479 9.56921ZM14 8.00004C15.1175 6.99942 15.1172 6.99907 15.1169 6.99871L15.1162 6.99794L15.1146 6.99618L15.1107 6.99184L15.0998 6.97991L15.0662 6.94351C15.0386 6.91386 15.0005 6.87364 14.9525 6.82436C14.8565 6.72589 14.7203 6.59063 14.5479 6.43087C14.2044 6.11273 13.7093 5.69009 13.0952 5.26585C11.8954 4.4371 10.0934 3.50004 8.00002 3.50004C7.39642 3.50004 6.81704 3.57795 6.26934 3.7087L7.5768 5.01616C7.71661 5.00557 7.85774 5.00004 8.00002 5.00004C11.3137 5.00004 14 8.00004 14 8.00004ZM14 8.00004L15.1175 6.99942C15.6275 7.56901 15.6275 8.43107 15.1175 9.00066L14 8.00004Z" fill="currentColor">
                                        </path>
                                    </svg>
                                </div>
                            </Password_Show_Hide>
                        </Password_Wrapper>
                        <Submit_Button>로그인</Submit_Button>
                    </Form_Container>
                    {/* 회원가입 */}
                    <Footer_Cotainer>
                        <Sign_Wrapper>
                            Netflix 회원이 아닌가요? <Sing_Link href="/">지금 가입하세요</Sing_Link>.
                        </Sign_Wrapper>
                        <Explain_Wrapper>
                            <Explain>
                                Netflix Clone 프로젝트 입니다.
                            </Explain>
                        </Explain_Wrapper>
                    </Footer_Cotainer>
                </Login_Container>

            </Login_Wrapper>
        </Login_Screen_Container>
        
    );
}

export default Login;