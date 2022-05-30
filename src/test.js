const assignData = [
  {
    code: "client",
    partner: { fullName: "P0014 - 123 Services", id: 14, $version: 5 },
    name: "123 Service",
  },
  {
    code: "admin",
    partner: { fullName: "P0067 - Admin", id: 67, $version: 2 },
    name: "Admin",
  },
  {
    code: "purch",
    partner: { fullName: "DAVID Alex", id: 60, $version: 3 },
    name: "Alex DAVID",
  },
  {
    code: "sms2",
    partner: { fullName: "GIRAULT Anne", id: 58, $version: 3 },
    name: "Anne GIRAULT",
  },
  {
    code: "democrm",
    partner: { fullName: "DEMOCRM Charles", id: 55, $version: 3 },
    name: "Charles DEMOCRM",
  },
  {
    code: "consultant",
    partner: { fullName: "MARTIN Charles", id: 53, $version: 3 },
    name: "Charles MARTIN",
  },
  {
    code: "supp1",
    partner: { fullName: "MARCHAL Cyril", id: 63, $version: 3 },
    name: "Cyril MARCHAL",
  },
  {
    code: "projmg",
    partner: { fullName: "SILVA Daniel", id: 52, $version: 3 },
    name: "Daniel SILVA",
  },
  {
    code: "suppmg",
    partner: { fullName: "MAURIN David", id: 62, $version: 3 },
    name: "David MAURIN",
  },
  {
    code: "demo",
    partner: { fullName: "P0068 - Demo", id: 68, $version: 2 },
    name: "Demo",
  },
];



const assignTo = assignData.map((x) => {
  return { code: x.code, fullName: x.name, id: x.partner.id };
});


const teamsData = [
  {
    code: "NTH",
    name: "North",
    id: 1,
  },
  {
    code: "STH",
    name: "South",
    id: 2,
  },
  {
    code: "EXP",
    name: "IDF-Exp",
    id: 3,
  },
  {
    code: "GRL",
    name: "General",
    id: 4,
  },
];

const priority = ["low", "normal", "high", "urgent"];
const priorityLabel = ["Low", "Normal", "High", "Urgent"];
const status = ["new", "in-progress", "closed", "canceled"];
const statusLabel = ["New", "In Progress", "Closed", "Canceled"];

export {
  assignData,
  assignTo,
  teamsData,
  priority,
  priorityLabel,
  status,
  statusLabel,
};





