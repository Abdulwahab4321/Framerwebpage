import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Heart,
  ArrowRight,
  Menu,
  X,
  Play,
  CheckCircle,
  Star,
  MessageCircle,
  Sparkles,
  Users,
  Clock,
  Zap,
  Coffee,
  Moon,
  Sun,
  Target,
  Award,
  Brain,
  Crown,
  Gem,
} from "lucide-react";

function Index() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFloatingBoxOpen, setIsFloatingBoxOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const autoTexts = [
    "Supporting creators without burnout...",
    "Building AI companions that care...",
    "Empowering women 40+ with technology...",
    "Creating authentic connections 24/7...",
    "Transforming how you support your audience...",
  ];

  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safety check to ensure currentTextIndex is always valid
  useEffect(() => {
    if (currentTextIndex >= autoTexts.length || currentTextIndex < 0) {
      setCurrentTextIndex(0);
      setTypedText("");
    }
  }, [currentTextIndex, autoTexts.length]);

  // Auto-typing effect based on scroll
  useEffect(() => {
    // Add safety checks
    if (currentTextIndex >= autoTexts.length || currentTextIndex < 0) {
      return;
    }

    const textToType = autoTexts[currentTextIndex];

    // Make sure textToType exists
    if (!textToType) {
      return;
    }

    const scrollTrigger = 100 + currentTextIndex * 300;

    if (scrollY > scrollTrigger) {
      if (typedText !== textToType) {
        if (typingRef.current) {
  clearTimeout(typingRef.current);
}
        const nextChar = textToType.slice(0, typedText.length + 1);
        typingRef.current = setTimeout(() => {
          setTypedText(nextChar);
        }, 50);
      } else if (currentTextIndex < autoTexts.length - 1) {
        setTimeout(() => {
          setCurrentTextIndex((prev) => prev + 1);
          setTypedText("");
        }, 2000);
      }
    }

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [scrollY, typedText, currentTextIndex, autoTexts]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log("Email submitted:", email);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-x-hidden"
      style={{ zoom: 0.85 }}
    >
      {/* Floating Action Button */}
      <div className="fixed top-8 right-8 z-50">
        <Button
          onClick={() => setIsFloatingBoxOpen(!isFloatingBoxOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-500 transform ${
            isFloatingBoxOpen
              ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-110 rotate-45"
              : "bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-110"
          }`}
        >
          <div className="relative">
            <Menu
              className={`w-6 h-6 text-white transition-all duration-300 ${
                isFloatingBoxOpen ? "opacity-0 rotate-45" : "opacity-100"
              }`}
            />
            <X
              className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
                isFloatingBoxOpen
                  ? "opacity-100 rotate-0"
                  : "opacity-0 rotate-45"
              }`}
            />
          </div>
        </Button>

        {/* Floating Box */}
        <div
          className={`absolute top-20 right-0 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 transform transition-all duration-700 ease-out ${
            isFloatingBoxOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EmbrGlo
              </h3>
            </div>

            <div className="space-y-4">
              {["Demo", "Pricing", "About", "Contact"].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`block p-4 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-105 animate-fade-in text-center font-medium text-gray-700 hover:text-purple-600`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                    opacity: isFloatingBoxOpen ? 1 : 0,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <Button
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl py-3 transition-all duration-300 animate-fade-in`}
                style={{
                  animationDelay: "0.4s",
                  animationFillMode: "forwards",
                  opacity: isFloatingBoxOpen ? 1 : 0,
                }}
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full filter blur-3xl animate-float"
          style={{
            top: "10%",
            left: "70%",
            animationDuration: "20s",
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-orange-300/40 to-yellow-300/40 rounded-full filter blur-2xl animate-float"
          style={{
            top: "60%",
            left: "10%",
            animationDuration: "25s",
            animationDelay: "5s",
            transform: `translateY(${scrollY * 0.05}px) rotate(${scrollY * -0.03}deg)`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-300/25 to-purple-300/25 rounded-full filter blur-3xl animate-float"
          style={{
            bottom: "20%",
            right: "20%",
            animationDuration: "30s",
            animationDelay: "10s",
            transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        {/* EmbrGlo Logo - Top Left */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
          <div className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            EmbrGlo
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 pt-24 sm:pt-16 lg:pt-32">
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <Badge className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-2 border-purple-200 px-4 sm:px-8 py-2 sm:py-4 rounded-full text-sm sm:text-lg font-semibold backdrop-blur-sm animate-bounce-gentle">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              For Midlife Women Creators 40+
            </Badge>
            <div className="h-4 sm:h-6 lg:h-8">
              
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-gradient mb-4">
              Your AI Soul Companion 
              </span>
              <span className="block text-gray-800 mb-4 text-7xl">Made for Midlife Creators</span>
              <span className="block text-4xl sm:text-4xl text-gray-600 font-normal flex items-center justify-center gap-4 mt-8">
              This isn’t automation. It’s attunement. 
                <div className="flex items-center gap-2">
                  <Moon className="w-10 h-10 text-purple-500 animate-bounce-gentle" />
                  <div className="flex flex-col gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
            Emotionally intelligent support {" "}
              <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              trained on science, designed for soul.
              Protects your energy.
              </span>
              Honors your rhythms. Evolves with you.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white px-12 py-8 text-2xl font-bold rounded-3xl transition-all duration-500 hover:scale-110 hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-4">
                ✨ Make This Real
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group border-4 border-purple-300 bg-white/70 text-purple-700 hover:bg-purple-50 px-12 py-8 text-2xl rounded-3xl transition-all duration-500 hover:scale-110 backdrop-blur-sm"
              >
                <Play className="w-8 h-8 mr-4 group-hover:scale-125 transition-transform duration-300" />
                Watch How It Works
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8">
              {[
                { text: "No Tech Skills", icon: CheckCircle, color: "green" },
                { text: "Setup in Minutes", icon: Zap, color: "yellow" },
                { text: "Sounds Like You", icon: Heart, color: "pink" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in border border-${item.color}-200`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <item.icon className={`w-6 h-6 text-${item.color}-500`} />
                  <span className="text-lg font-semibold text-gray-700">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Stats */}
      <section className="py-20 bg-gradient-to-r from-purple-100/30 to-pink-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "73%",
                label: "Feel Overwhelmed Daily",
                icon: Users,
                gradient: "from-purple-500 to-purple-600",
              },
              {
                number: "Every 3min",
                label: " New Post Expected ",
                icon: Clock,
                gradient: "from-pink-500 to-pink-600",
              },
              {
                number: "68%",
                label: "no one to talk",
                icon: Star,
                gradient: "from-orange-500 to-orange-600",
              },
              {
                number: "89%",
                label: "Work Past Limits",
                icon: Zap,
                gradient: "from-blue-500 to-blue-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-110 transition-all duration-500 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-all duration-300 shadow-xl`}
                >
                  <stat.icon className="w-12 h-12 text-white" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-xl text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-5xl sm:text-6xl font-bold mb-12 transition-all duration-1000"
            style={{
              transform: `translateY(${Math.max(-20, Math.min(20, 50 - scrollY * 0.05))}px) scale(${Math.min(1.1, Math.max(0.95, 0.95 + scrollY * 0.0001))})`,
              opacity: Math.min(1, Math.max(0.3, scrollY / 800)),
            }}
          >
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              The Creator Burnout Crisis
            </span>
          </h2>

          <div className="space-y-12">
            <div
              className="text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto transition-all duration-1000"
              style={{
                transform: `translateX(${Math.max(-30, Math.min(0, -60 + scrollY * 0.08))}px)`,
                opacity: Math.min(1, Math.max(0.2, scrollY / 1000)),
              }}
            >
              You’ve held space for everyone. Rarely received it yourself. 
              That’s not sustainable 
Be everything to everyone, or {" "}
              <span className="font-bold text-red-500">for your soul or your work.</span>
              .
            </div>

            <div
              className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-12 border border-red-200 shadow-xl transition-all duration-1000"
              style={{
                transform: `translateY(${Math.max(-15, Math.min(15, Math.sin(scrollY * 0.003) * 15))}px) scale(${Math.min(1.05, Math.max(0.95, 0.98 + scrollY * 0.00008))}) rotate(${Math.sin(scrollY * 0.002) * 1}deg)`,
                opacity: Math.min(1, Math.max(0.2, scrollY / 1200)),
              }}
            >
              <blockquote className="text-4xl font-medium text-gray-800 italic mb-6">
                "I wish I could clone myself to help them all... but I'm just
                exhausted."
              </blockquote>
              <cite className="text-2xl text-gray-600">
                — Every creator, everywhere
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Conversation Demo */}
      <section className="py-32 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Meet EmbrGlo
              </span>
            </h2>
            <p className="text-3xl text-gray-700 max-w-4xl mx-auto">
            An AI that listens like you do; built for the emotional 
            complexity of midlife.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className="space-y-8 transition-all duration-1000"
              style={{
                transform: `translateX(${Math.max(-50, Math.min(0, -100 + scrollY * 0.1))}px)`,
                opacity: Math.min(1, Math.max(0.3, scrollY / 1000)),
              }}
            >
              <h3 className="text-4xl font-bold text-gray-900">
                Picture This Moment...
              </h3>
              <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
                <p>
                  It's 2 AM. Sarah, a woman in your community, is struggling
                  with her midlife transition and can't sleep.
                </p>
                <p>
                  Instead of scrolling endlessly, she opens a chat with your AI
                  companion.
                </p>
                <p className="font-bold text-purple-600 text-2xl">
                Emotionally intelligent support — trained on science, 
designed for soul. Protects your energy. Honors your rhythms. Evolves 
with you.
                </p>
              </div>
            </div>

            <div
              className="relative transition-all duration-1000"
              style={{
                transform: `translateX(${Math.max(0, Math.min(50, 100 - scrollY * 0.1))}px) translateY(${Math.sin(scrollY * 0.002) * 15}px) rotate(${Math.sin(scrollY * 0.001) * 3}deg)`,
                opacity: Math.min(1, Math.max(0.3, scrollY / 1000)),
              }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-200">
                <div className="space-y-6">
                  {/* User Message */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-2xl rounded-tl-lg p-4">
                        <div className="text-sm font-bold text-gray-700 mb-1">
                          Sarah • 2:14 AM
                        </div>
                        <p className="text-gray-800">
                          "I'm going through such a difficult midlife
                          transition. I feel lost and don't know where to turn
                          for guidance..."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl rounded-tl-lg p-4">
                        <div className="text-sm font-bold text-purple-700 mb-1">
                          Your AI • Responding as You
                        </div>
                        <p className="text-gray-800">
                          "Sarah, I hear you completely. What you're feeling is
                          so valid and you're not alone. Midlife transitions can
                          feel overwhelming, but they're also gateways to
                          incredible growth. Here's what helped me..."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Success */}
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">
                        Sarah feels supported and peaceful
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-gentle shadow-xl">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-float shadow-xl">
                <Coffee className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MechanismSection */}
      <section
        id="features"
        className="py-20 px-4 bg-gradient-to-br from-warm-cream via-soft-mint/10 to-lavender-mist/20 relative overflow-hidden"
      >
        {/* Animated background decorations */}
        <div className="absolute top-20 left-10 text-coral-pink/20 animate-float">
          <Star size={80} className="animate-spin-slow" />
        </div>
        <div
          className="absolute bottom-20 right-10 text-emerald-glow/20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Gem size={70} className="animate-pulse-slow" />
        </div>
        <div
          className="absolute top-1/2 left-1/4 text-golden-yellow/15 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Crown size={60} className="animate-bounce-gentle" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-deep-ocean mb-8 animate-slide-up">
              How{" "}
              <span className="bg-gradient-to-r from-coral-pink via-emerald-glow to-golden-yellow bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                EmbrGlo
              </span>{" "}
              Works
            </h2>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-xl md:text-2xl text-royal-purple/80 mb-16 max-w-4xl mx-auto leading-relaxed animate-slide-up">
              Four simple steps to transform your creative journey with
              emotionally intelligent AI support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              {
                number: "1",
                icon: MessageCircle,
                title: "Share Your World",
                description:
                  "We analyze your existing content to understand your unique voice and approach.",
                color: "from-coral-pink to-rose-gold",
                delay: "0.2s",
              },
              {
                number: "2",
                icon: Brain,
                title: "AI Understands Deeply",
                description:
                  "We create an AI companion built on deep research and infused with your unique approach.",
                color: "from-emerald-glow to-soft-mint",
                delay: "0.4s",
              },
              {
                number: "3",
                icon: Heart,
                title: "Get Personalized Support",
                description:
                  "Your audience gets 24/7 access to support that feels like texting you directly.",
                color: "from-lavender-mist to-royal-purple",
                delay: "0.6s",
              },
              {
                number: "4",
                icon: Zap,
                title: "Thrive Without Burnout",
                description:
                  "Your audience pays proven rates ($9/month or $99/year) you build deeper connections.",
                color: "from-golden-yellow to-sunset-orange",
                delay: "0.8s",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative group animate-scale-in"
                style={{ animationDelay: step.delay }}
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative z-10  min-h-[500px]">
                  {/* Step number */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-2xl mb-6 animate-bounce-gentle group-hover:animate-pulse shadow-lg`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`bg-gradient-to-br ${step.color} p-4 rounded-full animate-float group-hover:animate-spin-slow transition-all duration-500`}
                    >
                      <step.icon className="text-white" size={32} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-deep-ocean mb-4 animate-slide-up group-hover:text-coral-pink transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-royal-purple/70 leading-relaxed animate-fade-in">
                    {step.description}
                  </p>

                  {/* Decorative animated elements */}
                  <div className="mt-6 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Sparkles
                      className="text-golden-yellow animate-spin-slow"
                      size={16}
                    />
                    <Heart
                      className="text-coral-pink animate-bounce-gentle"
                      size={16}
                    />
                    <Star
                      className="text-emerald-glow animate-pulse-slow"
                      size={16}
                    />
                  </div>

                  {/* Hover effect overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom call to action */}
          <div
            className="mt-20 animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="bg-gradient-to-r from-coral-pink/10 via-emerald-glow/10 to-golden-yellow/10 rounded-3xl p-10 animate-scale-in border border-coral-pink/20">
              <h3 className="text-3xl font-bold text-deep-ocean mb-4 animate-slide-up">
                Simple. Powerful. Transformative.
              </h3>
              <p className="text-xl text-royal-purple/80 mb-6 animate-fade-in">
                Your emotional well-being and creative success are no longer
                mutually exclusive.
              </p>
              <div className="flex justify-center space-x-4 animate-bounce-gentle">
                <Crown
                  className="text-golden-yellow animate-pulse-slow"
                  size={28}
                />
                <Heart className="text-coral-pink animate-float" size={28} />
                <Zap
                  className="text-emerald-glow animate-spin-slow"
                  size={28}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Static background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-pink-100/30" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8">
            Building after 40 hits {" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              different
              </span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              From our research with 200+ midlife creators, the demand is
              overwhelming.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                percentage: "74%",
                text: "Prefer AI-powered support",
                icon: Users,
                gradient: "from-purple-500 to-purple-600",
                delay: "0s",
              },
              {
                percentage: "79%",
                text: "Prioritize mental health support",
                icon: MessageCircle,
                gradient: "from-pink-500 to-pink-600",
                delay: "0.2s",
              },
              {
                percentage: "49%",
                text: "Need flexibility first",
                icon: Star,
                gradient: "from-orange-500 to-orange-600",
                delay: "0.4s",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  index % 2 === 0
                    ? "animate-slide-in-left"
                    : "animate-slide-in-right"
                }`}
                style={{
                  animationDelay: stat.delay,
                }}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-all duration-300`}
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {stat.percentage}
                </div>
                <p className="text-lg text-gray-700 font-medium leading-relaxed">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-8 mb-20">
            {[
              {
                initial: "M",
                name: "Lisa, Business Strategist & Caregiver",
                quote:
                  "The young gurus don't get it—I can't hustle at 3am anymore. I have 20 years of wisdom but everyone's teaching strategies for 25-year-olds with no responsibilities. I need systems that work with my actual life, not against it.",
                highlight:
                  "The young gurus don't get it—I can't hustle at 3am anymore.",
                gradient: "from-purple-400 to-purple-500",
                delay: "0s",
              },
              {
                initial: "D",
                name: "Carmen, Online Educator & Sandwich Generation Mom",
                quote:
                  "I'm building my empire while managing teenage drama and aging parents.The 'rise and grind' crowd has never dealt with a college tuition payment and a parent's medical crisis in the same month. I need someone who gets the juggle. ",
                highlight: "I'm building my empire while managing teenage drama and aging parents.",
                gradient: "from-pink-400 to-pink-500",
                delay: "0.3s",
              },
              {
                initial: "S",
                name: "Rachel, Former Executive Turned Course Creator",
                quote:
                  "Everyone assumes I'm 'starting over'—but I'm just getting started.I didn't spend 20 years in corporate to build someone else's dream. This isn't Plan B, it's Plan A finally happening. I need support that honors my experience.",
                highlight: "Everyone assumes I'm 'starting over'—but I'm just getting started.",
                gradient: "from-orange-400 to-orange-500",
                delay: "0.6s",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in`}
                style={{
                  animationDelay: testimonial.delay,
                }}
              >
                <div className="flex items-start space-x-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg`}
                  >
                    {testimonial.initial}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl text-gray-700 italic mb-4 leading-relaxed">
                      <span className="font-bold text-purple-600">
                        "{testimonial.highlight}"
                      </span>{" "}
                      {testimonial.quote.replace(testimonial.highlight, "")}
                    </p>
                    <p className="text-lg text-gray-600 font-medium">
                      — {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Market Gap */}
          <div
            className="bg-gradient-to-br from-emerald-100/80 to-teal-100/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-emerald-200/50 animate-scale-in"
            style={{
              animationDelay: "0.8s",
            }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              The Market Gap is Massive
            </h3>
            <p className="text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Over 50 million midlife creators in North America…
              </span>{" "}
              
Yet most are either burning out trying to be everything — or quietly stepping back.
That’s why EmbrGlo was built.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl sm:text-4xl font-bold text-white mb-8 drop-shadow-lg">
        Just imagine: Support without sacrifice.
          </h2>
          <h2 className="text-5xl sm:text-6xl font-semibold text-center text-white mb-8 drop-shadow-lg">
          Experience what's possible when your voice becomes available 24/7.
          </h2>
          <p className="text-2xl text-white/95 mb-16 max-w-3xl mx-auto drop-shadow-md">
          Drop your email - no pitch, no pressure.
          
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/90 border-white text-gray-800 placeholder:text-gray-600 rounded-2xl h-16 text-xl font-medium"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 font-bold rounded-2xl h-16 text-xl transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    ✨ Make This Real ✨
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-white/90 text-lg">
                <p className="font-bold">This is what sovereignty feels like…               </p>
                <p>No tech skills, your freedom revealed, audience care extended</p>
              </div>
            </form>
          ) : (
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-16 border border-white/20 shadow-2xl">
              <CheckCircle className="w-20 h-20 text-white mx-auto mb-8 animate-bounce-gentle" />
              <h3 className="text-4xl font-bold text-white mb-6">
                Thank You! 🎉
              </h3>
              <p className="text-2xl text-white/95">
                We'll send you a personalized demo within 24 hours. Check your
                email for the next steps to your sovereignty.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EmbrGlo
              </span>
            </div>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
              Empowering midlife women creators with intelligent, soulful
              support that never sleeps.
            </p>
            <div className="flex justify-center space-x-8 text-lg">
              {["Privacy", "Terms", "Contact", "Support"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-lg">
              &copy; 2024 EmbrGlo. All rights reserved. Made with 💜 for amazing
              creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
