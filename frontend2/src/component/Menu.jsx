import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export default function Menu({href, icon, text,date,disable=false}) {
    let disableClass = disable ? " disable" : "";
    return (
        <Link to={href} className={["menu"+disableClass, styles.menu].join(" ")}>
            <div>
                <div><span className="material-icons-outlined">
                    {icon}
                    </span></div>
                <div>{text}</div>
                <div>{date}</div>
                <div><span className="material-icons-outlined">
                    arrow_forward_ios
                    </span></div>
            </div>
        </Link>
    )

}