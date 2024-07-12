import "./App.css";
import BasicTable from "./components/table";

function App() {
  const headers = [
    { id: 1, name: "First Col" },
    { id: 2, name: "Second Col" },
    { id: 3, name: "Third Col" },
    { id: 4, name: "Fourth Col" },
  ];

  const rows = [
    { id: 1, data: <div>Data for Row 1 Col 1</div> },
    { id: 2, data: <div>Data for Row 1 Col 2</div> },
    { id: 3, data: <div>Data for Row 1 Col 3</div> },
    { id: 4, data: <div>Data for Row 1 Col 4</div> },
    { id: 5, data: <div>Data for Row 2 Col 1</div> },
    { id: 6, data: <div>Data for Row 2 Col 2</div> },
    { id: 7, data: <div>Data for Row 2 Col 3</div> },
    { id: 8, data: <div>Data for Row 2 Col 4</div> },
  ];

  return (
    <>
      <BasicTable headers={headers} rows={rows} paginated={true} />
    </>
  );
}

export default App;
