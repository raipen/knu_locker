import styles from "./SendButton.module.css"

export default function SendButton({disabled,text,reff}){
    
    return (
        <button id="submit" type="submit" ref={reff} disabled={disabled} className={styles.button}>
            {text}
        </button>
    );
}