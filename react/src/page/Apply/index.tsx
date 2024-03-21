import { useContext } from "react";
import ApplyContext from "@context/ApplyContext";
import useApply from "@hooks/useApply";
import Applicant from "./Applicant";
import { MainContainer } from "@components/index";

export default function Apply(){
    const contextValue = useApply();
    const { step } = contextValue;
    const applyStep = [
        <Applicant />,
    ]
    return (
        <ApplyContext.Provider value={contextValue}>
            <MainContainer>
                {/* <Steps /> */}
                {applyStep[step]}
            </MainContainer>
        </ApplyContext.Provider>
    );
}
