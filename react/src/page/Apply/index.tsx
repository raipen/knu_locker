import { useContext } from "react";
import ApplyContext from "@context/ApplyContext";
import useApply from "@hooks/useApply";
import Applicant from "./Applicant";
import { MainContainer } from "@components/index";
import SelectLocker from "./SelectLocker";
import Done from "./Done";
import StepBar from "./StepBar";

export default function Apply(){
    const contextValue = useApply();
    const { step } = contextValue;
    const applyStep = [
        <Applicant />,
        <SelectLocker />,
        <Done />
    ]
    return (
        <ApplyContext.Provider value={contextValue}>
            <MainContainer>
                <StepBar />
                {applyStep[step]}
            </MainContainer>
        </ApplyContext.Provider>
    );
}
