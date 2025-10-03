'use client';

import Link from 'next/link';
import { Briefcase, Sparkles, Mail, Target, TrendingUp, Shield, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-day-picker';

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
              <span className="text-2xl font-bold text-gray-900">JobAI</span>
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
                Committed to People <br />Committed <span className="text-blue-500">to the Future</span>
              </h2>
              <div className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn d-inline">
                We are <strong className="text-blue-500">Monst</strong>, a Creative Design
                <div className="typewrite d-inline text-brand">
                  <span style={{ display: "inline-block" }} className="index-module_type__E-SaG"></span>
                </div>
              </div>
            </div>
            <div>
              <a className="btn-primary py-4 px-8 mr-2 wow animate__animated animate__fadeIn hover-up-2" href="#key-features">
                Key Features
              </a>
              <a
                className="btn-white wow animate__animated animate__fadeIn hover-up-2"
                data-wow-delay=".3s"
                href="#how-we-work"
              >
                How We Work?
              </a>
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
              src="https://monst-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimgs%2Fplaceholders%2Fdashboard.png&w=3840&q=75"
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
                <p className="text-xs sm:text-base text-blueGray-400">Annual Partner</p>
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
                <p className="text-xs sm:text-base text-blueGray-400">Completed Projects</p>
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
                <p className="text-xs sm:text-base text-blueGray-400">Happy Customers</p>
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
                <p className="text-xs sm:text-base text-blueGray-400">Research Work</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose JobAI?</h2>
            <p className="text-xl text-gray-600">Intelligent features designed to accelerate your job search</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
              <p className="text-gray-700">
                Our advanced AI analyzes your skills, experience, and preferences to recommend jobs that perfectly match your profile.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Email Alerts</h3>
              <p className="text-gray-700">
                Get notified immediately when new jobs matching your criteria are posted. Never miss an opportunity again.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Skill-Based Filtering</h3>
              <p className="text-gray-700">
                Filter opportunities based on your unique skill set and career goals for highly relevant recommendations.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Career Insights</h3>
              <p className="text-gray-700">
                Access detailed analytics on application success rates, salary trends, and career progression insights.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Verified Employers</h3>
              <p className="text-gray-700">
                All job postings are from verified companies, ensuring legitimate opportunities and secure applications.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">One-Click Apply</h3>
              <p className="text-gray-700">
                Streamlined application process with saved profiles. Apply to multiple jobs in seconds with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and add your skills, experience, preferences, and career goals. The more details, the better the matches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get AI Recommendations</h3>
              <p className="text-gray-600">
                Our AI analyzes thousands of jobs and matches you with opportunities that fit your profile perfectly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apply & Get Hired</h3>
              <p className="text-gray-600">
                Apply with one click and track your applications. Receive email alerts when new matching jobs are posted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Developed with ❤️ by</h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl">
                  SG
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2">Shaurya Gupta</h3>
                <p className="text-blue-200 text-lg mb-4">AI Engineer & Full-Stack Developer</p>
                <p className="text-gray-300 mb-6">
                  Passionate about building intelligent systems that solve real-world problems. 
                  JobAI leverages cutting-edge machine learning algorithms to match candidates with their ideal jobs.
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who found their perfect match with JobAI
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition text-lg font-semibold"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">JobAI</span>
          </div>
          <p className="mb-4">AI-Powered Job Matching Platform</p>
          <p className="text-sm">© 2025 JobAI. Developed by Shaurya Gupta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}