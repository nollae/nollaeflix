import styled from 'styled-components';

const Footer_ = styled.footer`
    display: block;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 4.5rem !important;
    margin-bottom: 4.5rem !important;
    color: rgba(255, 255, 255, 0.7);
    margin: auto;
    font-size: 1rem;
    font-weight: 400;
`;

const Footer_Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: inherit;
    height: auto;
`;

const Footer_Container = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    height: inherit;
    margin-top: -0px;
    margin-left: -0px;
    width: 100%;
    flex-direction: row;
    padding: 0px;
`;

const Footer_Resume_Wrapper = styled.div`
    flex: 0 0 100%;
    display: inline-flex;
    flex-wrap: wrap;
    width: inherit;
    padding: 0px;
    margin-top: 0px;
    margin-left: 0px;
`;

const Footer_Repository = styled.div`
    margin-bottom: 0.75rem;
    a{
        color: rgba(255, 255, 255, 0.7);
        border-radius: 0.125rem;
        cursor: pointer;
        text-decoration: underline;
    }
`;

const Footer_About_Container = styled.div`
    margin: 0.75rem 0;
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
`;

const Footer_About_Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: inherit;
    height: auto;
`;

const Footer_About_List = styled.ul`
    display: inline-flex;
    flex-wrap: wrap;
    height: inherit;
    margin-top: -1rem;
    margin-left: -0.75rem;
    width: calc(100% + 0.75rem);
    flex-direction: row;
    padding: 0px;
`;

const Footer_About = styled.li`
    flex: 0 0 calc(25% - 0.75rem);
    display: inline-flex;
    flex-wrap: wrap;
    width: inherit;
    padding: 0px;
    margin-top: 1rem;
    margin-left: 0.75rem;
    a{
        color: rgba(255, 255, 255, 0.7);
        border-radius: 0.125rem;
        appearance: none;
        background: none;
        border: 0;
        box-sizing: content-box;
        display: inline;
        font: inherit;
        letter-spacing: inherit;
        line-height: inherit;
        margin: 0;
        padding: 0;
        cursor: pointer;
        text-decoration: underline;
        user-select: text;
    }
`;

function Footer(){

    return (
        <Footer_>
            <Footer_Wrapper>
                <Footer_Container>
                    {/* 이력서 */}
                    <Footer_Resume_Wrapper>
                        <Footer_Repository>
                            Netflix Clone Project of Nollae : 💾 Repository &nbsp;
                            <a>https://github.com/nollae/netflix_clone</a>
                            <br />
                        </Footer_Repository>
                    </Footer_Resume_Wrapper>
                    <Footer_Resume_Wrapper>
                        <Footer_Repository>
                            <b style={{fontWeight:900}}>Nollae</b> 에 대해서 더 알고싶으신가요?
                        </Footer_Repository>
                    </Footer_Resume_Wrapper>
                    <Footer_Resume_Wrapper>
                        <Footer_Repository style={{marginTop: "0.55rem", marginBottom: "0.15rem"}}>
                            <h1 style={{ fontSize: "1.3rem", fontWeight: "bold",}}>Contact</h1>
                        </Footer_Repository>
                    </Footer_Resume_Wrapper>
                    <Footer_Resume_Wrapper>
                        <Footer_About_Container>
                            <Footer_About_Wrapper>
                                <Footer_About_List>
                                    <Footer_About>
                                        <a href="mailto:m0924vie@gmail.com">👉 이메일(Email)</a>
                                    </Footer_About>
                                    <Footer_About>
                                        <a href="https://zeroangry.notion.site/c71027bbf6284cb683e154ca83b1bf7a">👉 이력서(Resume)</a>
                                    </Footer_About>
                                    <Footer_About>
                                        <a href="https://www.notion.so/zeroangry/449dbc1b886c47f695eae0d32dd026ae">👉 포트폴리오(Portfolio)</a>
                                    </Footer_About>
                                    <div style={{margin: "10px",}}></div>
                                </Footer_About_List>
                            </Footer_About_Wrapper>
                        </Footer_About_Container>
                    </Footer_Resume_Wrapper>
                    <Footer_Resume_Wrapper>
                        <Footer_Repository style={{marginTop: "0.55rem", marginBottom: "0.15rem"}}>
                            <h1 style={{ fontSize: "1.3rem", fontWeight: "bold",}}>Channel</h1>
                        </Footer_Repository>
                    </Footer_Resume_Wrapper>
                    <Footer_Resume_Wrapper>
                        <Footer_About_Container>
                            <Footer_About_Wrapper>
                                <Footer_About_List>
                                    <Footer_About>
                                        <a href="https://nollae.github.io/">👉 Blog</a>
                                    </Footer_About>
                                    <Footer_About>
                                        <a href="https://github.com/nollae">👉 Github</a>
                                    </Footer_About>
                                    <div style={{margin: "10px",}}></div>
                                </Footer_About_List>
                            </Footer_About_Wrapper>
                        </Footer_About_Container>
                    </Footer_Resume_Wrapper>
                </Footer_Container>
            </Footer_Wrapper>
        </Footer_>
    );
}

export default Footer;