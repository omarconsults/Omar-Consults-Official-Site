"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  ArrowUpRight,
  Brain,
  Code,
  Cloud,
  TrendingUp,
  Building2,
  ShoppingCart,
  Heart,
  Briefcase,
  GraduationCap,
  Car,
  Gamepad2,
  Utensils,
  Linkedin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import "./styles/animations.css"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div ref={containerRef}>
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/omar-logo.png"
                alt="Omar Consults"
                width={200}
                height={70}
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 transition-all duration-300 filter brightness-110 contrast-125"
                priority
              />
            </Link>
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                        <div className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/services"
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">AI Strategy & Consulting</div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Transform your business with cutting-edge AI solutions tailored to your needs
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Custom Software Development</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Build scalable and efficient software solutions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Cloud Solutions</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Scalable and secure cloud infrastructure
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Digital Marketing</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Data-driven marketing strategies for growth
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <a
                      href="https://bizcore.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      BizCore
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/booking" className="hidden sm:block">
                <Button size="sm" className="text-xs md:text-sm">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/booking" className="sm:hidden">
                <Button size="sm" className="text-xs px-2">
                  Book
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <motion.div style={{ opacity, scale }} className="container mx-auto px-4 pt-24 md:pt-32 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6"
            >
              We work for your profit
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 px-4"
            >
              We specialize in AI solutions, custom software development, and comprehensive technology solutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
            >
              <Link href="/services">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 w-full sm:w-auto">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Book Consultation
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-5xl mx-auto"
          >
            <Image
              src="https://i.ibb.co/5gc10p3f/undraw-online-resume-qyys-2.png"
              alt="Technology Team Collaboration"
              width={1200}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
          <ChevronDown className="w-6 h-6 text-white animate-bounce mx-auto" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-base md:text-lg text-muted-foreground"></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-lg bg-card hover:bg-card/80 transition-all border"
              >
                <div className="mb-6">
                  <service.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/services">
                  <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                    Learn More
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-br from-[#020817] via-[#1a1f2e] to-[#020817] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float-medium"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-float-fast"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-float-slow"></div>

          {/* Animated Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse-slow"></div>
            <div className="grid grid-cols-12 h-full">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="border-r border-primary/10 animate-fade-in-out"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Moving Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 animate-gradient-x"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white bg-clip-text">Industries We Serve</h2>
            <p className="text-lg text-gray-400">Delivering innovative solutions across various sectors</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-[#0a101f]/40 border border-gray-800/50 backdrop-blur-sm hover:bg-[#0a101f]/60 transition-all duration-300">
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 rounded-full bg-[#1a1f2e] flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-300" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <industry.icon className="w-8 h-8 text-primary relative z-10" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                    {industry.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">About Omar Consults</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We are a forward-thinking technology consulting firm specialized in Software Development, Digital
                  Marketing, Artificial Intelligence (AI) Solutions, and Digital Transformation.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  We believe that every business, regardless of size, deserves access to world-class technology
                  solutions that drive growth, efficiency, and innovation. Our team of experts combines deep technical
                  knowledge with strategic business insight to deliver results that matter.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our mission is to empower businesses by delivering cutting-edge solutions that address unique
                  challenges, enhance operational efficiency, and foster innovation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button size="lg" variant="outline">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://i.ibb.co/G399Vvj7/software-engineer-roadmap-e1736084062499.jpg"
                  alt="Omar Consults Team"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -top-8 -right-8 bg-white dark:bg-card p-6 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Innovation First</div>
                    <div className="text-sm text-muted-foreground">Cutting-edge solutions</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-card p-6 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Quality Assured</div>
                    <div className="text-sm text-muted-foreground">Proven results</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Trusted Clients Around The World</h2>
            <p className="text-lg text-gray-600">
              We're proud to work with innovative companies across various industries
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* First Row */}
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 lg:gap-32 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-40 h-24 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/images/clients/jaan-logo.png" alt="JAAN" className="max-w-full max-h-full object-contain" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-40 h-24 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/images/clients/city-center-blog.png"
                  alt="City Center Blog"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-40 h-24 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/images/clients/apollo-models-new.png"
                  alt="Apollo Models"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            </div>

            {/* Second Row */}
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 lg:gap-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-40 h-24 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/images/clients/gida-drinks.png"
                  alt="GIDA Drinks"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-40 h-24 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/images/clients/carochi-clean.png"
                  alt="Carochi Foods and Beverages"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-40 h-24 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/images/clients/pollo-24-new.png"
                  alt="Pollo 24 Trading Company"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our technology solutions can help you achieve your business goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Image
                src="/images/omar-logo.png"
                alt="Omar Consults"
                width={160}
                height={50}
                className="h-8 w-auto filter brightness-110"
              />
              <p className="text-sm text-muted-foreground">
                Empowering businesses with innovative technology solutions
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://web.facebook.com/omarbfconsults"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </Link>
                <Link
                  href="http://x.com/Omarconsults"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/omarconsults/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/omarconsults"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                    Custom Software
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                    Digital Marketing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">Benin City, Nigeria</li>
                <li>
                  <Link
                    href="mailto:contact@omarconsults.ng"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    contact@omarconsults.ng
                  </Link>
                </li>
                <li>
                  <Link href="tel:+2349066414474" className="text-sm text-muted-foreground hover:text-primary">
                    +234 906 641 4474
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Omar Consults. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Services data
const services = [
  {
    title: "AI Strategy & Consulting",
    description: "Transform your business with cutting-edge AI solutions tailored to your specific needs.",
    icon: Brain,
    features: [
      "AI Readiness Assessment",
      "Custom AI Strategy Development",
      "Implementation Roadmap",
      "ROI Analysis & Projections",
    ],
  },
  {
    title: "Custom Software Development",
    description: "Build scalable and efficient software solutions that drive your business forward.",
    icon: Code,
    features: [
      "Web & Mobile Applications",
      "Enterprise Software Solutions",
      "API Development & Integration",
      "Legacy System Modernization",
    ],
  },
  {
    title: "Cloud Solutions",
    description: "Leverage the power of cloud computing for enhanced scalability, security, and performance.",
    icon: Cloud,
    features: [
      "Cloud Migration Services",
      "Infrastructure Optimization",
      "Cloud Security Implementation",
      "24/7 Monitoring & Support",
    ],
  },
  {
    title: "Digital Marketing",
    description: "Boost your online presence and reach your target audience with data-driven marketing strategies.",
    icon: TrendingUp,
    features: [
      "SEO & SEM Optimization",
      "Social Media Marketing",
      "Content Strategy & Creation",
      "Analytics & Performance Reporting",
    ],
  },
]

// Industries data
const industries = [
  {
    name: "Technology",
    description: "Innovative solutions for tech companies and startups",
    icon: Building2,
  },
  {
    name: "E-commerce",
    description: "Digital transformation for online retail businesses",
    icon: ShoppingCart,
  },
  {
    name: "Healthcare",
    description: "Secure and compliant technology solutions for healthcare providers",
    icon: Heart,
  },
  {
    name: "Finance",
    description: "Robust financial technology solutions and consulting",
    icon: Briefcase,
  },
  {
    name: "Education",
    description: "EdTech solutions for modern learning environments",
    icon: GraduationCap,
  },
  {
    name: "Automotive",
    description: "Connected vehicle and mobility solutions",
    icon: Car,
  },
  {
    name: "Entertainment",
    description: "Digital platforms and content management systems",
    icon: Gamepad2,
  },
  {
    name: "Food & Beverage",
    description: "Restaurant management and food delivery solutions",
    icon: Utensils,
  },
]
