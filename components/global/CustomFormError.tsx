import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type FormErrorProps = {
    error: Error | null,
}

export default function FormError({ error }: FormErrorProps) {

    return (
        <>
            {error && (
                <div>
                    <Alert variant="destructive" >
                        <div className="flex gap-2">
                            <CircleAlert className="h-4 w-4"/>
                            <AlertTitle className="">Error</AlertTitle>
                        </div>
                        <AlertDescription className="ml-6">
                            {error.message}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </>
    )
}
