import { Product, Series } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wing Gundam Zero EW Ver. Ka",
    series: "Endless Waltz",
    grade: "MG",
    scale: "1/100",
    price: 65.0,
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5-u6eaLEIBXWEajA_BPvyBHIqZNoUQwZWespc3-lPtqmx7FL1Q9p38O2kodSoAgntNWMkyruQDbgd-RIceDDA56lyt5Y_D8jr0N7AcBXCVi3-t6srHy6THwZr8xNMsdjFel-syYK33aryCvyU_hgjuhPt5ZpiikxEVpTUIbE0_MXGwiyNaBr-YEaL3LEzOOcfLtono8vEin_29dEwU6c2i7CQVZPLPx9um4LnhmvZkzknHOWBjJWCBSYPZ_73mOCnJahXKDsNmRQ",
    stock: 24,
    description:
      "The iconic Wing Zero from Endless Waltz, designed by Hajime Katoki.",
  },
  {
    id: "2",
    name: "God Gundam",
    series: "G Gundam",
    grade: "RG",
    scale: "1/144",
    price: 38.0,
    rating: 5.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCi59V-qXQD20ftFskvv2L3gOJxOmUDxCXAgvePydZb18avMiAa2vc6XbPLHBqgKP12hg2Amyw8DubRTsFhI4Jh_TgJ7jVvPwc2SU366l0xUyhVKau5FOwqdoM1dESqLzOh8GLGPIDIvTzSVJUVFKtcffdVzZu-EjvNqPGJQ7pq4Dgo9He52JFshvEBGCxKbA-etDtycq9cJJOjKz4yYZ3M1YxmCzg24Pgq2EhNUmEfx1_XPzcSPAnE9HWavpcKop8VlIGwKJ3P31A",
    stock: 12,
    hot: true,
    description: "The burning soul of Neo Japan, now in the Real Grade line.",
  },
  {
    id: "3",
    name: "RX-78-2 Unleashed",
    series: "Mobile Suit Gundam",
    grade: "PG",
    scale: "1/60",
    price: 290.0,
    rating: 5.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWXQ1drMz3D_ZbkyBquB-EUN8pz6N1HElkRifpZr6O0LYW-Vrp2flmnG04472XPpFDSq6BU_wet7eofKy8pD-Mkf8hZm-ZvZsVO_LapXAtvndi0SevteQg2NbG8zprJmMS2efvUgsU_iX39V0Y7fQqlPsbAHa6_akQnJ511LfEjj5-wyCrgod_GP3O22e50z117hBKKVHxxJqU4BsFUEC4kJvPVNQYxWS4ewyp-_AfS47QzR8XzfXp6N6axfP_bQtZWkA4y4XsfFM",
    stock: 3,
    description:
      "The ultimate Gunpla building experience with a multi-layered internal frame.",
  },
  {
    id: "4",
    name: "Barbatos Lupus Rex",
    series: "Iron-Blooded Orphans",
    grade: "HG",
    scale: "1/144",
    price: 18.0,
    rating: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoDsbkvSS49Lan541Ab-POUhb3NSESXHhwxDScWZGpIQmgp8IJ_uVd_GX9OIEzqmfF3srDpw2I3Ln2PrvCZCkKKbKxz2AG-H5xQGXdM32DZ--knqmb6K_PMLyfWy1Um4l0C2A9-XdDSaAPr3ZW5N826wBqK8Ti04Ta2uFZ6yZKhzWHHR03a50bwNORQu2OSHjlWfOa9--PtVO43KuEu2WO46XhBPMD-6-_KAUI-nzlNkKkvIFLibf2p_eY3RYgWJtC6sfO0mQv2oU",
    stock: 0,
    description: "The ferocious final form of the Barbatos mobile suit.",
  },
  {
    id: "7",
    name: "GodHand SPN-120 Ultimate Nipper",
    series: "Premium Tools",
    grade: "TOOL",
    scale: "N/A",
    price: 55.0,
    rating: 5.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCi-U0h7Y90_D0O9G2z0K7U_S2T1U_L0Z2mP9o",
    stock: 15,
    hot: true,
    description: "The gold standard for single-edged nippers.",
  },
  {
    id: "8",
    name: "Tamiya Panel Line Accent Color (Black)",
    series: "Finishing Materials",
    grade: "PAINT",
    scale: "40ml",
    price: 9.5,
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDW-P0h7Y90_D0O9G2z0K7U_S2T1U_L0Z2mP9o",
    stock: 100,
    description: "Easy-to-use enamel paint for panel lining.",
  },
  {
    id: "9",
    name: "Custom Weathering Service",
    series: "Workshop Services",
    grade: "SERVICE",
    scale: "Variable",
    price: 120.0,
    rating: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBo-U0h7Y90_D0O9G2z0K7U_S2T1U_L0Z2mP9o",
    stock: 5,
    description:
      "Professional grade weathering and battle damage for your kit.",
  },
  {
    id: "5",
    name: "Sazabi Ver. Ka",
    series: "Char's Counterattack",
    grade: "MG",
    scale: "1/100",
    price: 98.0,
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZZciJl43bfUpQkGA8cy4DQwZ8Gf9TUtGBQ-dwHbUk1XDtcpQu0OfosqGTcZtY-fiAfXQ0oNw-F3NV5Lk2Quxjy07iKZ78bQ9jcfU1SL29IByjoQqKPaSq2_socWropoCbcL-nSDlRu3ZSfgFmVIspKRjXP_L9gmdo7j1Onm5mKvLJrNvOJ_Jg3AHtzuVCWGpiQXcnQhEPDEz6LJ_A7Ro9EUW8cFH1mETGagVk7ngUkLBIFkw9edgq2UM27hqcyz_Oj3xAH-0Q90",
    stock: 4,
    description: "The massive crimson mobile suit of the Neo Zeon's leader.",
  },
  {
    id: "6",
    name: "Gundam Aerial",
    series: "Witch from Mercury",
    grade: "HG",
    scale: "1/144",
    price: 22.0,
    rating: 4.7,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALtvjUQcSV8klcCRBmNb7RX55HrhXXnsOtv5KiZ9q9JdUx4SQYsgw31DJdlKlASaphjMiVYf4NU6Lq0CdbrXcC752MyWckt81zauwijRfqP1ZsA-Wpl3BWGHAsHuVYYYR99HrHU87TrUmcJzs93FMBgDe1xRAre2lzwWpWSfjbbZBQweTXx3ssstJrx_R834eNTafG6fmm4RkapPon_2MWe5t65pdnv0idCB1jzFjGziXwo1dfU5B_Z8b7d-KoDPS8xr7nUBT5358",
    stock: 86,
    description: "The mysterious suit from the Ad Stella timeline.",
  },
];

export const SERIES: Series[] = [
  {
    id: "uc",
    name: "Universal Century",
    timeline: "Original Series",
    tag: "EFSF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYXI-rZETRDn8ECWwp3g4QE0308T_UNA5WnLkLyh4zLzIQ56Z5s8kJgv1bgzGT9-XUYL_8Tly0cPyvcCE85bVJ3faXRQf5djNPu9oxkhm5OEEKVBnMwPF8P6-NyV8CNzIjvwhZA5jOXQu1MKG6cuAJm4UmQdOjsV4WzETC9GoVBcPyku-08jyvsWZ_joPY2COOkXNLR3_2oA72FZ5gjWYwD_OZWoQVAJNZH0KanyzbxQIWKptIG-lI8S2BxHJ0I8vtzSjIqKfZMyA",
  },
  {
    id: "ce",
    name: "Cosmic Era",
    timeline: "Gundam SEED",
    tag: "ZAFT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBabp8A5UuCCCn1FS937BDXMSNcfoq0VXMvf9gontVUcbG2XV4H2AMU29RdSXOVboTYFOM2JpgzIZJ0cy-2Ov3jjvRbj_VX8ZBndpSvmt1KWbQX9K4EIAm5ek8Y-72WmAbdr1bFVJYaoiGFKHZz7_T0GhaXjhkQCfLUM9l1RcVyAWFdLgPHqhQeGOC5bsul-lBORJsZxvMO1KamclSpcIJnBPZKFbc5v-mpVZo_iYotVRKDUfS-U68yeRp6LrlkrcZEZfSpxILngYw",
  },
  {
    id: "pd",
    name: "Post Disaster",
    timeline: "Iron-Blooded Orphans",
    tag: "Tekkadan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiJqVja61gxHFvGk7UYHQgr6aBu9udx3Ss-ITDs3vP6QwMFy0BA4Gop_qziG8pSUoBT2F1tShB1pSkT9YIDRulzShUwDRWaQTCIdKlePvXqDTz1n3jjoipQKB19Qjpa61KHxvuFAQOV3fJI0iB7iVc72d3EwzHeST-2I3N7-n2iRATr5A65e0nfT1O_fhpaHsDedIYPl4LGyB5dzAxXUDHf5dd6QOcouybpOvrg-znCKNDwWPmLJ8qtYaHUNo7HFgpjb1iTLwj-PI",
  },
  {
    id: "as",
    name: "Ad Stella",
    timeline: "Ad Stella",
    tag: "Asticassia",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfAcTy5kR4vDG6sx0Ij0H5866K8qKozIW2vuO646f5IswmlflcSA2xNg0rrMfaKDnUos2iXg9y5FyOTm4vQP2quxYMs2sGhkyBB6iqZAWwlqRYTdJRE_L3CMHTF-6gSn9dPLd-pvjwu5hPlGBh2EtFyxR3rI9iVu7jcMcRoLoA0VCxI2hbmU1gme8soMwHX7t69nIC2q8BLulch08GZTAY-uY0HybyRuU5m_bM1Z8oMT8_SlrHR3AkYC_6tTAVPk8bGAQYO4fDYSc",
  },
];
