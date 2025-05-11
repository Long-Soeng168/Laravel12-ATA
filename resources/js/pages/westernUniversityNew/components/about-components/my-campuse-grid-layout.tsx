"use client";
import { describe } from "node:test";
import { ParallaxScroll } from "../ui/parallax-scroll";

export function MyCampuseGridLayout() {
  return <ParallaxScroll images={images} />;
}

const images = [
    {
        src: "https://static.wixstatic.com/media/3e2458_6589a0a1e9694832903f8fb90d74b646~mv2.jpg/v1/fill/w_1173,h_841,al_c,q_85,enc_avif,quality_auto/Stadium-Campus.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_329077a8cd6f49d6809be901998d80a7~mv2.jpg/v1/fill/w_1878,h_1256,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sunway.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_f8616f380a8a4a709e2e826fdfb82090~mv2.jpg/v1/fill/w_1876,h_1202,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Northwest-Camnpus.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_2ffcf12b4fa1426f86c80b903e280711~mv2.jpg/v1/fill/w_1876,h_1380,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaza.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_6589a0a1e9694832903f8fb90d74b646~mv2.jpg/v1/fill/w_1173,h_841,al_c,q_85,enc_avif,quality_auto/Stadium-Campus.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_329077a8cd6f49d6809be901998d80a7~mv2.jpg/v1/fill/w_1878,h_1256,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sunway.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_f8616f380a8a4a709e2e826fdfb82090~mv2.jpg/v1/fill/w_1876,h_1202,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Northwest-Camnpus.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_2ffcf12b4fa1426f86c80b903e280711~mv2.jpg/v1/fill/w_1876,h_1380,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaza.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_6589a0a1e9694832903f8fb90d74b646~mv2.jpg/v1/fill/w_1173,h_841,al_c,q_85,enc_avif,quality_auto/Stadium-Campus.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_329077a8cd6f49d6809be901998d80a7~mv2.jpg/v1/fill/w_1878,h_1256,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sunway.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_f8616f380a8a4a709e2e826fdfb82090~mv2.jpg/v1/fill/w_1876,h_1202,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Northwest-Camnpus.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
    {
        src: "https://static.wixstatic.com/media/3e2458_2ffcf12b4fa1426f86c80b903e280711~mv2.jpg/v1/fill/w_1876,h_1380,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaza.jpg",
        title: "Stadium (Main Campus)",
        description: "ADDRESS: #20, St. 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia.",
        phone:"TEL : 016 699 192 / 078 672 072 / 097 886 0979",
        email:" E-mail: info@western.edu.kh",
    },
   

  
];
