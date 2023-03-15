import styles from "./index.module.css";

export default function ({info}) {
    return (
    <>
        <h1>{info}</h1>
        <p>
            <span className="material-icons-outlined">
                error_outline
            </span>
            <span>
                문제가 지속될 경우 재정부장(카카오톡 아이디: jmin9011)에게 문의해주세요.
            </span>
        </p>
    </>);
}