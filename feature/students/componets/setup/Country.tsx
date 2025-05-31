// import AssistantCallout from './common/AssistantCallout'
// import FooterParents from './common/FooterParents'
// import ILMIAssistant from './common/ILMIAssistant'

// import AssistantCallout from "@/feature/students/components/setup/common/AssistantCallout"
// import FooterParents from "@/feature/parents/components/setup/common/FooterParents"
// import ILMIAssistant from "@/feature/parents/components/setup/common/ILMIAssistant"
import React, { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CircleCheck, CpuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ILMIAssistantv2 from "@/feature/parents/components/setup/common/ILMIAssistantv2";
import FooterStudents from "./common/FooterStudents";
import AssistantCallout from "./common/AssistantCallout";
import { CountryResponse } from "@/types/student";

interface CountryProps {
    onNext: () => void
}


const options = [
    {
        id: '1',
        image: "/country/uk.svg",
        label: "United Kingdom",
    },
    {
        id: '2',
        image: "/country/bangladesh.png",
        label: "Bangladesh",
    },
    {
        id: '3',
        image: "/country/uk.svg",
        label: "United Kingdom",
    },
];

const Country = ({ onNext }: CountryProps) => {


    const [selectedOption, setSelectedOption] = useState<CountryResponse | null>(null);

    // Load from localStorage on component mount
    useEffect(() => {
        const savedSelection = localStorage.getItem('selectedCountry');
        if (savedSelection) {
            try {
                setSelectedOption(JSON.parse(savedSelection));
            } catch (e) {
                console.error('Failed to parse saved selection', e);
            }
        }
    }, []);

    // Save to localStorage when selection changes
    useEffect(() => {
        if (selectedOption) {
            localStorage.setItem('selectedCountry', JSON.stringify(selectedOption));
        } else {
            localStorage.removeItem('selectedCountry');
        }
    }, [selectedOption]);

    const handleSelect = (option: CountryResponse) => {
        setSelectedOption(prev =>
            prev?.id === option.id ? null : option
        );
    };


    return (
        <div className='h-full max-w-[1770px] w-full flex flex-col py-3'>
            <div className='flex-1 flex flex-col overflow-auto'>
                <div className='inline-flex  items-center'>
                    <ILMIAssistantv2
                        height={180}
                        width={140}
                        className='h-[180px] w-[140px]'
                    />

                    <div className='mb-20'>
                        <AssistantCallout
                            message="Let's Start By Selecting the Country"
                            orientation="left"
                        />
                    </div>
                </div>

                {/* <form action="" className='w-full max-w-[800px] mx-auto flex flex-col gap-4 mb-4' onSubmit={handleSubmit}>
                    <InputField
                        placeholder="Enter your child's full name"
                        labelText="Full Name"
                        name='fullName'
                        type='text'
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.fullName as any}
                        touched={!!touched.fullName}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder="Enter your child's username"
                        labelText="Username"
                        name='username'
                        type='text'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.username as any}
                        touched={!!touched.username}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <CustomSelect
                        label="Age Group"
                        placeholder="Select Age Group"
                        options={[
                            { value: "Year 1–2", label: "Year 1–2 (Key Stage 1)" },
                            { value: "Year 3–6", label: "Year 3–6 (Key Stage 2)" },
                            { value: "Year 7–8", label: "Year 7-8 (Key Stage 3)" },
                            { value: "Year 9–11", label: "Year 9–11 (GCSE Level)" },
                            { value: "Year 12-13", label: "Year 12-13 (A-Level)" },
                        ]}
                        value={values.ageGroup}                         // Formik’s current value
                        onValueChange={(val) => {
                            // Tell Formik about the new field value
                            handleChange({ target: { name: "ageGroup", value: val } })
                        }}

                    />

                    <InputField
                        placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                        labelText="Password"
                        name='password'
                        type='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.password as any}
                        touched={!!touched.password}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                    <InputField
                        placeholder={"\u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022  \u2022"}
                        labelText="Confirm Password"
                        name='confirmPassword'
                        type='password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.confirmPassword && errors.confirmPassword.length > 0 ? errors.confirmPassword[0] : undefined}
                        touched={touched.confirmPassword}
                        className='h-12 bg-parent-inputField-color border-0 placeholder:text-white/60'
                    />
                </form> */}

                {/* <RadioGroup.Root
                    defaultValue={options[0].label}
                    // className="max-w-md w-full grid grid-cols-3 gap-4 "
                    className="w-full max-w-[800px] mx-auto  grid grid-cols-3 gap-4 "
                >
                    {options.map((option) => (
                        <RadioGroup.Item
                            key={option.label}
                            value={option.label}
                            className={cn(
                                "relative group ring-[1px] ring-border rounded py-2 px-3 text-start",
                                "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                            )}
                        >
                            <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white group-data-[state=unchecked]:hidden" />
                            
                            <Image
                                src={option.image}
                                alt={option.label}
                                height={80}
                                width={100}
                                className="w-full h-[80px] 2xl:w-full 2xl:h-[100px]"
                            />
                            <span className="font-semibold tracking-tight">{option.label}</span>
                        </RadioGroup.Item>
                    ))}
                </RadioGroup.Root> */}

                <div
                    className={`mx-auto max-w-[800px] grid bg-primary-bg-color rounded-4xl gap-4 order-2 md:order-1 
                    ${options.length === 1 ? 'grid-cols-1' : ''}
                    ${options.length === 2 ? 'sm:grid-cols-2' : ''}
                    ${options.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}
                // style={{
                //     gridTemplateColumns: `repeat(${Math.min(options.length, 3)}, 1fr)`
                // }}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option)}
                            className="relative p-4 rounded-lg cursor-pointer transition-all group"
                        >
                            {selectedOption?.id === option.id && (
                                <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white z-10" />
                            )}

                            {/* Image container with hover scale */}
                            <div className=" rounded-md">
                                <Image
                                    src={option.image}
                                    alt={option.label}
                                    height={80}
                                    width={100}
                                    className="w-full h-[80px] 2xl:h-[100px] object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Label with hover scale */}
                            <p className="flex justify-center mt-2 font-medium transition-transform duration-300 group-hover:scale-105">
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>


            </div>


            <FooterStudents
                // leftButton={{ label: "Back", onClick: onBack }}
                // rightButton={{ label: "Next", onClick: handleSubmit, disabled: Object.keys(errors).length > 0 || Object.keys(touched).length === 0 }}
                rightButton={{ label: "Next", onClick: onNext }}
            />
        </div>
    )
}

export default Country