function DrugTable({ data, onCompanyClick }) {
  if (data.length === 0) return <p>No data found.</p>;

  return (
    <table border="1" cellPadding="10" style={{ marginTop: "15px", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th>Id</th>
          <th>Code</th>
          <th>Name (Brand)</th>
          <th>Company (Click to Filter)</th>
          <th>Launch Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={item.code}>
            <td>{index + 1}</td>
            <td>{item.code}</td>
            <td>
              {item.genericName} ({item.brandName})
            </td>
            <td
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
              onClick={() => onCompanyClick(item.company)}
            >
              {item.company}
            </td>
            <td>
              {new Date(item.launchDate).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DrugTable;