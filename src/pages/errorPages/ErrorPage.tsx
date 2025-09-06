import React from 'react';
import { useLocation } from 'react-router-dom';

interface ErrorPageProps {
    errorCode?: number;
    errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, errorMessage }) => {
    const location = useLocation();

    const defaultErrorMessage = "Sorry, something went wrong.";
    const errors: { [key: number]: string } = {
        404: "Page not found.",
        500: "Internal server error.",
        403: "Forbidden.",
        401: "Unauthorized access.",
    };

    const message = errorMessage || errors[errorCode || 0] || defaultErrorMessage;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
            <div className="bg-white p-8 rounded shadow-md w-full lg:w-[400px] ">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                    {errorCode ? `Error ${errorCode}` : "Error"}
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                    {message}
                </p>
                <a
                    href="/"
                    className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-600 transition"
                >
                    Go to Homepage
                </a>
            </div>
            {location.state && location.state.errorDetails && (
                <div className="mt-8 p-4 bg-gray-200 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-2">Error Details:</h2>
                    <pre className="text-left whitespace-pre-wrap text-gray-700">
                        {location.state.errorDetails}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ErrorPage;
