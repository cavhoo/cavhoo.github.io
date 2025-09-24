export interface ProjectData {
  title: string;
  status: "active" | "hold" | "complete";
  description: string;
  link: string;
}

export const projects: ProjectData[] = [
  {
    title: "PixiDust",
    status: "active",
    description: "",
    link: "",
  },
  {
    title: "Rust SCSS Modules",
    status: "hold",
    description: "",
    link: "",
  },
];
