"use client";
import CustomButton from "@/components/global/CustomButton";
import InputField from "@/components/global/CustomInput";

const CompetitionForm = () => {
  return (
    // <form className='w-full px-8 py-10 flex flex-col gap-6 border-1 border-border-color rounded-2xl  bg-background'>
    <form className="w-full px-8 py-10 flex flex-col gap-6 bg-gradient-to-b from-[#ffffff] dark:from-[#0F172A] border-3 border-bg-border rounded-2xl  shadw-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <InputField
          labelText="First Name"
          placeholder="Enter your first name"
          type="text"
          name="firstName"
          className=" placeholder:text-foreground placeholder:opacity-50"
        />
        <InputField
          labelText="Last Name"
          placeholder="Enter your last name"
          type="text"
          name="lastName"
          className="placeholder:text-foreground placeholder:opacity-50"
        />
      </div>

      <InputField
        labelText="Email"
        placeholder="Enter your email address"
        type="text"
        name="email"
        className="placeholder:text-foreground placeholder:opacity-50"
      />
      <InputField
        labelText="School/University Name"
        placeholder="Enter your school/university name"
        type="text"
        name="institution"
        className="placeholder:text-foreground placeholder:opacity-50"
      />

      {/* <CustomButton
        label="Join the Competition"
        className="w-full bg-gradient-to-b from-[#E8E8E8] dark:from-[#1D2840] dark:to-[#000000] dark:shadow-[0px_6px_0px_0px_#373C4E] hover:bg-[#007AAC] hover:border-0 h-14 py-4 px-8 rounded-full text-foreground"
        disabled
      /> */}
      <CustomButton
        label="Join the Competition"
        className="w-full h-14 py-4 px-8 rounded-full"
        disabled
        active={false}
      />
    </form>
  );
};

export default CompetitionForm;
