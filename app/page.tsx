'use client';

import Link from 'next/link';
import { Briefcase, Sparkles, Mail, Target, TrendingUp, Shield, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    console.log('User email:', userEmail);
    setIsAuthenticated(!!userEmail);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full  z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Proxima</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Sign In
              </Link>
              <button 
              onClick={handleGetStarted}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Job Matching</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Find Your Dream Job with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI Intelligence</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get personalized job recommendations based on your skills, experience, and preferences. 
              Receive instant email notifications when matching opportunities appear.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-lg font-semibold"
              >
                Get Started
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>1000+ Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Email Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className=" bg-no-repeat bg-contain pt-24" style={{ backgroundImage: "url('https://monst-nextjs.vercel.app/assets/imgs/backgrounds/intersect.svg')" }}>
        <div className="container px-4 mx-auto">
          <div className="pt-12 text-center">
            <div className="max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl lg:text-5xl lg:leading-normal mb-4 font-bold font-heading wow animate__animated animate__fadeIn">
                Find Your Dream Job <br />Powered by <span className="text-blue-500">AI Intelligence</span>
              </h2>
              <div className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn d-inline">
                We are <strong className="text-blue-500">Proxima</strong>, an AI-Powered Job Matching Platform
                
              </div>
            </div>
            <div>
              <a className="bg-blue-600 text-white rounded-xl  py-4 px-8 mr-2 wow  animate__animated animate__fadeIn hover-up-2" href="/signup">
                Get Started
              </a>
              {/* <a
                className="text-blue-600 bg-gray-400 rounded-xl  py-4 px-4 wow animate__animated animate__fadeIn hover-up-2"
                data-wow-delay=".3s"
                href="#how-we-work"
              >
                How We Work?
              </a> */}
            </div>
          </div>
        </div>
        <div className="relative max-w-6xl mt-16 md:mt-8 mb-8 mx-auto">
          <img
            alt="Monst"
            loading="lazy"
            width="0"
            height="0"
            decoding="async"
            data-nimg="1"
            style={{ color: "transparent", width: "auto", height: "auto" }}
            sizes="100vw"
            // srcSet="/_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&amp;w=3840&amp;q=75 3840w"
            src="https://monst-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimgs%2Felements%2Fpattern.png&w=3840&q=75"
          />
          <div
            className="absolute"
            style={{ top: "9%", left: "14%", width: "72%", height: "66%" }}
          >
            <img
              alt="Monst"
              loading="lazy"
              width="0"
              height="0"
              decoding="async"
              data-nimg="1"
              className="jump rounded wow animate__animated animate__fadeIn"
              style={{ color: "transparent", width: "auto", height: "auto", animation: "jump 2s infinite" }}
              sizes="100vw"
              // srcSet="/_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&amp;w=3840&amp;q=75 3840w"
              src="/assets/home.png"
            />
          </div>
        </div>
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-between pt-8 pb-16">
            <div
              className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
              data-wow-delay=".2s"
            >
              <div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div className="sm:py-2 ml-2 sm:ml-6">
                <span className="sm:text-2xl font-bold font-heading">+ </span>
                <span className="sm:text-2xl font-bold font-heading count counterUp">
                  <span>
                    <span>950</span>
                  </span>
                </span>
                <p className="text-xs sm:text-base text-blueGray-400">Active Job Seekers</p>
              </div>
            </div>
            <div
              className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
              data-wow-delay=".4s"
            >
              <div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  ></path>
                </svg>
              </div>
              <div className="sm:py-2 ml-2 sm:ml-6">
                <span className="sm:text-2xl font-bold font-heading">+ </span>
                <span className="sm:text-2xl font-bold font-heading count counterUp">
                  <span>
                    <span>58</span>
                  </span>
                </span>
                <span className="sm:text-2xl font-bold font-heading"> k </span>
                <p className="text-xs sm:text-base text-blueGray-400">Job Listings</p>
              </div>
            </div>
            <div
              className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
              data-wow-delay=".6s"
            >
              <div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
              </div>
              <div className="sm:py-2 ml-2 sm:ml-6">
                <span className="sm:text-2xl font-bold font-heading">+ </span>
                <span className="sm:text-2xl font-bold font-heading count counterUp">
                  <span>
                    <span>500</span>
                  </span>
                </span>
                <p className="text-xs sm:text-base text-blueGray-400">Successful Placements</p>
              </div>
            </div>
            <div
              className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
              data-wow-delay=".8s"
            >
              <div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <div className="sm:py-2 ml-2 sm:ml-6">
                <span className="sm:text-2xl font-bold font-heading">+ </span>
                <span className="sm:text-2xl font-bold font-heading count counterUp">
                  <span>
                    <span>300</span>
                  </span>
                </span>
                <p className="text-xs sm:text-base text-blueGray-400">Partner Companies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="pt-8 pb-12 md:py-16 lg:py-16 overflow-x-hidden" id="key-features">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-1/2">
              <div className="lg:py-6 lg:pr-77 wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                <div className="mb-4">
                  <span className="text-xs py-1 px-3 text-blue-500 font-semibold bg-blue-50 rounded-xl wow animate__animated animate__fadeInDown" data-wow-delay=".9s">Why choose us</span>
                  <h2 className="text-4xl mt-5 font-bold font-heading wow animate__animated animate__fadeIn" data-wow-delay=".3s">Key Features</h2>
                </div>
                <div className="flex items-start py-4 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                  <div className="w-8 mr-5 text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold font-heading">AI-Powered Matching</h3>
                    <p className="text-blueGray-400 leading-loose">Our advanced AI algorithms analyze your skills and preferences to match you with the perfect job opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start py-4 wow animate__animated animate__fadeIn" data-wow-delay=".7s">
                  <div className="w-8 mr-5 text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold font-heading">Instant Email Alerts</h3>
                    <p className="text-blueGray-400 leading-loose">Get notified immediately when new jobs matching your profile are posted. Never miss an opportunity again.</p>
                  </div>
                </div>
                <div className="flex items-start py-4 wow animate__animated animate__fadeIn" data-wow-delay=".9s">
                  <div className="w-8 mr-5 text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold font-heading">Personalized Dashboard</h3>
                    <p className="text-blueGray-400 leading-loose">Track your applications, save favorite jobs, and manage your job search all in one convenient place.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-1/2 my-12 lg:my-0">
              <div className="wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                <img alt="Monst" loading="lazy"  decoding="async" data-nimg="1" className="jump relative mx-auto rounded-xl w-full z-10 w-[500px]" style={{ color: "transparent"}} sizes="100vw" src="https://monst-nextjs.vercel.app/assets/imgs/placeholders/img-1.png" />
                <img alt="Monst" loading="lazy"  decoding="async" data-nimg="1" className="absolute top-0 left-0 -ml-12 -mt-12 w-56 h-56" style={{ color: "transparent" }} src="https://monst-nextjs.vercel.app/assets/imgs/elements/blob-tear.svg" />
                <img alt="Monst" loading="lazy"  decoding="async" data-nimg="1" className="absolute bottom-0 right-0  -mr-12 -mb-12 w-56 h-56" style={{ color: "transparent" }} src="https://monst-nextjs.vercel.app/assets/imgs/elements/blob-tear.svg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-blueGray-50" id="how-we-work">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between max-w-2xl lg:max-w-full mb-12">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold font-heading wow animate__animated animate__fadeInDown">
                <span>How Our</span>
                <span className="text-blue-500"> AI Job Finder</span>
                <br />
                <span>Works for You</span>
              </h2>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-blueGray-400 leading-loose wow animate__animated animate__fadeIn">
                Our intelligent platform streamlines your job search by matching your unique skills and preferences with the best opportunities. Get started in three simple steps and let AI do the heavy lifting.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 -mb-6 text-center">
            <div className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn" data-wow-delay=".3s">
              <div className="p-12 bg-white shadow rounded">
                <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">1</div>
                <img alt="Monst" loading="lazy" width="0" height="0" decoding="async" data-nimg="1" className="h-36 w-56 mx-auto my-4" style={{ color: "transparent" }} src="https://monst-nextjs.vercel.app/assets/imgs/illustrations/eating.svg" />
                <h3 className="mb-2 font-bold font-heading text-xl">Create Your Profile</h3>
                <p className="text-sm text-blueGray-400 leading-relaxed">Sign up and build your profile with your skills, experience, and job preferences. Our AI will use this to find your perfect match.</p>
              </div>
            </div>
            <div className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
              <div className="p-12 bg-white shadow rounded">
                <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">2</div>
                <img alt="Monst" loading="lazy" width="0" height="0" decoding="async" data-nimg="1" className="h-36 w-56 mx-auto my-4" style={{ color: "transparent" }} src="https://monst-nextjs.vercel.app/assets/imgs/illustrations/space.svg" />
                <h3 className="mb-2 font-bold font-heading text-xl">AI Matches Jobs</h3>
                <p className="text-sm text-blueGray-400 leading-relaxed">Our intelligent algorithm analyzes thousands of job listings and matches you with opportunities that align with your profile.</p>
              </div>
            </div>
            <div className="hover-up-5 w-full lg:w-1/3 px-3 mb-6">
              <div className="p-12 bg-white shadow rounded wow animate__animated animate__fadeIn" data-wow-delay=".7s">
                <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">3</div>
                <img alt="Monst" loading="lazy" width="0" height="0" decoding="async" data-nimg="1" className="h-36 w-56 mx-auto my-4" style={{ color: "transparent" }} src="https://monst-nextjs.vercel.app/assets/imgs/illustrations/tasks.svg" />
                <h3 className="mb-2 font-bold font-heading text-xl">Get Email Alerts</h3>
                <p className="text-sm text-blueGray-400 leading-relaxed">Receive instant email notifications when new jobs matching your criteria are posted. Stay ahead of the competition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-blue-600 text-white ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Developed by</h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 ">
            <div className="flex flex-col md:flex-row items-center gap-8">
               
                   <img
                  alt="Developer Avatar"
                  src="https://avatars.githubusercontent.com/u/123228383?v=4"
                  className="  w-56 h-56 rounded-full "
                  // style={{ animation: "jump 2s infinite" }}
                />

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2">Shaurya Gupta</h3>
                <p className="text-blue-200 text-lg mb-4">AI Engineer & Full-Stack Developer</p>
                <p className="text-gray-300 mb-6">
                  Passionate about building intelligent systems that solve real-world problems. 
                  Proxima uses advanced AI to connect job seekers with their dream careers through smart matching and instant email alerts.
                </p>

                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a 
                    href="https://github.com/CodeByShaurya" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/shaurya--gupta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://twitter.com/shauryagupta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  >
                    <Twitter className="h-5 w-5" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Update Website Name and Top Sections */}
      {/* Hero Section */}
     

      {/* Footer */}
      <footer className="py-12 px-4 bg- text-gray-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-black">Proxima</span>
          </div>
          <p className="mb-4">AI-Powered Job Matching Platform</p>
          <p className="text-sm">© 2025 Proxima. Developed by Shaurya Gupta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}