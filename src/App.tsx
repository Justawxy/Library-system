import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  User, 
  BookOpen, 
  LogOut, 
  LayoutDashboard, 
  Library, 
  MapPin, 
  Calendar, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  X,
  Menu,
  Download,
  MessageSquare,
  BookmarkPlus,
  Info,
  History,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { View, Book, BorrowedBook } from './types';
import { MOCK_BOOKS, BORROWED_BOOKS } from './constants';

// --- Shared Components ---

const Navbar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between gap-8">
        <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => setView('home')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <Library size={24} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">LibFlow</h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className={`text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
          >
            Dashboard
          </button>
          <button className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Catalog</button>
          <button className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Branches</button>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden lg:block w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="h-10 w-full rounded-lg border-slate-200 bg-slate-100 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary" 
              placeholder="Search titles, authors, ISBN..." 
              type="text" 
            />
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
            <Bell size={20} />
          </button>
          <button 
            onClick={() => setView('login')}
            className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-100"
          >
            <img 
              className="h-full w-full object-cover" 
              src="https://picsum.photos/seed/user/100/100" 
              alt="User"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="mt-20 border-t border-slate-200 bg-white py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Library size={16} />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">LibFlow</h2>
          </div>
          <p className="max-w-xs text-sm text-slate-500">Making literature accessible to everyone, everywhere. Your digital partner in the world of books.</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase text-slate-900">Library</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a className="hover:text-primary" href="#">E-Books</a></li>
            <li><a className="hover:text-primary" href="#">Audiobooks</a></li>
            <li><a className="hover:text-primary" href="#">Periodicals</a></li>
            <li><a className="hover:text-primary" href="#">Archive</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase text-slate-900">Support</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a className="hover:text-primary" href="#">Help Center</a></li>
            <li><a className="hover:text-primary" href="#">Borrowing Rules</a></li>
            <li><a className="hover:text-primary" href="#">Locations</a></li>
            <li><a className="hover:text-primary" href="#">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase text-slate-900">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a className="hover:text-primary" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-primary" href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
        © 2024 LibFlow Systems. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Views ---

const HomeView = ({ onSelectBook }: { onSelectBook: (b: Book) => void, key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
  >
    {/* Hero Section */}
    <section className="relative mb-12 overflow-hidden rounded-2xl bg-primary px-8 py-16 text-white shadow-xl">
      <div className="relative z-10 flex flex-col gap-6 md:max-w-xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Discover Your Next Great Adventure
        </h1>
        <p className="text-lg text-blue-100">
          Access over 50,000 digital and physical titles. Borrow, track, and manage your reading list with our modern library ecosystem.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-primary hover:bg-blue-50 transition-colors">
            <span>Find Books</span>
            <ArrowRight size={18} />
          </button>
          <button className="rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-bold backdrop-blur-sm hover:bg-white/20 transition-colors">
            Membership Plans
          </button>
        </div>
      </div>
      <div className="absolute -right-20 -top-20 hidden lg:block opacity-20">
        <Library size={400} />
      </div>
    </section>

    {/* Filters */}
    <section className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['All Books', 'Fiction', 'Tech', 'Business', 'Science'].map((cat, i) => (
            <button 
              key={cat}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Sort by:</span>
          <select className="rounded-lg border-slate-200 bg-white py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-primary">
            <option>Latest Arrivals</option>
            <option>Popularity</option>
            <option>Title A-Z</option>
          </select>
        </div>
      </div>
    </section>

    {/* Book Grid */}
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Featured Books</h3>
        <button className="text-sm font-bold text-primary hover:underline">View all</button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_BOOKS.map((book) => (
          <motion.div 
            key={book.id}
            whileHover={{ y: -5 }}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
              <img 
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                src={book.coverUrl} 
                alt={book.title}
                referrerPolicy="no-referrer"
              />
              <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${book.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {book.status}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h4 className="mb-1 text-lg font-bold leading-tight text-slate-900">{book.title}</h4>
              <p className="mb-4 text-sm text-slate-500">{book.author}</p>
              <div className="mt-auto flex gap-2">
                <button 
                  onClick={() => onSelectBook(book)}
                  className="flex-1 rounded-lg border border-slate-200 py-2 text-xs font-bold transition-colors hover:bg-slate-50"
                >
                  View Details
                </button>
                <button 
                  disabled={book.status !== 'Available'}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold text-white transition-colors ${book.status === 'Available' ? 'bg-primary hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'}`}
                >
                  Borrow
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </motion.div>
);

const LoginView = ({ onLogin }: { onLogin: () => void, key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50"
  >
    <div className="flex w-full max-w-[1100px] h-[700px] bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 relative bg-primary">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <img 
          alt="Library" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://picsum.photos/seed/library-interior/800/1200"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Library size={32} />
            <h1 className="text-2xl font-bold tracking-tight">LibFlow</h1>
          </div>
          <h2 className="text-4xl font-black leading-tight mb-4">Your Digital Gateway to Knowledge</h2>
          <p className="text-white/80 text-lg">Access thousands of books and resources from our modern library management system.</p>
        </div>
      </div>
      
      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="mb-10">
          <h2 className="text-slate-900 text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-slate-500">Please enter your details to sign in</p>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-sm font-semibold">Email Address</label>
            <input 
              className="w-full rounded-lg border border-slate-300 p-3.5 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              placeholder="name@company.com" 
              type="email" 
              defaultValue="user@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-slate-700 text-sm font-semibold">Password</label>
              <button type="button" className="text-primary text-xs font-bold hover:underline">Forgot password?</button>
            </div>
            <input 
              className="w-full rounded-lg border border-slate-300 p-3.5 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              placeholder="••••••••" 
              type="password" 
              defaultValue="password123"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" id="remember" type="checkbox" />
            <label className="text-slate-600 text-sm" htmlFor="remember">Remember me for 30 days</label>
          </div>
          
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-md transition-all active:scale-[0.98]" type="submit">
            Sign In
          </button>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-3 px-4 hover:bg-slate-50 transition-colors">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span className="text-sm font-semibold text-slate-700">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-3 px-4 hover:bg-slate-50 transition-colors">
              <img src="https://www.facebook.com/favicon.ico" className="w-4 h-4" alt="Facebook" />
              <span className="text-sm font-semibold text-slate-700">Facebook</span>
            </button>
          </div>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-slate-600 text-sm">
            Don't have an account? 
            <button className="text-primary font-bold hover:underline ml-1">Sign up for free</button>
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const BookDetailView = ({ book, onReserve }: { book: Book, onReserve: () => void, key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="mx-auto w-full max-w-7xl px-4 sm:px-10 lg:px-40 py-8"
  >
    <div className="flex flex-wrap gap-2 py-4 mb-4">
      <button className="text-slate-500 text-sm font-medium hover:text-primary">Home</button>
      <span className="text-slate-400 text-sm font-medium">/</span>
      <button className="text-slate-500 text-sm font-medium hover:text-primary">Catalog</button>
      <span className="text-slate-400 text-sm font-medium">/</span>
      <span className="text-slate-900 text-sm font-medium">{book.title}</span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 aspect-[2/3] bg-slate-200 rounded-xl overflow-hidden shadow-2xl">
            <img 
              className="w-full h-full object-cover" 
              src={book.coverUrl} 
              alt={book.title}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase tracking-wider">Available</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase tracking-wider">Bestseller</span>
            </div>
            <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-tight mb-2">{book.title}</h1>
            <p className="text-slate-600 text-xl font-medium mb-6">by {book.author}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Format</span>
                <span className="text-slate-900 font-semibold">{book.format}</span>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Pages</span>
                <span className="text-slate-900 font-semibold">{book.pages} Pages</span>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase font-bold tracking-widest">Rating</span>
                <div className="flex items-center text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                  <span className="ml-1 text-slate-900 font-semibold">{book.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-slate-900 text-xl font-bold mb-4">Synopsis</h3>
          <div className="prose max-w-none space-y-4">
            <p>{book.synopsis}</p>
            <p>Thorne's prose is lyrical and haunting, crafting a narrative that resonates long after the final page is turned. A masterpiece of modern speculative fiction that challenges our perception of identity and heritage.</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookmarkPlus className="text-primary" size={24} />
            Reserve this Book
          </h3>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onReserve(); }}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Pickup Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  className="w-full bg-slate-50 border-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900" 
                  type="date" 
                  defaultValue="2024-11-25" 
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">Maximum hold period is 3 business days.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Branch Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select className="w-full bg-slate-50 border-slate-200 rounded-lg pl-10 pr-10 py-2.5 focus:ring-primary focus:border-primary text-slate-900 appearance-none">
                  <option>Central Library (Main St)</option>
                  <option>Northside Branch</option>
                  <option>Westwood Community Center</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-start gap-3">
                <Info className="text-primary mt-0.5" size={18} />
                <p className="text-xs text-primary/80 leading-snug">You will receive an email and mobile notification when your book is ready for pickup at the selected branch.</p>
              </div>
            </div>
            
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2" type="submit">
              Reserve Book
              <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-medium text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-6">
            <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1"><History size={14} /> Sync</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const DashboardView = ({ key }: { key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mx-auto w-full max-w-7xl px-4 lg:px-10 py-8"
  >
    {/* Success Alert */}
    <div className="mb-8">
      <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-green-200 bg-green-50 p-5 md:flex-row md:items-center">
        <div className="flex gap-4 items-start">
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 text-base font-bold leading-tight">Book Returned Successfully</p>
            <p className="text-slate-600 text-sm font-normal leading-normal">The book 'The Great Gatsby' has been processed. Your records are updated.</p>
          </div>
        </div>
        <button className="text-sm font-bold leading-normal tracking-tight flex items-center gap-2 text-primary hover:underline">
          View History
          <ArrowRight size={18} />
        </button>
      </div>
    </div>

    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Welcome back, Alex</h1>
        <p className="text-slate-500 text-base">Here's what's happening with your library account today.</p>
      </div>
      <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
        <BookOpen size={18} />
        New Borrowing Request
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {[
        { label: 'Books Borrowed', value: '12', icon: Library, color: 'blue', badge: '+2 this month' },
        { label: 'Due Soon', value: '02', icon: Calendar, color: 'amber' },
        { label: 'Pending Fines', value: '$5.00', icon: Info, color: 'red' }
      ].map((stat, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' : stat.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
              <stat.icon size={24} />
            </div>
            {stat.badge && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{stat.badge}</span>}
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-slate-900 text-4xl font-black mt-1">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Table */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-slate-900 text-lg font-bold">Currently Borrowed Books</h2>
        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
          Export List
          <Download size={16} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Book Title</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Borrow Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {BORROWED_BOOKS.map((book, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-slate-200 rounded shadow-sm overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover" src={book.coverUrl} alt={book.title} referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">{book.title}</p>
                      <p className="text-slate-500 text-xs">{book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{book.borrowDate}</td>
                <td className={`px-6 py-4 text-sm font-medium ${book.borrowStatus === 'Overdue' ? 'text-red-600 font-bold' : 'text-slate-600'}`}>{book.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    book.borrowStatus === 'On Time' ? 'bg-green-100 text-green-700' : 
                    book.borrowStatus === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {book.borrowStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">Renew</button>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${book.borrowStatus === 'Overdue' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Return</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 text-center">
        <button className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">View All Borrowing History</button>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setView('detail');
  };

  const handleReserve = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={view} setView={setView} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'home' && <HomeView key="home" onSelectBook={handleSelectBook} />}
          {view === 'login' && <LoginView key="login" onLogin={() => setView('dashboard')} />}
          {view === 'detail' && selectedBook && (
            <BookDetailView 
              key="detail" 
              book={selectedBook} 
              onReserve={handleReserve} 
            />
          )}
          {view === 'dashboard' && <DashboardView key="dashboard" />}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Reservation Confirmed!</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  We've successfully reserved <span className="font-bold text-slate-900">"{selectedBook?.title}"</span> for you. It will be ready at the <span className="font-bold">Central Library</span> on <span className="font-bold">Nov 25th</span>.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => { setShowModal(false); setView('dashboard'); }}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Go to My Reservations
                  </button>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 py-4 px-8 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">Reservation ID: #LMS-88291-ATLAS</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
