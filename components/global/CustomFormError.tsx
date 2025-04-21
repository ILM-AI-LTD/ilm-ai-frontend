import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type FormErrorProps = {
    error: Error | null,
}

export default function FormError({ error }: FormErrorProps) {

    return (
        <>
            {error && (
                <Alert variant="destructive" >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error.message}
                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}
