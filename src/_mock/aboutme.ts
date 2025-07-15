import { birthDate } from "../config";

// ----------------------------------------------

function getAge() {
  const tempBirthDate = new Date(birthDate);
  const tempToday = new Date();
  let age = tempToday.getFullYear() - tempBirthDate.getFullYear();
  const month = tempToday.getMonth() - tempBirthDate.getMonth();
  if (
    month < 0 ||
    (month === 0 && tempToday.getDate() < tempBirthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export const aboutMe = {
  title: "Let me introduce myself...",
  details: [
    {
      id: 1,
      text: ` I'm Zanan Virani, a ${getAge()}-year old programmer from Markham, Canada.`,
      icon: "👋",
    },
    {
      id: 2,
      text: "Currently in my 3rd year of the Computer Science + Ivey HBA dual degree program at Western University. Go Mustangs! 🐎",
      icon: "🎓",
    },
    {
      id: 3,
      text: "I love building things — whether it’s mobile apps, full-stack web apps, or just fun side projects that solve real problems.",
      icon: "🛠️",
    },
    {
      id: 3,
      text: "I thrive on challenge and get excited by projects that push me to learn something new or think in a different way.",
      icon: "🎯",
    },
    {
      id: 4,
      text: "I'm a fast learner who thrives in new environments — no matter how tough the obstacle, I tackle it with curiosity, grit, and a positive attitude.",
      icon: "💪",
    },
    {
      id: 6,
      text: `
              My primary fields of interest are software engineering, quantitative development, machine learning, and data science.
           `,
      icon: "🔎",
    },
    {
      id: 7,
      text: " I'm fluent in many programming languages, including C++, Python, Java, and more!",
      icon: "💻",
    },
    {
      id: 8,
      text: "In my free time, I enjoy hiking, doing Brazilian jiu-jitsu, playing sports, gaming, and watching movies or shows — I like to stay active and have fun!",
      icon: "🌟",
    },
    {
      id: 9,
      text: "I love meeting new people and sharing ideas — whether you're into tech or just want to chat, feel free to reach out! I promise I don't bite 🐶",
      icon: "🤝",
    },
  ],
};
