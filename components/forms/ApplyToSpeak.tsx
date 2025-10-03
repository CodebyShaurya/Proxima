"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type FormData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    title: string;
    telegram: string;
};

async function addData(data: FormData): Promise<boolean> {
    try {
        const docRef = await addDoc(collection(db, "applyToSpeakData"), {
            ...data,
            createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}

const ApplyToSpeak: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const [modalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (submitting) return; // guard against double click
        setSubmitting(true);
        try {
            const isAdded = await addData(data);
            if (isAdded) {
                setModalOpen(true);
                reset();
            } else {
                alert("Error submitting form");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative bg-bg-gradient z-10">
            <div className="absolute w-full -z-10 top-0">
                <Image
                    src={'/assets/speakerbg.svg'}
                    width={1000}
                    height={1000}
                    alt="img"
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="z-30 w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto pt-20 sm:pt-28 py-10 font-custom2">
                {/* Heading Section - Outside the form */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryColor mb-4">
                        Apply to Speak
                    </h1>
                    <div className="w-20 h-1 bg-primaryColor mx-auto mb-6"></div>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed">
                        CoinFerenceX is a 2-day conference dedicated to the Web3 community.
                        The summit is a thought leadership-driven, business-focused event that
                        promises impactful discussions.
                    </p>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 border-b-4 border-b-primaryColor">
                    
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 lg:space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm md:text-base lg:text-lg font-medium text-white"
                                >
                                    Name <sup className="text-red-500">*</sup>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        className="bg-transparent text-sm md:text-base w-full border-b-2 border-white/30 focus:border-primaryColor transition-colors duration-300 placeholder-white/40 focus:outline-none py-2"
                                        placeholder="Enter your name"
                                        {...register("name", {
                                            required: "Name is required",
                                        })}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm md:text-base lg:text-lg font-medium text-white"
                                >
                                    Email <sup className="text-red-500">*</sup>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-transparent text-sm md:text-base w-full border-b-2 border-white/30 focus:border-primaryColor transition-colors duration-300 placeholder-white/40 focus:outline-none py-2"
                                        placeholder="Enter your email"
                                        {...register("email", {
                                            required: "Email is required",
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="company"
                                    className="block text-sm md:text-base lg:text-lg font-medium text-white"
                                >
                                    Company Name <sup className="text-red-500">*</sup>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="company"
                                        className="bg-transparent text-sm md:text-base w-full border-b-2 border-white/30 focus:border-primaryColor transition-colors duration-300 placeholder-white/40 focus:outline-none py-2"
                                        placeholder="Enter your company name"
                                        {...register("company", {
                                            required: "Company is required",
                                        })}
                                    />
                                </div>
                                {errors.company && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.company.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="title"
                                    className="block text-sm md:text-base lg:text-lg font-medium text-white"
                                >
                                    Title <sup className="text-red-500">*</sup>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="title"
                                        className="bg-transparent text-sm md:text-base w-full border-b-2 border-white/30 focus:border-primaryColor transition-colors duration-300 placeholder-white/40 focus:outline-none py-2"
                                        placeholder="Founder/Co-Founder/CEO"
                                        {...register("title", { required: "Title is required" })}
                                    />
                                </div>
                                {errors.title && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm md:text-base lg:text-lg font-medium text-white"
                                >
                                    Phone
                                </label>
                                <div className="relative">
                                    <input
                                        id="phone"
                                        placeholder="+971 58 846 7267"
                                        className="bg-transparent text-sm md:text-base w-full border-b-2 border-white/30 focus:border-primaryColor transition-colors duration-300 placeholder-white/40 focus:outline-none py-2"
                                        type="tel"
                                        {...register("phone")}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="telegram"
                                    className="block text-sm md:text-base lg:text-lg font-medium text-white"
                                >
                                    Telegram
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="telegram"
                                        className="bg-transparent text-sm md:text-base w-full border-b-2 border-white/30 focus:border-primaryColor transition-colors duration-300 placeholder-white/40 focus:outline-none py-2"
                                        placeholder="Enter your Telegram ID"
                                        {...register("telegram")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="block text-sm md:text-base lg:text-lg font-medium text-white"
                            >
                                Previous Experience/Blurb <sup className="text-red-500">*</sup>
                            </label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    className="bg-transparent text-sm md:text-base w-full min-h-[120px] border-b-2 border-white/30 focus:border-primaryColor transition-colors duration-300 placeholder-white/40 focus:outline-none py-2 resize-vertical"
                                    placeholder="Tell us about your previous speaking experience, achievements, and what you'd like to speak about at CoinFerenceX..."
                                    rows={5}
                                    {...register("message", { required: "Message is required" })}
                                />
                            </div>
                            {errors.message && (
                                <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button
                                type="submit"
                                disabled={submitting}
                                className={`px-8 py-3 text-base lg:text-lg font-semibold bg-primaryColor transition-all duration-300 shadow-lg ${submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primaryColor/90 transform hover:scale-105 hover:shadow-primaryColor/30'}`}
                            >
                                {submitting ? 'Applying…' : 'Submit Application'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            
            <Image
                src="/assets/bottomBar.svg"
                layout="fixed"
                height={1000}
                width={1590}
                alt="bottombar"
                className="block mt-12 w-screen"
            />

            {/* Enhanced Modal Overlay for Successful Submission */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] rounded-2xl p-8 max-w-md mx-4 text-center border border-white/10 shadow-2xl">
                        <div className="w-16 h-16 bg-primaryColor/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-primaryColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-primaryColor">Success!</h2>
                        <p className="mb-6 text-white/90 leading-relaxed">
                            Your application has been submitted successfully. We&apos;ll review it and get back to you soon.
                        </p>
                        <Button 
                            onClick={() => setModalOpen(false)}
                            className="px-6 py-2 bg-primaryColor hover:bg-primaryColor/90 transition-all duration-300"
                        >
                            OK
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplyToSpeak;
