export type Employee = {
  uuid: number;
  first: string;
  last: string;
  country: "France" | "Spain" | "Germany";
  email: string;
  salary: number | string;
};

export const employees: Employee[] = [
  {
    uuid: 1,
    first: "Susan",
    last: "Moore",
    country: "France",
    email: "susan.moore@example.com",
    salary: 2422,
  },
  {
    uuid: 2,
    first: "Gabriella",
    last: "Obrien",
    country: "France",
    email: "gabriella.obrien@example.com",
    salary: 5163,
  },
  {
    uuid: 3,
    first: "Joseph",
    last: "Harris",
    country: "Spain",
    email: "joseph.harris@example.com",
    salary: 1059,
  },
  {
    uuid: 4,
    first: "Ray",
    last: "Phillips",
    country: "Spain",
    email: "ray.phillips@example.com",
    salary: 4588,
  },
  {
    uuid: 5,
    first: "Susan",
    last: "Day",
    country: "Germany",
    email: "susan.day@example.com",
    salary: 6683,
  },
  {
    uuid: 6,
    first: "Micheal",
    last: "Hart",
    country: "Germany",
    email: "micheal.hart@example.com",
    salary: 4670,
  },
];
