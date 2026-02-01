"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Image as ImageIcon, Zap, Shield, HardDrive, Cpu, Lock, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10">
        {/* Main Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        </div>
        
        {/* Floating Grid Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-primary/5 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        {/* Animated Background Element */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow -z-10" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center justify-center p-2 px-4 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Powered by Embedded AI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Intelligent Photo
            <span className="block text-primary">Management System</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            A powerful system that automatically organizes, indexes, and makes your entire photo collection 
            searchable using embedded AI. Access, search, and manage photos from your hard disk effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/gallery" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                Explore Gallery
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base">
              <Sparkles className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-background/50">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">AI-Powered Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Search photos by content, location, date, or even objects within images using embedded AI.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-background/50">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <HardDrive className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Local Storage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your photos stay on your hard disk. We index and organize without moving your files.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-background/50">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Privacy Focused</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All AI processing happens locally. Your photos never leave your system.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="text-center p-6 rounded-2xl bg-card/50 border backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground font-medium">Local Storage</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Cpu className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-muted-foreground font-medium">Embedded Intelligence</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-muted-foreground font-medium">Instant Search</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <ImageIcon className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-muted-foreground font-medium">Smart Organization</div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-20 pt-12 border-t relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full bg-card border backdrop-blur-sm">
              <span className="text-lg font-semibold text-foreground">How It Works</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center group">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Index Your Photos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Point to your photo folders. We scan and index everything without moving files.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">AI Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our embedded AI analyzes content, extracts metadata, and creates smart tags.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Search & Enjoy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Instantly search your entire collection with natural language queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}