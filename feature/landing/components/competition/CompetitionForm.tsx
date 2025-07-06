"use client";
import CustomButton from "@/components/global/CustomButton";
import InputField from "@/components/global/CustomInput";

const CompetitionForm = () => {
  return (
    // <form className='w-full px-8 py-10 flex flex-col gap-6 border-1 border-border-color rounded-2xl  bg-background'>
    <form className="w-full px-8 py-10 flex flex-col gap-6 bg-gradient-to-b from-[#0F172A] border-1 border-[#1B2130] rounded-2xl  bg-background">
      <div className="flex flex-col sm:flex-row gap-4">
        <InputField
          labelText="First Name"
          placeholder="Enter your first name"
          type="text"
          name="firstName"
          className=" placeholder:text-white placeholder:opacity-50"
        />
        <InputField
          labelText="Last Name"
          placeholder="Enter your last name"
          type="text"
          name="lastName"
          className="placeholder:text-white placeholder:opacity-50"
        />
      </div>

      <InputField
        labelText="Email"
        placeholder="Enter your email address"
        type="text"
        name="email"
        className="placeholder:text-white placeholder:opacity-50"
      />
      <InputField
        labelText="School/University Name"
        placeholder="Enter your school/university name"
        type="text"
        name="institution"
        className="placeholder:text-white placeholder:opacity-50"
      />

      <CustomButton
        label="Join the Competition"
        className="w-full bg-brand-color hover:bg-[#007AAC] hover:border-0 h-14 py-4 px-8 rounded-full text-white"
        disabled
      />
    </form>
  );
};

export default CompetitionForm;
