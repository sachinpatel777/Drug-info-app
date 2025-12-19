import React from 'react';
import { Box } from '@mui/material';
import { useDrugLogic } from './hooks/useDrugLogic'; 

import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import DrugTable from './components/DrugTable';
import PaginationView from './components/PaginationView';

const App = () => {
  const { states, actions } = useDrugLogic();

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Header onReset={actions.handleReset} />
      
      <SearchFilters 
        searchQuery={states.searchQuery} 
        onSearchChange={(val) => { actions.setSearchQuery(val); actions.setPage(1); }}
        selectedCompany={states.selectedCompany}
        onCompanyChange={(e) => { 
          const value = e.target ? e.target.value : e;
          actions.setSelectedCompany(value); 
          actions.setSearchQuery(''); 
          actions.setPage(1); 
        }}
        companies={states.companies}
      />

      <DrugTable 
        data={states.paginatedData} 
        onCompanyClick={(company) => { actions.setSelectedCompany(company); actions.setSearchQuery(''); actions.setPage(1); }}
      />

      <PaginationView 
        count={states.count} 
        page={states.page} 
        onPageChange={(e, val) => actions.setPage(val)} 
      />
    </Box>
  );
};

export default App;