import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useParentsSetup } from "../../hooks/useParentsSetup";
import { useParentsSetupStore } from "../../store/useParentsSetupStore";
import ClassScheduleTable from "./ClassScheduleTable";
import AssistantCallout from "./common/AssistantCallout";
import FooterParents from "./common/FooterParents";
import ILMIAssistant from "./common/ILMIAssistant";

interface ClassScheduleSectionProps {
  onNext: () => void;
  onBack: () => void;
}

const ClassScheduleSection = ({
  onNext,
  onBack,
}: ClassScheduleSectionProps) => {
  const router = useRouter();
  const { mutate: completeSetup, isPending } = useParentsSetup();
  const { childDetails, subjects, reset } = useParentsSetupStore();

  const handleRegisterChild = () => {
    completeSetup(
      { childDetails, subjects, country: null, board: null },
      {
        onSuccess: (res) => {
          let childId = res.data.child._id;
          toast.success("Your child has been successfully registered.");
          router.push("/parents/setup/successful?childId=" + childId);
          reset();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  return (
    <div className="h-full max-w-[1770px] w-full flex flex-col py-3">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="inline-flex  items-center">
          <ILMIAssistant
            height={180}
            width={140}
            className="h-[180px] w-[140px]"
          />

          <div className="mb-20">
            <AssistantCallout
              message="Let’s enroll your child in subjects and set a weekly schedule."
              orientation="left"
            />
          </div>
        </div>

        <div className="w-full inline-flex justify-center mb-4">
          <ClassScheduleTable />
        </div>
      </div>

      <FooterParents
        leftButton={{ label: "Back", onClick: onBack }}
        rightButton={{
          label: "Finish Setup",
          onClick: handleRegisterChild,
          disabled: isPending,
          isPending: isPending,
        }}
      />
    </div>
  );
};

export default ClassScheduleSection;
