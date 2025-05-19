'use client';

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParentsService } from "../services/ParentsService";

export function useDownloadTimetable(childId: string) {
    return useMutation<Blob, Error, void, unknown>({ 

        mutationFn: () => ParentsService.downloadSchedule(childId),

        onSuccess: (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Class Schedule.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            toast.success('Your PDF is downloading…');
        },
        onError: (err) => {
            toast.error(`Download failed: ${err.message}`);
        },
    });
}
