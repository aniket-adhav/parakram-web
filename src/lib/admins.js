// src/lib/admins.js

export const MASTER_ADMINS = [
  "aniketadhav022@gmail.com",
  "viveknikam22104@gmail.com",
  "p07164753@gmail.com"
];

export const DEPARTMENT_ADMINS = {
  "mhaskeomkar066@gmail.com": "Computer", // ✅ COMPUTER ADMIN
  // "aniadhav811@gmail.com": "Computer", 
  "vaishnavibabar9018@gmail.com": "AIDS",
  "nikhilmutha890@gmail.com": "Electrical",
  "gaikwadshivam2004@gmail.com": "Civil",
  "saikardel44@gmail.com": "Mechanical",
  "sainathkalkekar863@gmail.com": "ENTC",
  "thoratpranav0307@gmail.com": "First Year (All Departments)",
  "aniadhav811@gmail.com": "First Year (All Departments)",
  "kartikgaikwad1418@gmail.com": "STR",
  "mr.irle3466@gmail.com": "A&R",
  "kanchanpotghan2003@gmail.com": "INSTRU",
  "rutwikc2004@gmail.com": "IT",
};

export const ADMIN_EMAILS = [
  ...MASTER_ADMINS,
  ...Object.keys(DEPARTMENT_ADMINS),
];