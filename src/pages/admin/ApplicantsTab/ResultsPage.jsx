import { useEffect, useState } from 'react';
import ExportButton from '../../../components/admin/ExportButton'
import FilterButton from '../../../components/admin/FilterButton'
import ExaminersTable from "../../../components/admin/ExaminersTable";
import MobileScrollableCards from '../../../components/admin/MobileScrollableCards';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useMediaQuery } from '@mui/material'
import { getAllResults } from '../../../../api/api';
import { Search } from 'lucide-react';

function ResultsPage() {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const isMobile = useMediaQuery("(max-width:600px)");



  const headerCells = [
                  { id: "id", label: "ID" },
                  { id: "examiner_name", label: "Name" },
                  { id: "email", label: "Email" },
                  { id: "department", label: "Department" },
                  { id: "quiz_name", label: "Quiz" },
                  { id: "score", label: "Score" },
                  { id: "status", label: "Status" },
                  { id: "date", label: "Date" },
                ]

  const columns = [
    { id: "id", label: "ID" },
    { id: "examiner_name", label: "Applicant Name", bold: true },
    { id: "email", label: "Email"},
    { id: "department", label: "Department" },
    { id: "quiz_name", label: "Quiz" },
    { id: "score", label: "Score" },
    { id: "status", label: "Status" },
    { id: "date", label: "Date" },
  ];


  const fetchAllTests = async () => {
  try {
    setIsLoading(true);

    const res = await getAllResults();
    console.log(res);

    setData(res);
    
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch results");
  } finally {
    setIsLoading(false);
  }
};

//searching
const handleSearch = (query) => {
  if (!query) {
    fetchAllTests();
    return;
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
  setData(filteredData);
}


  useEffect( () => {
    fetchAllTests()
  }, [])

  return (
        <div className='h-screen w-full px-3 sm:px-6 md:px-8 py-6'>
          <div className='mb-20'>
            {/* Header */}
             <h1 className="text-[#2E99B0] text-md sm:text-md md:text-xl lg:text-2xl  xl:text-3xl font-['Poppins']">
            Results
            </h1>
            <p>
              This table is for test results
            </p>
          </div>
          <div className='flex gap-4 mb-4'>
            {/* searchbar */}
             <div className="relative w-full mr-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2E99B0]" />
                  <input
                      type="text"
                      placeholder="Search"
                      onChange={(e) => handleSearch(e.target.value)}
                      className="border border-[#D1D1D1] group-hover:border-[#2E99B0] p-3 pl-10 rounded-lg w-full bg-white focus:outline-none"
                  />
              </div>
            {/* buttons */}
            <FilterButton />
            <ExportButton />
          </div>
          {/* Table */}
          {data.length === 0 ? (
            // Baguhin ito ng iisang no data screen.
          <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-slate-400 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v-9A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5l9 6 9-6"
                />
              </svg>
              <p className="text-slate-600 font-medium">No Candidates Found</p>
              <p className="text-slate-400 text-sm">Please check back later or add new candidates.</p>
            </div>
        ) :(
            <div className="rounded-lg shadow-md bg-white overflow-x-auto">
              {isMobile ? (
                <MobileScrollableCards candidates={data}/>
              ) : (      
              <ExaminersTable
                candidates={data}
                headerCells={headerCells}
                columns={columns}
                tableName={"Results"}
              />
              )}
            </div>
          )}
        </div>
  )
}

export default ResultsPage