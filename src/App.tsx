import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import MainLayout from "./layouts/MainLayout";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";
import BookDetails from "./pages/BookDetails";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/create-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowBook />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;