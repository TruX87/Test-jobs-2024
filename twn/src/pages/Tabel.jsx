import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Tabel.module.css";

function Tabel() {
  const [data, setData] = useState([]);
  const url = "https://midaiganes.irw.ee/api/list?limit=500";
  const [sorting, setSorting] = useState({ key: null, direction: "default" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [pageNumbers, setPageNumbers] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const maxPageNumbers = 5;

  const fetchData = async () => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          const fetchedData = result.error ? [] : result.list;
          setData(fetchedData);
          calculatePageNumbers(fetchedData);
        } catch (error) {
          console.error(error);
          setData([]);
          calculatePageNumbers([]);
        }
      };
    
      const calculatePageNumbers = (data) => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
    
        if (endPage - startPage + 1 < maxPageNumbers) {
          startPage = Math.max(1, endPage - maxPageNumbers + 1);
        }
    
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
    
        setPageNumbers(pageNumbers);
      };
    
      useEffect(() => {
        fetchData();
      }, [url]);
    
      const parseBirthDate = (personal_code) => {
        const codeStr = personal_code.toString();
        const century = Math.floor((parseInt(codeStr[0], 10) + 1) / 2) * 100 + 1700;
        const year = century + parseInt(codeStr.substring(1, 3), 10);
        const month = parseInt(codeStr.substring(3, 5), 10) - 1;
        const day = parseInt(codeStr.substring(5, 7), 10);
    
        return new Date(year, month, day);
      };
    
      const sort = (key) => {
        let direction = "asc";
        if (sorting.key === key) {
          if (sorting.direction === "asc") {
            direction = "desc";
          } else if (sorting.direction === "desc") {
            direction = "default";
          }
        }
        setSorting({ key, direction });
      };
    
      const sortedData = () => {
        if (sorting.key === null || sorting.direction === "default") {
          return data;
        }
    
        return [...data].sort((a, b) => {
          let aValue = a[sorting.key];
          let bValue = b[sorting.key];
    
          if (sorting.key === "personal_code") {
            aValue = parseBirthDate(aValue);
            bValue = parseBirthDate(bValue);
          }
    
          if (aValue < bValue) {
            return sorting.direction === "asc" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sorting.direction === "asc" ? 1 : -1;
          }
          return 0;
        });
      };

      function handleRowClick(itemId) {
        setExpandedRow(expandedRow === itemId ? null : itemId);
      }
    
      const handleSelectPage = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= pageNumbers[pageNumbers.length - 1]) {
          setCurrentPage(Number(selectedPage));
          calculatePageNumbers(data);
        }
      };
    
      const paginatedData = sortedData().slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      

  return (
    <div className={styles.table}>
      <div className={styles.tableWrapper}>
        <h1>Nimekiri</h1>
        <table>
          <thead>
            <tr>
              <th >
                <button onClick={() => sort("firstname")} aria-label="Sorteeri eesnime järgi">
                  Eesnimi
                </button>
              </th>
              <th>
                <button onClick={() => sort("surname")} aria-label="Sorteeri perekonnanime järgi">
                  Perekonnanimi
                </button>
              </th>
              <th>
                <button onClick={() => sort("sex")} aria-label="Sorteeri soo järgi">
                  Sugu
                </button>
              </th>
              <th>
                <button onClick={() => sort("personal_code")} aria-label="Sorteeri sünnikuupäeva järgi">
                  Sünnikuupäev
                </button>
              </th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  role="button"
                  onClick={() => handleRowClick(item.id)}
                  key={item.id}
                >
                  <td>{item.firstname}</td>
                  <td>{item.surname}</td>
                  <td>
                    {item.sex === "m"
                      ? "Mees"
                      : item.sex === "f"
                      ? "Naine"
                      : ""}
                  </td>
                  <td>
                    {Intl.DateTimeFormat(navigator.language).format(
                      parseBirthDate(item.personal_code)
                    )}
                  </td>
                  <td>{item.phone}</td>
                </tr>
                {expandedRow === item.id && (
                  <tr className={styles.expandedRow}>
                    <td colSpan="5">
                      <div className={styles.expandedRowContent}>
                        <img
                          src={item.image.large}
                          alt={item.image.alt}
                          title={item.image.title}
                        />
                        <div className={styles.expandedRowText}>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.intro }}
                          />

                          <Link to={`/article/${item.id}`}>
                            <button className={styles.linkButton} aria-label="Read more">Loe rohkem</button>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => handleSelectPage(currentPage - 1)}
          className={currentPage === 1 ? styles.disabled : ""}
          aria-label="Navigate to previous page"
        >
          &lt;
        </button>
        <ul>
          {pageNumbers.map((pn) => (
            <li key={pn}>
              <button
                onClick={() => {
                  handleSelectPage(pn);
                }}
                className={currentPage === pn ? styles.active : ""}
                aria-label={`Navigate to page ${pn}`}
              >
                {pn}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => handleSelectPage(currentPage + 1)}
          className={currentPage === pageNumbers[pageNumbers.length - 1] ? styles.disabled : styles.next}
          aria-label="Navigate to next page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Tabel;
