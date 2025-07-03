import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/create-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowBook />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Route>
      </Routes>
    </>
  )
}

export default App