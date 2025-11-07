
  export const transformResult = (result) => ({
  id: result.result_id,
  examiner_name: `${result.Examiner?.first_name || ""} ${result.Examiner?.last_name || ""}`,
  email: result.Examiner?.email || "N/A",
  department: result.Examiner?.Department?.dept_name || "N/A",
  quiz_name: result.Quiz?.quiz_name || "N/A",
  score: result.score ?? 0,
  status: result.status,
  date: new Date(result.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
});

export const transformExaminers = (examiner) => ({
    id: examiner.examiner_id,
    examiner_name: `${examiner.first_name} ${examiner.last_name}`,
    department: examiner.Department?.dept_name || "N/A",
    email: examiner.email,
    date: new Date(examiner.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });

  
export const filteredDepartments = (departments, searchTerm, filterActive) => departments.filter((dept) => {
    const matchesSearch = dept.dept_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && dept.is_active) ||
      (filterActive === "inactive" && !dept.is_active);
    return matchesSearch && matchesFilter;
  });
