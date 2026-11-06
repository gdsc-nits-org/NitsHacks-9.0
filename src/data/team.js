// Team card content.
// Photos live in src/assets/NITSHACKS-HEADS and are matched automatically
// by the person's name (the part of the filename before the first "_").
// So "Aman Raj _Management + Dev Head.jpg" -> matches the name "Aman Raj".
import headPlaceholder from "../assets/team/head-placeholder.webp";
import memberPlaceholder from "../assets/team/member-placeholder.webp";

// Load every browser-supported image in the folder (Vite).
// HEIC and other files are ignored so they can't break the build.
const photos = import.meta.glob(
  "../assets/NITSHACKS-HEADS/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" },
);

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// { "amanraj": "/assets/Aman Raj ...jpg", ... }
const photoByName = {};
Object.entries(photos).forEach(([path, url]) => {
  const file = path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, ""); // drop extension
  const namePart = file.split("_")[0]; // text before first "_"
  photoByName[normalize(namePart)] = url;
});

const links = { github: "#", linkedin: "#", instagram: "#" };

const person = (name, role, fallback) => {
  const img = photoByName[normalize(name)];
  if (!img) console.warn(`[team.js] No photo found for "${name}"`);
  return { name, role, img: img || fallback, links };
};

// First section (big HeadCard) uses the head placeholder,
// second section (ComicCard) uses the member placeholder.
const bigCard = (name, role) => person(name, role, headPlaceholder);
const comicCard = (name, role) => person(name, role, memberPlaceholder);

// SECTION 1: Coordinators
export const coordinators = [
  bigCard("Anirban Bora", "Chief Coordinator"),
  bigCard("Abhinav Narayan Dev", "Coordinator"),
  bigCard("Hirak Rajbonshi", "Coordinator"),
  bigCard("Iftikar Hussain", "Coordinator"),
  bigCard("Priyanshu Kashyap", "Coordinator"),
  bigCard("Saibalik Chakraborty", "Coordinator"),
  bigCard("Upamanyu Jit Phukan", "Coordinator"),
  bigCard("Vikrant Agarwala", "Coordinator"),
];

// SECTION 2: Event heads
export const heads = [
  comicCard("Aman Raj", "Management + Dev Head"),
  comicCard("Tarpan Saikia", "Dev Head"),
  comicCard("Bugmita Bora", "Dev Head"),
  comicCard("Hemant Verma", "Software Track Head"),
  comicCard("Sivangi Kashyap", "Software Track Head"),
  comicCard("Dhruv Kumar", "Coding Track Head"),
  comicCard("Dishank Choudhury", "Coding Track Head"),
  comicCard("Rahul Kumar", "UI/UX Track Head"),
  comicCard("Mayur Kalita", "UI/UX Head"),
  comicCard("Bedanta Prakash Barman", "Design Head"),
  comicCard("Geetansh Vikram", "Design & Content Head"),
  comicCard("Kashish Agrawal", "Design & Content Head"),
  comicCard("Jyotishmita Borah", "Marketing Head"),
  comicCard("Ankit Yadav", "Outreach Head"),
  comicCard("Sabrin Ara Begum", "PR Head"),
  comicCard("Akshay Singh", "Coding Track Head"),
];

// SECTION 2: Co-heads (shown after the event heads)
export const coHeads = [
  comicCard("Harshit Agarwal", "Event Management Co-Head"),
  comicCard("Surojit Roy", "Web UI Co-Head"),
];
