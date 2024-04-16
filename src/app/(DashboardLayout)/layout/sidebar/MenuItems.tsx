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
    href: "/pages/quizs",
  },
  {
    id: uniqueId(),
    title: "Kho câu hỏi",
    icon: IconQuestionMark,
    href: "/pages/question-bank",
  },
  {
    id: uniqueId(),
    title: "Tài liệu",
    icon: IconFile,
    href: "/pages/documents",
  },
  {
    id: uniqueId(),
    title: "Kỷ niệm",
    icon: IconMoodHappy,
    href: "/pages/memories",
  },
  {
    navlabel: true,
    subheader: "Cấu hình",
  },
  {
    id: uniqueId(),
    title: "Tag",
    icon: IconCopy,
    href: "/settings/tag",
  },
  {
    id: uniqueId(),
    title: "Chủ đề",
    icon: IconCopy,
    href: "/setting/content-category",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
