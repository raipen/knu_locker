import Menu from "./Menu";
import styles from "./Main.module.css";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Main() {
  const deadline = new Date(import.meta.env.VITE_DEAD_LINE);
  const startDate = new Date(import.meta.env.VITE_START_DATE);
  const nextDayOfDeadline = new Date(deadline.getTime() + 24 * 60 * 60 * 1000);

  const data =  [{
    isDisabled: new Date() > deadline || new Date() < startDate,
    date: new Date() > deadline || new Date() < startDate ? "신청기간이 아닙니다." : ("~" + import.meta.env.VITE_DEAD_LINE),
  },
  {
    isDisabled: true,
    date: "신청기간이 아닙니다."
  },
  {
    isDisabled: new Date() < nextDayOfDeadline,
    date: (new Date(nextDayOfDeadline.getTime() + 9 * 60 * 60 * 1000)).toISOString().substring(0, 19).replace('T', ' ') + "~",
  }];

  let menus = [{
    cName: styles.menu + " " + (data[0]?.isDisabled ? styles.disable : ""),
    href: data[0]?.isDisabled ? "/" : "/apply",
    icon: "mouse",
    iconType: "-outlined",
    text: "사물함 1차 신청",
    date: data[0]?.date,
  }, {
    cName: styles.menu + " " + (data[1]?.isDisabled ? styles.disable : ""),
    href: "/",
    icon: "groups",
    text: "사물함 추가 신청",
    date: data[1]?.date,
  }, {
    cName: styles.menu + " " + (data[2]?.isDisabled ? styles.disable : ""),
    href: data[2]?.isDisabled ? "/" : "/result",
    icon: "check_circle",
    text: "사물함 신청 결과",
    date: data[2]?.date,
  }];

  return (
    <div style={{ background: "#da2127" }}>
      <span className={styles.deco + " material-icons-outlined"}>
        laptop_mac
      </span>
      <article className={styles.article}>
        {menus.map((menu, index) => {
          return <Menu key={index} {...menu} />
        })}
      </article>
    </div>
  )
}
