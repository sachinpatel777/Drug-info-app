function CompanyFilter({ companies, selectedCompany, onChange }) {
  return (
    <select
      value={selectedCompany}
      onChange={(e) => onChange(e.target.value)}
    >
      {companies.map((company) => (
        <option key={company} value={company}>
          {company}
        </option>
      ))}
    </select>
  );
}

export default CompanyFilter;
