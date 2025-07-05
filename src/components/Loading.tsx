import { LoaderCircle } from "lucide-react";
import type { ILoadingProps } from "../types";

const Loading = ({ message = "Loading...", fullPage = true }: ILoadingProps) => {
    return (
        <div className={`${fullPage ? "flex items-center justify-center" : "pt-60 text-center"} text-slate-600`}>
            <div className="flex flex-col items-center gap-3">
                <LoaderCircle className="w-10 h-10 animate-spin text-slate-500" />
                <p className="text-xl text-slate-500 font-mono font-medium">{message}</p>
            </div>
        </div>
    )
};
export default Loading;