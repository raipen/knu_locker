import { Link } from "react-router-dom";

export default function Menu({cName,href, icon, iconType="", text,date,disabled=false}) {
    return (
        <Link to={href} className={cName}  disabled={disabled}>
            <div>
                <div><span className={"material-icons"+iconType}>
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