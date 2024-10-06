import {
  IconAperture,
  IconCopy,
  IconFile,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconQuestionMark,
  IconStack,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Trang chủ",
  },
  {
    id: uniqueId(),
    title: "Quiz",
    icon: IconStack,
    href: "/portal/pages/quizs",
  },
  {
    id: uniqueId(),
    title: "Quản lý tài khoản",
    icon: IconStack,
    authorities:["ROLE_ADMIN"],
    href: "/portal/pages/accounts",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogin,
    href: "/portal/signout",
  },
];

export default Menuitems;
