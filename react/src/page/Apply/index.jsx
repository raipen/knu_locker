import { useContext } from "react";
import ApplyContext from "@context/ApplyContext";
import useApply from "@hooks/useApply";
import Steps from "./Steps";
import { MainContainer } from "@components/index";
import Input from "@components/Input";

export default function Apply(){
    const contextValue = useApply();
    const { step } = contextValue;
    const applyStep = [
        <div>
            <Input label="이름" placeholder="호반우" type="text" {...contextValue.name} />
        </div>,
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
