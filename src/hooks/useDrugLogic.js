import { useState, useMemo } from 'react';
import drugData from '../drugs.json';

export const useDrugLogic = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleReset = () => {
    setSelectedCompany('');
    setSearchQuery('');
    setPage(1);
  };

  const processedData = useMemo(() => {
    return [...drugData]
      .sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate))
      .map((item, index) => ({ 
        ...item, 
        id: index + 1,
        formattedDate: new Date(item.launchDate).toLocaleDateString()
      }));
  }, []);

  const companies = useMemo(() => {
    return [...new Set(processedData.map(d => d.company))].sort();
  }, [processedData]);

  const filteredDrugs = useMemo(() => {
    return processedData.filter((drug) => {
      const matchesCompany = selectedCompany ? drug.company === selectedCompany : true;
      const query = searchQuery.toLowerCase().trim();
      const combinedName = `${drug.genericName} (${drug.brandName})`.toLowerCase();
      return matchesCompany && (drug.code.toLowerCase().includes(query) || combinedName.includes(query));
    });
  }, [processedData, selectedCompany, searchQuery]);

  const count = Math.ceil(filteredDrugs.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredDrugs.slice(start, start + rowsPerPage);
  }, [filteredDrugs, page]);

  return {
    states: { selectedCompany, searchQuery, page, rowsPerPage, count, paginatedData, companies },
    actions: { setSelectedCompany, setSearchQuery, setPage, handleReset }
  };
};