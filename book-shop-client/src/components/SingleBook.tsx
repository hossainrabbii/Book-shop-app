import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../redux/features/book/bookApi";

const SingleBook = () => {
    const { bookId } = useParams<{ bookId: string }>();
  const { data: book, isLoading, error } = useGetBookByIdQuery(bookId);
    return (
        <div>
            {book?.name}
        </div>
    );
};

export default SingleBook;