//#region > Exports
// Exports a object containing various dummy data for the company page
export default {
  milestones: [
    { date: "11.11.2017", name: "First employee", icon: "user-circle" },
    { date: "20.09.2017", name: "Foundation", icon: "fire-alt" },
  ],
  platforms: [
    {
      name: "facebook",
      url: "https://www.facebook.com/werbeagentur.aichner",
      data: { followers: 323, avgLikes: 12 },
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/aichnerchristian/",
      data: { followers: 2713, avgLikes: 142 },
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/company/19205978",
      data: { followers: 2, avgLikes: 0 },
    },
  ],
  employees: [
    {
      full_name: "Christian Aichner",
      position: "CEO / Founder",
      birthdate: "21.09.1998",
      joined: "23.09.2017",
      country: "Austria",
      school: "HTL Villach",
      study: "Mediatechnology",
      tasks: [
        "JavaScript",
        "ReactJS",
        "HTML",
        "CSS",
        "Leadership",
        "Project Management",
        "Corporate management",
        "Graphics Design",
        "Filmmaking",
      ],
    },
    {
      full_name: "Luca Allmaier",
      position: "Social Media Manager",
      birthdate: null,
      joined: "01.05.2020",
      country: "Austria",
      school: "HTL Villach",
      study: "Mediatechnology",
      tasks: ["Graphics Design", "Social Media", "Customer retention"],
    },
    {
      full_name: "Nico Kleber",
      position: "Social flexing expert",
      birthdate: null,
      joined: "06.06.2019",
      country: "Canada",
      school: null,
      study: null,
      tasks: null,
    },
  ],
  company: {
    name: "Werbeagentur Christian Aichner",
    description:
      "Advertisement Agency based in Villach-Landskron, Carinthia, Austria. Top Open Source agency in Carinthia.",
    employees: 3, // Number of employees including founder (min. value: 1)
    vat: {
      id: "ATU72504738",
      verified: true,
    },
    email: "contact@aichner-christian.com", // Company contact email
    localRelevance: true, // Is the company present in local media and / or well known?
    verified: true, // Verified badge
    growth: 2, // -2 strong decrease, -1 decrease, 0 stagnant, 1 growth, 2 fast growth
    revenueGrowth: {
      comparedTo: "last year", // last year, last quarter, last month
      value: 87, // Rate of growth
      unit: "%", // Is the rate of growth in %, €, ...?
    },
    contributors: [
      {
        url: "https://github.com/orgs/aichner/people", // URL to people overview
        value: 11, // Number of contributors
        platform: "github", // Platform for displaying icon (https://mdbootstrap.com/docs/react/content/icons-list/)
      },
      {
        url: null,
        value: 13,
        platform: "gitlab",
      },
      {
        url: null,
        value: 0,
        platform: "bitbucket",
      },
    ],
    sites: [
      {
        address: "Emailwerkstraße 29",
        country: "Austria",
        zip: "9523",
        city: "Villach-Landskron",
      },
    ],
    isRecruiting: true, // Is the company actively searching for new employees?
    isOpenSource: true, // Is the company developing open source or is some of its software open source?
    references: {
      github: "https://github.com/aichner",
    },
  },
};
//#endregion
