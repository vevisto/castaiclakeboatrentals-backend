'use client'
import { ContractFormPage } from "@/components/DownloadContract/ContractPage/ContractFormPage";
import { useParams } from "next/navigation";

export default function page() {
    const { id } = useParams();
    return (
        <>
            <ContractFormPage contractId={id} />
        </>
    )
}