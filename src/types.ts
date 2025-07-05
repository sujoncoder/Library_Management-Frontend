type BorrowSummaryItem = {
    bookTitle: string;
    isbn: string;
    totalQuantity: number;
};

export type BorrowSummaryResponse = {
    success: boolean;
    message: string;
    data: BorrowSummaryItem[];
};


export type BookFormData = {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
};


export interface ICustomErrorResponse {
    data?: {
        error?: {
            message?: string;
        };
    };
};

export interface ILoadingProps {
    message?: string;
    fullPage?: boolean;
};
